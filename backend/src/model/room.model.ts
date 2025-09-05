import mongoose, {Schema} from "mongoose";
import type { IMessage } from ".";
import {IRoom} from "."


const roomSchema: Schema = new Schema<IRoom> ({
    name: {type:String, default: ""},
    participants: [{type: Schema.Types.ObjectId, ref: "User"}],
    imageIcon: {type:String},
    createBy: {type: Schema.Types.ObjectId, ref: "User", default: null},
    messages:[{type:Schema.Types.ObjectId, ref: "Message"}],
    latestMessage: {type: Schema.Types.ObjectId, ref: "Message",default:null },
    hasRead: [{type: Schema.Types.ObjectId, ref: "User"}],
    isGroup: {type: Boolean, default: false}
    //Could add more in the future
}, 
{timestamps:true})

const Room = mongoose.model<IRoom> ("Room", roomSchema);

export default Room;