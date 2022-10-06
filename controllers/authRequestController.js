import AuthRequest from "../models/authRequest.js";

export const newRequest = async (req, res, next) => {
  try {
    const request = new AuthRequest({
      _id: req.body._id,
      username: req.body.username,
      level: req.body.level,
    });
    const requested = await request.save();
    res.status(201).json({ requested });
  } catch (error) {
    return next(error);
  }
};

export const getRequests = async (req, res) => {
  try {
    const data = await AuthRequest.find();
    if (!data) {
      res.status(404).end();
    }
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const data = await AuthRequest.findByIdAndRemove(req.params.id);

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};
