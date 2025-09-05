import express, {Express} from "express";
import http from "http";
import Pusher from "pusher";

const app:Express = express();  
const server:http.Server = http.createServer(app);

const pusher = new Pusher ({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!,
    useTLS: true
})


export { server, app, pusher};