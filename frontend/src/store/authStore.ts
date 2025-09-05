
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { IFormData, IRoom, IUseAuthStore, IUser } from "../lib";
import { createWithEqualityFn } from "zustand/traditional";
import { useChatStore } from "./chatStore";
import { notifyNewMessage } from "../components/toastUtils";
import Pusher from "pusher-js";


export const useAuthStore = createWithEqualityFn<IUseAuthStore>((set,get) =>({
    //State
    authUser: null,
    isCheckingAuth: true,
    //Verification
    isSigningUp:false,
    isLoginningIn:false,
    isLogout: false,
    socket:null,
    pusher:null,
    userChannel:null,
    //Email Verification
    isVerifyingEmail: false,
    

    // Handler/function
    checkAuth:async ()=>{
        try {
            const {data} = await axiosInstance.get<IUser>("/auth/check");
            set({authUser:data});
            get().connectSocket()
            
        } catch (error) {
            console.error("Error in CheckAuth", error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data:IFormData):Promise<any>=>{
        set({isSigningUp:true})
        try {
            const res =  await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data})
            toast.success("Account created successfully. Please verify your account to login!")
        } catch (error) {
            toast.error("Error signing up!")
            console.error("Error while signing up", error)
        }
        finally{
            set({isSigningUp:false})

        }
        
    },
    login: async(data:IFormData):Promise<any>=>{
        set({isLoginningIn:true});
        try {
            const res = await axiosInstance.post<IUser>("/auth/login",data)
            set({authUser:res.data})
            if (!res.data.isUserVerify) return;
            get().connectSocket();
            toast.success("User is logged in")
        } catch (error) {
            toast.error("Invalid credentials")
            console.error("Error while login in", error)
        }finally{
            set({isLoginningIn:false})
        }
    },
    logout: async ()=>{
        set({isLogout:true})
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            get().disconnectSocket()
        } catch (error) {
            console.log("Error while logout", error);
            toast.error("Error")
        }finally{
            set({isLogout:true})
        }
        
    },

    verifyEmail: async (token:string):Promise<boolean> =>{
        set({isVerifyingEmail: true})
        try {
            const res = await axiosInstance.get(`/auth/verify-email?token=${token}`);
            set({authUser: res.data});
            if(!res.data.isUserVerify){
                toast.error("Failed to verify")
            } 
             toast.success("Verify successfully")
             return true
        } catch (error:any) {
            toast.error(error.message)
            console.log("Error while verifying", error);
            return false
        }
        finally{
            set({isVerifyingEmail: false})
        }
    },
    updateProfile:async (profilePic)=>{
        try {
            const {data} = await axiosInstance.put<IUser>("/auth/update-profile", {"profilePic":profilePic})
            set({authUser: data})
            toast.success("Update profile")
        } catch (error) {
            console.error("Error at updateProfile", error)
            toast.error("Failed to update profile") 
        }
    },

    connectSocket: async ()=>{
        const {authUser} = get();
        if (!authUser || get().pusher?.connection.state === "connecting") return;
        
        const pusher = new Pusher(
        import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        }
    );
        const channel = pusher.subscribe(`user-${authUser._id}`)

        set({ pusher: pusher, userChannel: channel });
        channel.bind('updateRoom', async (data: { room: IRoom, updateRoom: boolean }) => {
            console.log("updating room");
            const { room, updateRoom } = data;
            const rooms = new Map(useChatStore.getState().sideBarUser);
            useChatStore.getState().transformingRoom(room);
            const roomID = room._id;
            
            if (rooms.has(roomID) && updateRoom) {
                rooms.delete(roomID);
            }
            rooms.set(roomID, room);
            useChatStore.setState({ sideBarUser: rooms });

            // Send notification
            const { selectedRoom } = useChatStore.getState();
            const { authUser } = useAuthStore.getState();
            if (!authUser) return;

            if (selectedRoom?._id !== room._id && !room.hasRead.includes(authUser._id)) {
                notifyNewMessage(room.name);
            }
        });



    },
    disconnectSocket: ()=>{
        const {pusher, userChannel} = get();
        if (userChannel){
            userChannel.unbind_all();
            pusher?.unsubscribe(`user-${get().authUser?._id}`)
        }
        if(pusher){
            pusher.disconnect();
        }
        set({pusher: null, userChannel:null})
    }
}))