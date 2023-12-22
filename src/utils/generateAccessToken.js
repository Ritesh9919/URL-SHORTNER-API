
import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

export const generateAccessToken = async(userId) =>{
   try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    return accessToken;
   } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating accessToken');
   }
}