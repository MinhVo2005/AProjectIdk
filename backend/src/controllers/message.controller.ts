import { Request, Response } from "express";
import User from "../model/user.model";
import Room from "../model/room.model";
import { Types } from "mongoose";



export const getRoomsForSidebar =async (req:Request,res:Response) =>{
    try {
        const userID = req.user._id;
        const user = await User.findById(userID);
        if (!user) {
            res.status(404).json({message: "User not found"})
            return
            }
        const roomsID: Types.ObjectId[] = user.rooms ;
        const rooms = await Room.find({_id: {$in: roomsID}})
                        .populate('participants','displayName')
        res.status(200).json(rooms)

    } catch (error) {
        console.log("Error in getRoomsForSidebar controllers",error);
        res.status(500).json({message: "Internal Error"})
    }
};


export const getMessages = () =>{
    
}

export const sendMessage = () =>{
    
}

export const addRoomsToSidebar = ()=>{

}

