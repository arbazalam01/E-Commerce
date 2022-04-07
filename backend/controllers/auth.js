import User from "../models/user.js";
import { validationResult } from "express-validator";
import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

export const signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfull",
  });
};
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const user = new User(req.body);
  try {
    const data = await user.save();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  //   console.log(email);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        erroe: "User doesnot exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and pass do not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { email, _id, lastname } = user;
    return res.json({ email, _id, lastname, token });
  });
};

export const isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

export const isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACESS DENIED",
    });
  }
  next();
};
export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not admin",
    });
  }
  next();
};
