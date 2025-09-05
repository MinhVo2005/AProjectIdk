import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getMessages, getRoomsForSidebar, sendMessage, updateRead } from "../controllers/message.controller";

const router:Router = express.Router();

router.get("/rooms", protectRoute, getRoomsForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);
router.get("/updateRead/:roomId",  protectRoute, updateRead);

export default router;