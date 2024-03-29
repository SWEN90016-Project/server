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

export const upload = multer({ storage });

export const fileUpload = async (req, res, next) => {
  console.log(req.file);
  try {
    const file = new File({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
      text: req.body.text,
      title: req.body.title,
      postedBy: req.body.username,
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

export const deleteFile = async (req, res) => {
  try {
    const data = await File.findByIdAndRemove(req.params.id);
    // console.log(data.filePath);
    fs.unlink(data.filePath, (err) => {
      if (err) {
        console.log("failed to delete local image:" + err);
      } else {
        console.log("successfully deleted local image");
      }
    });
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};

//update file
export const updateFile = async (req, res) => {
  console.log(req.body);
  try {
    const data = await File.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { text: req.body.text },
        function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        },
      }
    );
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};

export const download = async (req, res) => {
  console.log(req.body);
  try {
    const data = await File.findById(req.params.id).select("filePath");
    if (!data) {
      res.status(404).end();
    }

    res.download(data.filePath, function (err) {
      if (err) {
        if (res.headersSent) {
        } else {
          return res.sendStatus(404);
        }
      } else {
      }
    });
  } catch (e) {
    console.log(e);
  }
};
