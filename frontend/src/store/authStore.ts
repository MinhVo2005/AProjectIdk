
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import io from "socket.io-client";
import type { IFormData, IUseAuthStore } from "../lib";
import { createWithEqualityFn } from "zustand/traditional";

const BASE_URL:string = "http://localhost:5001"

export const useAuthStore = createWithEqualityFn<IUseAuthStore>((set,get) =>({
    //State
    authUser: undefined,
    isCheckingAuth: false,
    //Verification
    isSigningUp:false,
    isLoginningIn:false,
    isLogout: false,

    //Email Verification
    isVerifyingEmail: false,
    

    // Handler/function
    checkAuth:async ()=>{
        set({isCheckingAuth:true})
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.error("Error in CheckAuth", error);
            set({authUser:undefined})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data:IFormData):Promise<any>=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
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
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
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
            set({authUser:undefined})
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
    }
}))