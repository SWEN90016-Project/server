import mongoose from "mongoose";
var textSchema = new mongoose.Schema({
  text: String,

  sharedWith: [
    {
      _id: { type: mongoose.Types.ObjectId },
      username: String,
    },
  ],
});

const Text = mongoose.model("Text", textSchema);
export default Text;
