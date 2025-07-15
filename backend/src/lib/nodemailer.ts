import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth:{
//         type:"OAuth2",
//         user: "verifychat123@gmail.com",
//         clientId: "731457081960-f1s5pdostgf1nuu68gf5fqgmct1ng0s6.apps.googleusercontent.com",
//         clientSecret: "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",
//         refreshToken: "1//045y63bN6aHtCCgYIARAAGAQSNwF-L9Irn6tRqsX6KedF2i4OcWqVQPrhXppDUD9jVJ9joGvBu9CZeOYhOf7CZ0mufoq4nySkt-U",
//     }
// });

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jedediah77@ethereal.email',
        pass: 'ux9vfnjtZs1YN5WGRz'
    }
});


