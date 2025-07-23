//create interface for user/message/ (maybe group)
import { Document, Types } from "mongoose";

interface IUser extends Document{
    _id: Types.ObjectId
    displayName: string;
    email: string;
    password: string;
    profilePic: string;
    //Verification
    isUserVerify: booloean;
    emailVerificationToken: string|undefined;
    emailVerificationExpired: Date|undefined;
    rooms: Types.ObjectId[]
}


interface IMessage extends Document{
    _id: Types.ObjectId
    roomId: Types.ObjectId;
    fromUserId: Types.ObjectId;
    text: string;
    image:string;
}

interface IRoom extends Document{
    _id: Types.ObjectId
    name?: string;
    participants: Types.ObjectId[];
    createBy?: Types.ObjectId;
    messages: Types.ObjectId[];
    lastTimeStamps: Date;
    latestMessage: Types.ObjectId;
}



export {IUser, IMessage, IRoom};