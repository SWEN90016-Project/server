import express from "express";
import { me, updateMe } from "../controllers/userController.js";
import { createPost, getAll } from "../controllers/contentController.js";
const router = express.Router();
router.get("/user", me);
router.put("/user", updateMe);
router.get("/posts", getAll);
router.post("/newPost", createPost);
export default router;
