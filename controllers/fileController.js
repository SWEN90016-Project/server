import multer from "multer";
import File from "../models/file.js";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//     );
//   },
// });
export const upload = multer({ storage });

export const fileUpload = async (req, res, next) => {
  try {
    console.log(req.file);
    const file = new File({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
      text: req.body.filename,
    });
    const fileUploaded = await file.save();
    res.status(201).json({ message: "the file upload success", fileUploaded });
  } catch (error) {
    return next(error);
  }
};

export const getFiles = async (req, res) => {
  try {
    const data = await File.find();
    if (!data) {
      res.status(404).end();
    }
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};
// export const fileUpload = async (req, res, next) => {
//   console.log(req);
//   var obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   imgModel.create(obj, (err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // item.save();
//       res.redirect("/");
//     }
//   });
// };

// export const fileUpload = (req, res) => {
//   console.log(req.file);
//   res.json(req.file).status(200);
// };
