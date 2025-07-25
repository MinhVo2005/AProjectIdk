import { Response, Request, NextFunction } from "express";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateToken } from "../lib/utils";
import {sendEmail} from "../lib/utils";

export function checkAuth(req:Request,res:Response) {
    //TODO: CHECK IF THERE IS A VALID AUTH KEY
    try{
        res.status(200).json(req.user); //to check

    } catch(error){
        console.error("Error at checkAuth controller");
        res.status(400).json({message: "Internal Error"})        
    }

};

export async function login (req:Request, res:Response): Promise<any>{
    //TODO: LOGIN USER BY SENDING A COOKIE TO THE BROWSER
    const {email,password}:
    {email:string, password:string} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message:"Invalid credentials"})

        const isPasswordCorrect = bcrypt.compare(password,user.password)
        if (!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})
        if(user.isUserVerify){
            generateToken(user._id,res)
        }
        res.status(200).json({
            _id: user._id,
            displayName: user.displayName,
            email: user.email,
            profilePic: user.profilePic,
            isUserVerify: user.isUserVerify,
            
        })
        

        
    } catch (error) {
        console.error("Error at login controller:", error)
        res.status(500).json({message: "Internal Error"})
    }
};

export function logout(req:Request, res:Response) {
    //TODO: LOGOUT BY REMOVING THE COOKIE
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    }catch(error){
        console.error("Error at logout controller");
        res.status(500).json({message: "Internal Error"});
    }
};

function hasNumber(str: string): boolean{
    return /\d/.test(str);
}
export async function signup( req:Request, res:Response):Promise<any> { 
    //TODO: CREATE A NEW USER IN THE DATABASE
    const {email, displayName, password}: 
    {email:string, displayName: string, password: string} = req.body;
    try {
        //Check if the form is valid
        if (!(email && displayName && password)){
            return res.status(400).json({message: "Missing input"})
        }
        if (password.length < 8 || !hasNumber(password)){
            return res.status(400).json({message: "Invalid password"})
        }
        const user = await User.findOne({email: email});
        if (user) return res.status(400).json({message: "Email already exists"})

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        const newUser = new User({
            displayName,
            email,
            password:hashPass,
            isUserVerify: false,
        })
        if (newUser){

            //email token
            const token = crypto.randomBytes(32).toString("hex");
            //update token to database
            newUser.emailVerificationToken = token,
            newUser.emailVerificationExpired = new Date(Date.now() + 1000 * 60 *60) // 1hour
            await newUser.save()

            //send verification
            const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
            await sendEmail(newUser.displayName,newUser.email,url);

            res.status(201).json({
                _id: newUser._id,
                displayName: newUser.displayName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                isUserVerify: newUser.isUserVerify,
            })
        }else{
             res.status(400).json({message: "Invalid data"})
        }
       
        

    } catch (error) {
        console.error("Error at signup controller:", error)
        res.status(500).json({message: "Internal Error"})
    }
    

};

export function updateProfile() {
    //TODO: LET USER UPDATE THEIR PROFILE (I.E THEIR DISPLAY NAME AND PROFILE PIC)
};



export async function verifyEmail(req:Request, res: Response):Promise<any>{
    const {token} = req.query;
    try {
        if (!token) return res.status(404).json({message: "Token not found"});
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpired: {$gt: new Date()},
        })

        if (!user) return res.status(400).json({message: "Invalid or expired token"});
        
        //DISABLE FOR TESTING PURPOSE
         user.isUserVerify = true;
        // user.emailVerificationToken = undefined;
        // user.emailVerificationExpired = undefined; 
        await user.save();
        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            displayName: user.displayName,
            email: user.email,
            profilePic: user.profilePic,
            isUserVerify: user.isUserVerify,
        });
    } catch (error) {
        console.error("Error in verifyEmail controller: ", error)
        return res.status(500).json({message: "Internal Error"})
    }
    

}