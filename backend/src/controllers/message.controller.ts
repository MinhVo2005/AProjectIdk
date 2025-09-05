import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";
import Room from "../model/room.model";
import { Types } from "mongoose";
import { Message } from "../model/message.model";
import {  pusher } from "../lib/socket";
import { addRoomToUser } from "./user.controller";


export const getRoomsForSidebar =async (req:Request,res:Response) =>{
    try {
        const userID = req.user._id;
        const user = await User.findById(userID);
        if (!user) {
            res.status(404).json({message: "User not found"})
            return
            }
        const roomsID: Types.ObjectId[] = user.rooms ;
        const rooms = await Room.find(
            {_id: {$in: roomsID}}
            
        ).populate({
                    //get the user in the room
                    path: 'participants',
                    select:['_id','displayName','profilePic'],
                })
        .sort({updatedAt: 'asc'})
        

        res.status(200).json(rooms)

    } catch (error) {
        console.log("Error in getRoomsForSidebar controllers",error);
        res.status(500).json({message: "Internal Error"})
    }
};


export const getMessages = async (req:Request, res:Response) =>{
    try {
        const {id}  = req.params;
        const roomID = new Types.ObjectId(id);
        const room = await Room
        .findById(roomID)
        .populate({
            path: "messages",
            options: {sort: {createdAt: 1}, 
                    populate: {
                        path: "fromUserId",
                        select: ['displayName','profilePic']
                    }}
        });
        if (!room) {
            res.status(404).json({message: "Room not found"});
            return;
        }

        const messages = room.messages
        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages", error);
        res.status(500).json({message: "Internal Error"});
    }
}

export const sendMessage = async (req:Request, res:Response) =>{
    try {
        //get text and room
        const {text}: 
        {text:string} = req.body; // implement for image afterward
        const {id: roomId} = req.params;
        const userID = req.user._id;
        if (!text.trim() || !roomId){
            return
        }
        //find room
        const room = await Room.findOne({_id: new Types.ObjectId(roomId)})
        .populate({
            //get the user in the room
            path: 'participants',
            select:['_id','displayName','profilePic'],
        })
        if (!room) return;

        //create new message object
        const newMessage = new Message({
            roomId:room._id,
            fromUserId: userID,
            text: text
        })
        await newMessage.save();
        const messageToReturn = await newMessage.populate({
            path: "fromUserId",
            select:  ['displayName','profilePic']
        })
        res.status(200).json(messageToReturn)
        //push to room and
        
        room.messages.push(newMessage._id);
        room.hasRead = [userID]
        
        await room.save()
        //Socket emit new message to client
        await addRoomToUser(userID,room,true)
        await pusher.trigger(`room-${roomId}`, 'newMessage', newMessage)
       
        
        
    } catch (error) {
     console.log("Error at sendMessage",error)
     res.status(500).json({message: "Internal Error"})   
    }
}

export const updateRead = async (req:Request, res: Response)=>{
    try {
        const userId = req.user._id
        const {roomId} = req.params;
        const room = await Room.findOneAndUpdate({_id: roomId},
            {$addToSet: {hasRead: userId}}, 
            {new:true, timestamps:false}
        ).populate({
            //get the user in the room
            path: 'participants',
            select:['_id','displayName','profilePic'],
    })
        res.status(200).json(room);
    } catch (error) {
        console.log("Error in updateRead controller",error);
        res.status(500).json({message: "Internal Error"})
    }
}
