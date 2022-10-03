import mongoose from "mongoose";
import Group from "../models/groups.js";

export const addGroup = async (req, res) => {
  console.log(req.body);
  try {
    const newGroup = await Group.create(req.body);

    res.status(200).send(newGroup);
  } catch (error) {
    console.log(error);
  }
};

export const addUserToGroup = async (req, res) => {
  try {
    const data = await Group.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { userList: req.body },
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
    // res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
};
export const getGroup = async (req, res) => {
  try {
    const data = await Group.find();
    if (!data) {
      res.status(404).end();
    }
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};
export const deleteGroup = async (req, res) => {
  try {
    const data = await Group.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(404).end();
    }
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};

export const findUserGroups = async (req, res) => {
  try {
    const groupID = await Group.aggregate([
      {
        $unwind: "$userList",
      },
      {
        $match: {
          "userList._id": mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    if (!groupID) {
      res.status(404).end();
    }

    const groups = await Group.find({
      _id: { $in: groupID },
    });
    console.log(groups);

    res.status(200).json({ groups });
  } catch (e) {
    console.log(e);
  }
};

export const removeUserFromGroup = async (req, res) => {
  try {
    const data = await Group.findOneAndUpdate(
      { _id: req.params.groupID },
      { $pull: { userList: { _id: req.params.userID } } },
      { new: true }
    );
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
};

// TODO: DELETE USER FROM GROUP
