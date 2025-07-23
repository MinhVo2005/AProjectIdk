import { createWithEqualityFn } from "zustand/traditional";
import type { IRoom, IUseChatStore } from "../lib";
import { axiosInstance } from "../lib/axios";

export const useChatStore = createWithEqualityFn<IUseChatStore>((set)=>({
    //state
    isLoadingSidebarUser: false,
    sideBarUser: [],
    selectedRoom: undefined,

    //Handler
    

    getSideBarUser: async ()=>{
        set({isLoadingSidebarUser:true})
        try{
            const {data} = await axiosInstance.get<IRoom[]>("/messages/rooms")
            set({sideBarUser: data})
        }catch(error){
            set({sideBarUser:[]})
            console.error("Error in getSideBarUser", error)
        }finally{
            set({isLoadingSidebarUser:false})
        }
    }
}))