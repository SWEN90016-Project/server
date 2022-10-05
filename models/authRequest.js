import mongoose from "mongoose";
var authRequestSchema = new mongoose.Schema({
  username: String,
  level: String,
});

const AuthRequest = mongoose.model("AuthRequest", authRequestSchema);
export default AuthRequest;
