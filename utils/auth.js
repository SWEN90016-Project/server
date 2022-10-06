import config from "../config/index.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secret.jwt, {
    expiresIn: config.secret.jwtExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secret.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }
  try {
    console.log(req.body);
    // const newUser = new User({
    //   email: req.body.email,
    //   username: req.body.username,
    //   password: req.body.password,
    // });
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }
  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password tier")
      .exec();
    if (!user) {
      return res.status(401).send({ message: "no such user" });
    }

    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send({ message: "wrong password" });
    }
    const token = newToken(user);
    return res.status(201).send({
      id: user._id,
      email: user.email,
      tier: user.tier,
      accessToken: token,
    });
  } catch (e) {
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  console.log(req.headers.authorization.split("Bearer ")[1]);
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  const token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end();
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id)
      .select("-password")
      .lean()
      .exec();
    req.user = user;
    res.status(200).send(user);
    next();
  } catch (e) {
    return res.status(401).end();
  }
};

export const getPerms = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  const token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end();
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id)
      .select("Permissions username")
      .lean()
      .exec();
    // req.user = user;
    res.status(200).json({ user });
    next();
  } catch (e) {
    return res.status(401).end();
  }
};
