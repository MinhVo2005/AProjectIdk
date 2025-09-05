import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getOneOnOne, createRooms, getSearchUser } from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/getSearchUser",protectRoute, getSearchUser)
router.post("/createRooms",protectRoute, createRooms)
router.get("/getOneOnOne/:id", protectRoute, getOneOnOne)



export default router;