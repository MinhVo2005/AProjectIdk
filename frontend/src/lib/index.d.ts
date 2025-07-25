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
    createBy: string,
    messages: string[],
    lastTimeStamps: string, //Might need to change
    lastestMessage: string,
}

export interface IUseUserStore{
    searchUser: IUser[]

  
    getSearchUser: (query:string)=> Promise<any>
    getOneOnOne: (params:string) =>Promise<any>
}


export interface IUseAuthStore{
    //State
    authUser?: IUser;
    isSigningUp:boolean;
    isVerifyingEmail: boolean;
    isLoginningIn:boolean
    isCheckingAuth:boolean
    isLogout: boolean

    //Handler
    checkAuth:()=> Promise<any>
    signup: (data:IFormData) => Promise<any>
    login: (data:IFormData) => Promise<any>
    logout: () => Promise<any>
    verifyEmail: (token:string) => Promise<any>
}

export interface IUseThemeStore{
    theme: string;
    setTheme: (theme:string) => any
}

export interface IUseChatStore {
    //state
    isLoadingSidebarUser: boolean,
    sideBarUser: IRoom[],
    selectedRoom?: IRoom,

    //Handler

    getSideBarUser: ()=> Promise<any>
}

export interface IFormData {
    displayName?: string;
    email: string;
    password:string;
}

