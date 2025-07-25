import nodemailer from "nodemailer";



export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jedediah77@ethereal.email',
        pass: 'ux9vfnjtZs1YN5WGRz'
    }
});


