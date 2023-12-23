import e from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() == "")) {
    throw new ApiError(400, "All fields are required");
  }

  const isUserExist = await User.findOne({ $or: [{ username }, { email }] });

  if (isUserExist) {
    throw new ApiError(409, "User already exist");
  }

  const user = await User.create({ username, email, password });
  const registerUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(200, registerUser, "User register successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // cpmpare password
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credential");
  }

  const loginUser = await User.findById(user._id).select("-password");
  // create accessToken
  const accessToken = await generateAccessToken(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { loginUser, accessToken },
        "User login successfully"
      )
    );
});

export { registerUser, loginUser };
