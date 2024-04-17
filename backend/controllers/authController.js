import User from "../models/usersSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const newUser = new User({
      username,
      email,
      password,
      profilePicture: req.file.path,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
