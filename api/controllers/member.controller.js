// import { JsonWebTokenError } from "jsonwebtoken";
import Member from "../models/member.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const addMember = async (req, res, next) => {
  try {
    const { name, photoUrl, designation } = req.body;
    if (
      !name ||
      name === "" ||
      !photoUrl ||
      photoUrl === "" ||
      !designation ||
      designation === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const newMember = new Member({
      name,
      photoUrl,
      designation,
    });
    await newMember.save();
    res.json({ message: "new member saved" });
  } catch (error) {
    next(error);
  }
};

export const getMember = async (req, res, next) => {
  try {
    const data = await Member.find({});
    // console.log(data)
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const memberId = req.params.memberid;
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      {
        $set: {
          name: req.body.name,
          photoUrl: req.body.photoUrl,
          designation: req.body.designation,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    next(error);
  }
};

export const signToAdmin = async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || name === "" || !password || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await Member.findOne({ name });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    if (!validUser.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }
    if (!bcryptjs.compareSync(password, validUser.password)) {
      return next(errorHandler(401, "wrong password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("member has been signout");
  } catch (error) {
    next(error);
  }
};
