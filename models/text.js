import mongoose from "mongoose";
var textSchema = new mongoose.Schema({
  text: String,
  postedBy: String,
  sharedWith: [
    {
      _id: { type: mongoose.Types.ObjectId },
      username: String,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Text = mongoose.model("Text", textSchema);
export default Text;
