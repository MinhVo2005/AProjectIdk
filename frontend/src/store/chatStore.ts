import { createWithEqualityFn } from "zustand/traditional";
import type { IMessage, IRoom, IUseChatStore, IUser } from "../lib";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./authStore";

export const useChatStore = createWithEqualityFn<IUseChatStore>((set,get)=>({
    //state
    isLoadingSidebarUser: false,
    sideBarUser: new Map(),
    messages: [],
    isLoadingMessages: false,
    selectedRoom: null,
    isSendingMessage: false,
    roomChannel: null,

    //Handler
    

    getSideBarUser: async ()=>{
        set({isLoadingSidebarUser:true})
        try{
            const {data} = await axiosInstance.get<IRoom[]>("/messages/rooms")
            const newRoom = new Map();
            data.map(r => {
                get().transformingRoom(r);
                newRoom.set(r._id, r);
            })
            set({sideBarUser: newRoom})
            
        }catch(error){
            set({sideBarUser: new Map()})
            console.error("Error in getSideBarUser", error)
        }finally{
            set({isLoadingSidebarUser:false})
        }
    },

    getMessages: async (id) =>{
        set({isLoadingMessages: true});
        try {
            const {data} = await axiosInstance.get<IMessage[]>(`/messages/${id}`);
            console.log(data)
            set({messages: data})
        } catch (error) {
            set({messages: []});
            console.error("Error getMessages", error)
        }finally{
            set({isLoadingMessages:false})
        }
    },

    sendMessage: async (message) =>{
        const {selectedRoom} = get()    
        set({isSendingMessage:true})
        try {
            if (!selectedRoom) return
            const tempId = Date.now().toString();
            const date = new Date();
            const optimisticMessage: IMessage = {
                ...message,
                _id: tempId+selectedRoom._id, // temporary id
                createdAt: date,
                updatedAt: date,
                fromUserId: useAuthStore.getState().authUser!,
                roomId: selectedRoom._id
            };
            set({ messages: [...get().messages, optimisticMessage] });
            await axiosInstance.post<IMessage>(`/messages/send/${selectedRoom._id}`,message)

        } catch (error) {
            console.error("Error sendMessage", error)
        }
        finally{
            set({isSendingMessage:false})
        }
    },

    subscribeToMessages: ()=>{
        const {selectedRoom} = get();
        const {pusher}= useAuthStore.getState();
        if (!selectedRoom || !pusher) return;

        const roomChannel = pusher.subscribe(`room-${selectedRoom._id}`)
        set({roomChannel:roomChannel})
        roomChannel.bind('newMessage', (newMessage:IMessage)=>{
            if(newMessage.fromUserId._id === useAuthStore.getState().authUser?._id) return
            get().updateRead(selectedRoom._id)
            set({ messages: [...get().messages, newMessage]});
            
        });

        
    },

    unsubscribeToMessages: (currentRoomId)=>{
        const {pusher} = useAuthStore.getState();
        if (!pusher || !currentRoomId) return
        const { roomChannel } = get();
        console.log(roomChannel)
        if (roomChannel) {
            console.log("removing")
            roomChannel.unbind('newMessage');
            pusher.unsubscribe(`room-${currentRoomId}`);

            set({roomChannel: null})
        }
    },
    
    transformingRoom: (room)=>{
        const userID = useAuthStore.getState().authUser?._id;
        if (!userID) return;
        if(room.isGroup) return
        if (room.name.trim() === "" || room.participants.length ===2){
            const participants = room.participants as unknown[] as IUser[]
            const other = participants.find(p => (p._id !== userID))
            if(other){
                room.name = other!.displayName
                room.imageIcon = other!.profilePic
            }
        }
    },

    updateRead: async (selectedRoomID) =>{
        try {
            if (!selectedRoomID) return;
            const {data} = await axiosInstance.get<IRoom>(`/messages/updateRead/${selectedRoomID}`)
            get().transformingRoom(data);
            const newRooms = useChatStore.getState().sideBarUser
            newRooms.set(selectedRoomID,data);
            useChatStore.setState({sideBarUser: newRooms})
            console.log("READ")
        } catch (error) {
            console.error("Error in updateRead", error)
        }
    }
}))