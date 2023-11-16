import { userModel } from "../models/index.js";
import bcrypt from "bcryptjs";
import { createAccessToken, verifyAccessToken } from "../libs/index.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await userModel.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new userModel({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: false, //process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: [error.message] });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await userModel.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: [error.message] });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: ["Unauthorized"] });
    const payload = await verifyAccessToken(token);
    if (!payload) return res.status(401).json({ message: ["Unauthorized"] });
    const userFound = await userModel.findById(payload.id);
    console.log(userFound);
    if (!userFound)
      return res.status(404).json({ message: ["User not found"] });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: [error.message] });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: [error.message] });
  }
};
