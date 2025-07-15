import express, {Express} from "express";
import { Server } from "socket.io";
import http from "http";

const app:Express = express();  
const server:http.Server = http.createServer(app);

const io: Server = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
    }
})

export {io, server, app};