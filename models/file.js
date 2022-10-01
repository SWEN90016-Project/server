import mongoose from "mongoose";

var FileSchema = new mongoose.Schema({
  fileName: String,

  fileType: String,

  fileSize: String,
  filePath: String,
  text: String,
});

const File = mongoose.model("File", FileSchema);

export default File;
