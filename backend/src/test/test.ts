
import { addRoomToUser } from "../controllers/user.controller";
import task from "../lib/cron";
import { connectDB } from "../lib/db";
import {sendEmail} from "../lib/utils";
import Room from "../model/room.model";
import User from "../model/user.model";
import crypto from "crypto"
import {Types} from "mongoose"

const name:string  = "thunder";
const email:string = "thunderboyx360@gmail.com";
const token = "";
const url: string = `/verify-email?token=${token}`

//sendEmail(name,email ,url);

//test verifyURL

//create a user
connectDB();
async function test (){

    sendEmail(name,email,url);

}


async function test2(){
    const result = await User.updateMany(
        {},
        {$set : {rooms:[]}}
    )

}
 const test3 = async ()=>{
    const cutoff = new Date(Date.now()-1000*60*60)
    console.log(new Date())
    console.log(cutoff)
    const result = await Room.find({
        updatedAt: {$lt: cutoff}
    })
    console.log(result)
 }
 
 const test4 =async ()=>{
    const senderID = new Types.ObjectId('6876bd2e9c3cc3fea53d5169')
    const roomID = new Types.ObjectId('6897696123bc8755000ece2d')
    const room = await Room.findById(roomID)
    console.log(room)
    addRoomToUser(senderID,room!,true)
 }
 
 const test5= async ()=>{
    const senderID = new Types.ObjectId('6876bd2e9c3cc3fea53d5169')
    const roomID = new Types.ObjectId('6897696123bc8755000ece2d')
    const room = new Room({
        participants: [senderID],
        isGroup: false
    })

    console.log(room);
 }

 test()