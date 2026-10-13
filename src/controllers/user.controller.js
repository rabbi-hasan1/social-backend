import { validationResult } from "express-validator";
import { asyncHandler } from "../utlits/asyncHandler.js";
import { ApiError } from "../utlits/apiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiResponse } from "./../utlits/apiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const avatar = req.file?.path;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

const isUserExists = await User.findOne({
  $or: [
    { email },
    { username },
  ],
}).select("-password");

if (isUserExists) {
  return res.status(409).json(
    new ApiError(409, "User already exists")
  );
}

  if (!avatar) {
    return res.status(400).json(new ApiError(400, "avatar is required required"));
  }

  const profile = await uploadOnCloudinary(avatar);

  const user = await User.create({
    username,
    email,
    password,
    avatar: profile?.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "Account created successfully"));
});
