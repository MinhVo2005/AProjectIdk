import { Request,Response } from "express";
import Room from "../model/room.model";
import User from "../model/user.model";
import { Types } from "mongoose";
import { IRoom, IUser } from "../model";
import { pusher } from "../lib/socket";

//Search for a user

export const getSearchUser = async (req:Request, res:Response)=>{
    try {
        const {search: searchUser} = req.query
        const result = await  User.find({
        displayName: {$regex: searchUser, $options: "i"},
        _id: {$ne: req.user._id}
        //isUserVerify:true
    }).limit(10)

    res.status(200).json(result)
    } catch (error) {
        console.log("Error in getUserSearch", error);
        res.status(500).json({messsage: "Internal Error"})
    }
   
}
export const addRoomToUser=async (senderID:Types.ObjectId,room: IRoom,multi: boolean)=>{
    try {
        if(!room) throw new Error("Room not found");
        // console.log(room)
        const roomID = room._id
        //Add to either everyone in the group or just the sender
        const result = await User.updateMany(
        { _id: multi?{ $in: room.participants }: senderID,
            isUserVerify: true,    
        },
            { $addToSet: { rooms: roomID } }
        );
        
        
        //get socketID
        let userIdsToUpdate:string[] =[];
        if(multi){
        room.participants.map(p =>{
            const pID = p._id.toString();
            userIdsToUpdate.push(pID)
        })}
        else{
            userIdsToUpdate.push(senderID.toString())
        }
        
        //join socket
        for (const userID of userIdsToUpdate){
            await pusher.trigger(`user-${userID}`,'updateRoom',{
                room: room,
                updateRoom: multi,
            })
        }
    } catch (error) {
        console.log("Error addUserToRoom controller", error)
    }
    
}



export const createRooms =  async (req:Request, res:Response) =>{
    //Create a new Room object and save to database
    try {
        const creatorID = req.user._id
        const {name,participants,imageIcon} = req.body;
        if(!name || participants?.length<2){
            res.status(400).json({message: "Missing or Invalid json body"})
            return;
        }
        const newRoom = new Room ({
            name: name,
            participants: participants,
            imageIcon: imageIcon,   
            createBy: creatorID,
            lastTimeStamps: new Date(Date.now()),
            hasRead: participants,
            isGroup: true,
        })
        await newRoom.save()
        const returnRoom = await newRoom.populate({
            path: 'participants',
            select:['_id', 'displayName', 'profilePic']
        })

        addRoomToUser(creatorID,returnRoom,true)
        res.status(200).json(returnRoom)
    } catch (error) {
        console.log("Error at createRooms", error)
        res.status(500).json({message: "Internal Error"})
    }
}

export const getOneOnOne = async (req:Request, res: Response)=>{
    //Create a new Room object (for one on one) and save to database
    try{
        const {id} = req.params;
        if (!id){
            res.status(400).json({message: "Invalid ID"});
        }
        const receiverID = new Types.ObjectId(id)
        const senderID = req.user._id;
        let room = await Room.findOne({
            participants: {$all:[receiverID,senderID]},
            isGroup: false,
        })

        if (!room){
        room = new Room ({
            participants: [receiverID,senderID],
            hasRead: [senderID,receiverID],
            isGroup:false,  
        })
        await room.save();
    }
        const returnRoom = await room.populate({
            path: 'participants',
            select:['_id', 'displayName', 'profilePic']
        })
        
        addRoomToUser(senderID,returnRoom, false)
        res.status(200).json(room)
    }catch(error){
        console.log("Error in getOneOnOne controllers", error);
        res.status(500).json({message: "Internal Error"})
    }

}