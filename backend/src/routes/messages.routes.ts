import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.ts";
import { getMessages, getRoomsForSidebar, sendMessage } from "../controllers/message.controller.ts";

const router:Router = express.Router();

router.get("/rooms", protectRoute, getRoomsForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("send/:id", protectRoute, sendMessage);


export default router;