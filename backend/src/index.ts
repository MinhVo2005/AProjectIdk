// Importing module
import express from 'express';
import { connectDB } from './lib/db.ts';
import {config} from "dotenv";
import { app, server } from "./lib/socket.ts";
import authRoutes from "./routes/auth.routes.ts"
import messagesRoutes from "./routes/messages.routes.ts"
import cookieParser from 'cookie-parser';
import cors from "cors"

config();

const PORT:string = process.env.PORT!;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}))


app.use("/api/auth", authRoutes);
app.use("api/messages", messagesRoutes);

server.listen(PORT, () =>{
    console.log("Server is running on port", PORT);
    connectDB();
})

