import { Request,Response } from "express";
import Room from "../model/room.model";
import User from "../model/user.model";
import { Types } from "mongoose";

//Search for a user

export const getSearchUser = async (req:Request, res:Response)=>{
    try {
        const {search: searchUser} = req.query
        const result = await  User.find({
        displayName: {$regex: searchUser},
        //isUserVerify:true
    }).limit(10)

    res.status(200).json(result)
    } catch (error) {
        console.log("Error in getUserSearch", error);
        res.status(500).json({messsage: "Internal Error"})
    }
   
}
const addRoomToUser =async (roomID: Types.ObjectId)=>{
    try {
        const room = await Room.findById(roomID);
        if(!room) throw new Error("Room not found");

        const result = await User.updateMany(
        { _id: { $in: room.participants },
          isUserVerify: true,    
        },
            { $addToSet: { rooms: roomID } }
        );

    } catch (error) {
        console.log("Error addUserToRoom controller", error)
    }
    
}

export const createRooms =  async (req:Request, res:Response) =>{
    //Create a new Room object and save to database
    try {
        const creatorID = req.user._id
        const {name,participants} = req.body;
        const newRoom = new Room ({
            name: name,
            participants: participants,
            createBy: creatorID,
            lastTimeStamps: new Date(Date.now())
        })
        await newRoom.save()
        addRoomToUser(newRoom._id)
        res.status(200).json(newRoom)
    } catch (error) {
        console.log("Error at createRooms", error)
        res.status(500).json({message: "Internal Error"})
    }
}

export const getOneOnOne = async (req:Request, res: Response)=>{
    //Create a new Room object (for one on one) and save to database
    try{
        const {id} = req.params;
        const receiverID = new Types.ObjectId(id)
        const senderID = req.user._id;
        const room = await Room.findOne({
            participants: {$all:[receiverID,senderID]}
        })
        if (room){
            res.status(200).json(room)
            return
        }

        const newRoom = new Room ({
            name: " ",
            participants: [receiverID,senderID],
            lastTimeStamps: new Date(Date.now())
        })

        await newRoom.save();
        addRoomToUser(newRoom._id)

        res.status(200).json(newRoom)
    }catch(error){
        console.log("Error in createOneOnOne controllers", error);
        res.status(500).json({message: "Internal Error"})
    }

}