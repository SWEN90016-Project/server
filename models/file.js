import mongoose from "mongoose";

var FileSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  fileName: String,
  fileType: String,
  fileSize: String,
  filePath: String,
  text: String,
  title: String,
  postedBy: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const File = mongoose.model("File", FileSchema);

export default File;
