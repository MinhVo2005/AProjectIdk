import mongoose, {Schema} from "mongoose";
import type { IMessage } from ".";
import {IRoom} from "."


const roomSchema: Schema = new Schema<IRoom> ({
    name: {type:String},
    participants: [{type: Schema.Types.ObjectId, ref: "User"}],
    createBy: {type: Schema.Types.ObjectId, ref: "User", default: undefined},
    latestMessage: {type: Schema.Types.ObjectId, ref: "Message" },
    lastTimeStamps:{type: Date}
    //Could add more in the future
})

const Room = mongoose.model<IRoom> ("Room", roomSchema);

export default Room;