

export interface IUseAuthStore{
    //State
    authUser: any;
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

export interface IFormData {
    displayName?: string;
    email: string;
    password:string;
}