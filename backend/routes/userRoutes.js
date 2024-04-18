import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
} from "../controllers/authController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "UserProfiles",
    format: async (req, file) => "png, jpg, jpeg",
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/register", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);

export default router;
