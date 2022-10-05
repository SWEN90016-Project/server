import express from "express";
import { me, updateMe, userInfo } from "../controllers/userController.js";
import {
  deleteFile,
  fileUpload,
  getFiles,
  upload,
  updateFile,
} from "../controllers/fileController.js";
import {
  addGroup,
  addUserToGroup,
  deleteGroup,
  findUserGroups,
  getGroup,
  removeUserFromGroup,
} from "../controllers/groupController.js";
import {
  addText,
  findUserTexts,
  getAllText,
  removeText,
  shareWithUser,
  updateText,
} from "../controllers/textController.js";
import { getPerms } from "../utils/auth.js";
import {
  deleteRequest,
  getRequests,
  newRequest,
} from "../controllers/authRequestController.js";
const router = express.Router();
router.get("/user", me);
router.put("/user", updateMe);
router.get("/userInfo", userInfo);
//Create
router.route("/single").post(upload.single("myFile"), fileUpload);
//Read
router.get("/getFile", getFiles);
//Update
router.put("/updateFile/:id", updateFile);
//Delete
router.delete("/deleteFile/:id", deleteFile);
router.post("/addGroup", addGroup);
router.get("/getGroup", getGroup);
router.put("/addUser/:id", addUserToGroup);
router.delete("/deleteGroup/:id", deleteGroup);
router.get("/getUserGroup/:id", findUserGroups);
router.delete("/removeUserFromGroup/:groupID/:userID", removeUserFromGroup);
router.delete("/deleteText/:id", removeText);
router.put("/shareWithUser/:id", shareWithUser);
router.post("/addText", addText);
router.get("/getAllText", getAllText);
router.get("/findUserTexts/:id", findUserTexts);
router.get("/permsCheck", getPerms);
router.put("/updateText/:id", updateText);
// create Request
router.post("/newRequest", newRequest);
// get Request
router.get("/getRequest", getRequests);
router.delete("/deleteRequest/:id", deleteRequest);
export default router;
