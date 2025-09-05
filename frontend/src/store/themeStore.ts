import type { IUseThemeStore } from "../lib";
import { createWithEqualityFn } from "zustand/traditional";

export const useThemeStore = createWithEqualityFn<IUseThemeStore>((set)=>({
    theme: localStorage.getItem("chat-theme") || "dark",
    setTheme: (theme:string) =>{
        localStorage.setItem("chat-theme",theme);
        set({theme})
    }
}))