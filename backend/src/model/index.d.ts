//create interface for user/message/ (maybe group)
import { Types } from "mongoose";

interface IUser {
    displayName: string;
    email: string;
    password: string;
    profilePic: string;
    //Verification
    isUserVerify: booloean;
    emailVerificationToken: string|undefined;
    emailVerificationExpired: Date|undefined;
}

interface IMessage {
    roomId: Types.ObjectId;
    fromUserId: Types.ObjectId;
    text: string;
    image:string;
}

interface IRoom {
    name: string;
    participants: Types.ObjectId[];
    createBy: Types.ObjectId;
}

export {IUser, IMessage, IRoom};