// src/middleware/protectRoute.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/user.model";
import { IUser } from "../model";
import {config} from "dotenv";
config();


interface TokenPayload extends JwtPayload {
  userId: string;
}

export async function protectRoute(
  req: Request,      // now has optional `user` property
  res: Response,
  next: NextFunction
):Promise<any> {
  try {
    const token = req.cookies?.jwt as string | undefined;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized – no token provided" });
    }

    // jwt.verify either throws or returns JwtPayload | string
    const decoded = jwt.verify(
      token,
      process.env.JWTSECRET!
    ) as TokenPayload;

    if (!decoded.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized – invalid token payload" });
    }

    const user: IUser | null = await User.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isUserVerify) {
      return res
        .status(403)
        .json({ message: "Email not verified. Please verify first." });
    }

    // attach the typed user to req.user
    req.user = user;

    next();
  } catch (err: any) {
    console.error("Error in protectRoute middleware:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
