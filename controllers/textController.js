import mongoose from "mongoose";
import Text from "../models/text.js";
// TODO: edit text

// add text post thats shared with a user
export const addText = async (req, res) => {
  console.log(req.body);
  try {
    const text = new Text({
      text: req.body.text,
      postedBy: req.body.postedBy,
      sharedWith: [
        {
          _id: mongoose.Types.ObjectId(req.body.id),
          username: req.body.username,
        },
      ],
    });
    text.save();
    // const newText = await Text.create(req.body);
    // add user to share with
    res.status(200).send(text);
  } catch (error) {
    console.log(error);
  }
};

// share with another user
export const shareWithUser = async (req, res) => {
  try {
    const data = await Text.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { sharedWith: req.body },
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
  } catch (e) {
    console.log(e);
  }
};
// get all posts
export const getAllText = async (req, res) => {
  try {
    const data = await Text.find();
    if (!data) {
      res.status(404).end();
    }
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};
// remove text post
export const removeText = async (req, res) => {
  try {
    const data = await Text.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(404).end();
    }
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};
// find posts shared with user
export const findUserTexts = async (req, res) => {
  try {
    const textID = await Text.aggregate([
      {
        $unwind: "$sharedWith",
      },
      {
        $match: {
          "sharedWith._id": mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    if (!textID) {
      res.status(404).end();
    }

    const texts = await Text.find({
      _id: { $in: textID },
    });
    console.log(texts);

    res.status(200).json({ texts });
  } catch (e) {
    console.log(e);
  }
};
//update text
export const updateText = async (req, res) => {
  console.log(req.body);
  try {
    const data = await Text.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { text: req.body.text },
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
  } catch (e) {
    console.log(e);
  }
};
