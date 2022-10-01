import express from "express";
import mongoose from "mongoose";
import { me, updateMe } from "../controllers/userController.js";
import { createPost, getAll } from "../controllers/contentController.js";
// import uploadController from "../controllers/uploadController.js";
import { fileUpload, getFiles, upload } from "../controllers/fileController.js";
// import streamifier from "streamifier";
import fs from "fs";
import { ObjectId } from "mongodb";
import multer from "multer";
const router = express.Router();
router.get("/user", me);
router.put("/user", updateMe);
router.get("/posts", getAll);
router.post("/newPost", createPost);
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });
// const upload = multer({ storage: multerStorage });

// router.post("/single", upload.single("myFile"), async (req, res) => {
//   // Stuff to be added later
//   //   console.log(req.body);
//   //   console.log(req.file);
//   //   res.send("file uploaded successfully");
//   try {
//     const newFile = new File({
//       name: req.file.filename,
//     });
//     const fileUploaded = await newFile.save();
//     res.status(200).json({
//       status: "success",
//       message: "File created successfully!!",
//       fileUploaded,
//     });
//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
// });

router.route("/single").post(upload.single("myFile"), fileUpload);
router.get("/getFile", getFiles);
// router.post("/single", (req, res) => {
//   console.log(req.files);
//   let filename = req.files.image.name;

//   var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     chunkSizeBytes: 1024,
//     bucketName: "filesBucket",
//   });

//   streamifier
//     .createReadStream(req.files.image.data)
//     .pipe(gridfsbucket.openUploadStream(filename))
//     .on("error", function (error) {
//       assert.ifError(error);
//     })
//     .on("finish", function () {
//       console.log("done!");
//       res.status(200).json({
//         success: true,
//         msg: "File Uploaded successfully..",
//       });
//     });
// });

// router.get("/findAll", (req, res) => {
//   // const filename = req.params.filename;

//   var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     chunkSizeBytes: 1024,
//     bucketName: "filesBucket",
//   });

//   const cursor = gridfsbucket.find({});
//   var fileInfos = [];
//   cursor.forEach((doc) => console.log(doc.filename));
//   cursor.forEach((doc) => {
//     fileInfos.push({
//       filename: doc.filename,
//     });
//   });

//   return res.status(200).send({ data: fileInfos });
// });
// router.get("/download", (req, res) => {
//   // const filename = req.params.filename;

//   var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     chunkSizeBytes: 1024,
//     bucketName: "filesBucket",
//   });
//   //   res.contentType("image/png");
//   const cursor = gridfsbucket.openDownloadStream(
//     ObjectId("6336a31aa134a2b09b18b6f8")
//   );
//   cursor.pipe(res);
//   //   cursor.on("data", function (data) {
//   //     return res.status(200).write(data);
//   //   });
// });
// router.post("/upload", uploadController.uploadFiles);
export default router;
