import { User } from "../models/user.js";

export const me = async (req, res) => {
  try {
    const userAcc = await User.find().lean().exec();
    if (!userAcc) {
      res.status(404).end();
    }
    res.status(200).json({ data: userAcc });
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const userInfo = async (req, res) => {
  try {
    const userAcc = await User.find({}, "username email");
    if (!userAcc) {
      res.status(404).end();
    }
    res.status(200).json({ data: userAcc });
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};
