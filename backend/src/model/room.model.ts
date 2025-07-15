import mongoose, {Schema} from "mongoose";
import {IRoom} from "."


const roomSchema: Schema = new Schema<IRoom> ({
    name: {type:String, required: true},
    participants: [{type: Schema.Types.ObjectId, ref: "User"}],
    createBy: {type: Schema.Types.ObjectId, ref: "User"},
    //Could add more in the future
})

const Room = mongoose.model<IRoom> ("Room", roomSchema);

export default Room;