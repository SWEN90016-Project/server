import express from "express";
import { me, updateMe } from "../controllers/userController.js";

const router = express.Router();
router.get("/user", me);
router.put("/user", updateMe);

export default router;
