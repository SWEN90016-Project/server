import { Content } from "../models/content.js";
import multer from "multer";
export const getAll = async (req, res) => {
  try {
    const content = await Content.find();
    if (!content) {
      res.status(404).end();
    }
    res.status(200).json({ data: content });
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};

export const createPost = async (req, res) => {
  //   const { title, date, text, upload, uploadedBy } = req.body;

  //   const newPostMessage = new Content({
  //     title,
  //     date,
  //     text,
  //     upload,
  //     uploadedBy,
  //   });

  try {
    const content = await Content.create(req.body);

    res.status(201).send({ content });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
