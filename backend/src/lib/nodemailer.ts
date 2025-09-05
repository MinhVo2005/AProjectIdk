import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
// let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'dulce.kub@ethereal.email',
//         pass: 'K3AzPpV51CG3P5ZVpj'
//     }
// });

const transporter = nodemailer.createTransport({
service: "gmail",
    auth:{
        type:"OAuth2",
        user: "verifychat123@gmail.com",
        clientId: process.env.GMAILCLIENTID ,
        clientSecret: process.env.GMAILCLIENTSECRET,
        refreshToken: process.env.GMAILREFRESHTOKEN,
    }
});


export default transporter;

