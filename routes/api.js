import express from "express";
import { me, updateMe, userInfo } from "../controllers/userController.js";
import {
  deleteFile,
  fileUpload,
  getFiles,
  upload,
} from "../controllers/fileController.js";
import {
  addGroup,
  addUserToGroup,
  deleteGroup,
  findUserGroups,
  getGroup,
  removeUserFromGroup,
} from "../controllers/groupController.js";
const router = express.Router();
router.get("/user", me);
router.put("/user", updateMe);
router.get("/userInfo", userInfo);
router.route("/single").post(upload.single("myFile"), fileUpload);
router.get("/getFile", getFiles);
router.delete("/deleteFile/:id", deleteFile);
router.post("/addGroup", addGroup);
router.get("/getGroup", getGroup);
router.put("/addUser/:id", addUserToGroup);
router.delete("/deleteGroup/:id", deleteGroup);
router.get("/getUserGroup/:id", findUserGroups);
router.delete("/removeUserFromGroup/:groupID/:userID", removeUserFromGroup);
export default router;
