// Importing module
import express from 'express';
import { connectDB } from './lib/db';
import {config} from "dotenv";
import { app, server } from "./lib/socket";
import authRoutes from "./routes/auth.routes"
import messagesRoutes from "./routes/messages.routes"
import userRoutes from "./routes/user.routes"
import cookieParser from 'cookie-parser';
import cors from "cors";
import task from './lib/cron';
import path from "path"

config();

const PORT:string = process.env.PORT!;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173",
        process.env.FRONTEND_URL!
    ],
    methods: ['GET', 'POST', 'PUT'],
    credentials:true,
}))


app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/user", userRoutes)

// if(process.env.NODE_ENV ==='production'){
    
//     app.use(express.static(path.join(__dirname, "../../frontend/dist")));
//     app.get("{/*path}", (req,res)=>{
//         res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
//     })
// }

server.listen(PORT, () =>{
    console.log("Server is running on port", PORT);
    task.start();
    connectDB();
})

