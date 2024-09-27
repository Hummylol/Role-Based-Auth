import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Username not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, username: user.username, message: "Logged in successfully",role:user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: "Username, password, and role are required" });
  }

  try {
    const userCheck = await userModel.findOne({ username });

    if (userCheck) {
      return res.status(400).json({ message: "Username already exists. Try logging in or use another username." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User created successfully", user: { username, role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login, register };