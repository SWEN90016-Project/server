import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: String,
  date: {
    type: Date,
    default: new Date(),
  },
  text: String,
  upload: String,
  uploadedBy: String,
});

export const Content = mongoose.model("content", contentSchema);
