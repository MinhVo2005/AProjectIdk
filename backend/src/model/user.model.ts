import mongoose, {Schema, Types} from "mongoose";
import { IUser } from ".";

const userSchema:Schema = new Schema<IUser> ({
    email: {type: String, required: true,trim:true, unique: true },
    displayName: {type: String, required: true, trim: true},
    password: {
        type:String,
        required: true,
        minlength:8,
        match: [/\d/, "Password must contain at least one number"],
    },
    profilePic: {type:String, default: ""},
    //Verification
    isUserVerify:{type: Boolean, default: false},
    emailVerificationToken: String,
    emailVerificationExpired: Date,

    rooms: [{type: Types.ObjectId, ref: "Room"}]

}, {timestamps: true})

userSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});
userSchema.set('toObject', {
  transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;