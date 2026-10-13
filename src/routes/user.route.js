import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { upload } from './../middleware/multer.middleware.js';
const userRouter = Router();
userRouter.post(
  "/register",
  upload.single("avatar"),
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  
  registerUser
);

export default userRouter;
