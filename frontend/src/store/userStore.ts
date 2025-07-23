import { createWithEqualityFn } from "zustand/traditional";
import type { IRoom, IUser, IUseUserStore } from "../lib";
import { axiosInstance } from "../lib/axios";
import { useChatStore } from "./chatStore";


export const useUserStore = createWithEqualityFn<IUseUserStore>((set)=>({
    searchUser: [],

    getOneOnOne: async (params) =>{
        try {
            if (!params) return
            const {data} = await axiosInstance.get<IRoom>(`/user/getOneOnOne/${params}`)
            useChatStore.setState({selectedRoom:data})
            
        } catch (error) {
            console.error("Error in getOneOnOne", error)
        }
    },
    getSearchUser:async (query)=>{
        try{
            if (!query){
                set({searchUser:[]})
                return
            }
            const {data} = await axiosInstance.get<IUser[]>(`/user/getSearchUser?search=${query}`)
            set({searchUser: data});
        }catch(error){
            set({searchUser:[]})
            console.error("Error in getSearchUser", error)
        }
    }
}))