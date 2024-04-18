import User from "../models/usersSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Fetching users failed" });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "User update failed" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "User deletion failed" });
  }
}

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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
}

export async function loginUser(req, res) {
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
}
