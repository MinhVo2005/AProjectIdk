import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.ts";
import { addRoomsToSidebar } from "../controllers/message.controller.ts";
import { getOneOnOne, createRooms, getSearchUser } from "../controllers/user.controller.ts";

const router: Router = express.Router();

router.get("/getSearchUser",protectRoute, getSearchUser)
router.post("/createRoom",protectRoute, createRooms)
router.get("/getOneOnOne/:id", protectRoute, getOneOnOne)

router.post("/addRoom/:id",protectRoute, addRoomsToSidebar);

export default router;