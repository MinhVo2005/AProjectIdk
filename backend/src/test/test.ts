
import { connectDB } from "../lib/db.ts";
import {sendEmail} from "../lib/utils.ts";
import User from "../model/user.model.ts";
import crypto from "crypto"
import {Types} from "mongoose"

const name:string  = "Test2";
const email:string = "test2@email.com";
const token = "123";
const url: string = `http://localhost:5173/verify-email?token=${token}`

//sendEmail(name,email ,url);

//test verifyURL

//create a user
connectDB();
async function test (){
    const newUser = new User({
        displayName:name,
        email: email,
        password: "123456789",
        isUserVerify:false,
        emailVerificationToken: token,
        emailVerificationExpired: new Date(Date.now() + 1000 *60*60*365) //1 year
    })

    await newUser.save()
    sendEmail(name,email,url);
    console.log(newUser.emailVerificationExpired)
}


async function test2(){
    const type = new Types.ObjectId("687c6b35ea0a55bbf8858153")
    //addRoomToUser(type)
}

test2()