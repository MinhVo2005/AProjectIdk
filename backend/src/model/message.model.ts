import mongoose, {Schema} from "mongoose";
import {IMessage} from './index';

const messageSchema: Schema = new Schema<IMessage> (
    {
     roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },    
},
{timestamps: true});

export const Message = mongoose.model<IMessage>("Message", messageSchema);