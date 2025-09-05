import type { Channel } from "pusher-js";
import type Pusher from "pusher-js";
import type { Socket } from "socket.io-client";

export interface IUser {
    _id: string,
    displayName:string,
    email:string,
    profilePic:string,
    isUserVerify: boolean,
    rooms: string[],
}

export interface IRoom {
    _id:string, 
    name: string,
    participants: IUser[],
    imageIcon: string,
    createBy: string,
    messages: string[],
    lastestMessage: string,
    hasRead: string[],
    isGroup,
}

export interface IMessage {
    _id: string,
    roomId: string,
    fromUserId: IUser,
    text: string,
    image: string, 
    createdAt: Date,
    updatedAt: Date,
}

export interface IUseUserStore{
    searchUser: IUser[]
    isCreatingRoom: boolean

  
    getSearchUser: (query:string)=> Promise<any>
    getOneOnOne: (params:string) =>Promise<any>
    createRooms: (room: {name: string, 
        participants: string[], 
        imageIcon: string})=>Promise<any>
}


export interface IUseAuthStore{
    //State
    authUser: IUser | null;
    isSigningUp:boolean;
    isVerifyingEmail: boolean;
    isLoginningIn:boolean
    isCheckingAuth:boolean
    isLogout: boolean

    pusher: Pusher|null
    userChannel: Channel |null,

    //Handler
    checkAuth:()=> Promise<any>
    signup: (data:IFormData) => Promise<any>
    login: (data:IFormData) => Promise<any>
    logout: () => Promise<any>
    verifyEmail: (token:string) => Promise<any>
    updateProfile: (profilePic: string|ArrayBuffer|null) => Promise<any>

    connectSocket: ()=> void
    disconnectSocket: () => void
}

export interface IUseThemeStore{
    theme: string;
    setTheme: (theme:string) => any
}

export interface IUseChatStore {
    //state
    isLoadingSidebarUser: boolean,
    sideBarUser: Map<string,IRoom>, //roomID : IRoom object
    selectedRoom: IRoom | null,
    isSendingMessage: boolean,

    isLoadingMessages: boolean,
    messages: IMessage[],
    roomChannel: Channel|null,


    //Handler

    getSideBarUser: ()=> Promise<any>
    getMessages: (id:string) => Promise<any>
    sendMessage: (message: {
        text:string,
        image:string,
        room: IRoom
    }) => Promise<any>;
    subscribeToMessages: ()=>void;
    unsubscribeToMessages: (currentRoomId: string) => void;
    transformingRoom: (room: IRoom) => void;
    updateRead: (selectedRoomID: string)=> void;
}

export interface IFormData {
    displayName?: string;
    email: string;
    password:string;
}

