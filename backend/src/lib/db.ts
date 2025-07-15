import mongoose, { Mongoose } from "mongoose";
import {config} from "dotenv";
config();

export const connectDB = async() =>{
try{
    const MONGODB_URI:string = process.env.MONGODB_URI!;
   const conn:Mongoose =  await mongoose.connect(MONGODB_URI);
   console.log(`MongoDB connected: ${conn.connection.host}`);
}catch(error){
    console.log("MongoDB connection error:",error);
}

}