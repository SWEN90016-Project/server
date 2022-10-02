// TODO
// USER GROUS
// ADMIN can add and remove users from groups??
// users in group, can see other members of groups
import mongoose from "mongoose";
var groupSchema = new mongoose.Schema({
  groupName: String,

  userList: [
    {
      _id: { type: mongoose.Types.ObjectId },
      username: String,
      email: String,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
