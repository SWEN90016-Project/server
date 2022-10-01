import mongoose from "mongoose";

var FileSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  fileName: String,

  fileType: String,

  fileSize: String,
  filePath: String,
  text: String,
  title: String,
});

const File = mongoose.model("File", FileSchema);

export default File;
