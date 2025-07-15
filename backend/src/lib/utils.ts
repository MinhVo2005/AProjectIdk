import jwt from "jsonwebtoken";
import {config} from "dotenv"
import { Response } from "express";
import { Types } from "mongoose";
import { transporter } from "./nodemailer";
import { htmlTemplate } from "./template/template";

config();
const JWTSECRET:string = process.env.JWTSECRET!

export const generateToken = (userId:Types.ObjectId, res:Response):string =>{
    const token = jwt.sign({userId}, JWTSECRET,{
        expiresIn: "7d"
    });

    res.cookie('jwt',token,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true, 
        sameSite: true,
        secure: true,
    })

    return token;
};

export const sendEmail = async (userName:string, userEmail:string,verifyURL:string) =>{
    const info = await transporter.sendMail({
        from: '"Chatapp" <verifychat123@gmail.com>', //change after
        to: userEmail,
        // text: template(userName,verifyURL)
        html: htmlTemplate(userName,verifyURL)
    });
    console.log("Message sent: ",info.messageId);
}


