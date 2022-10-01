import express from "express";
import { me, updateMe } from "../controllers/userController.js";
import {
  deleteFile,
  fileUpload,
  getFiles,
  upload,
} from "../controllers/fileController.js";

const router = express.Router();
router.get("/user", me);
router.put("/user", updateMe);

router.route("/single").post(upload.single("myFile"), fileUpload);
router.get("/getFile", getFiles);
router.delete("/deleteFile/:id", deleteFile);
export default router;
