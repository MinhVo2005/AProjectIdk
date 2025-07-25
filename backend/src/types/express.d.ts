// src/types/express.d.ts
import { IUser } from "../model/user.model";

declare global {
  namespace Express {
    // now req.user will be IUser
    interface Request {
      user: IUser;
    }
  }
}
