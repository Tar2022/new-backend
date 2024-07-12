
import  Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";



export const   verifyJwt=asyncHandler(async(req,_,next)=>{
  try {
//     console.log(req.cookies);
// console.log(req.headers);
const token =await req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);
      if(!token){
          throw new ApiError(401,"unauthorized acess")
      }
    
     const decodedToken= Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedToken);
  const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
  if(!user){
      
      throw new ApiError(401,"invalid Acess Token")
  }
  
  req.user=user;
  next()
  } catch (error) {
    console.log(error);
    throw new ApiError(401,error?.message||"Invalid acess Token")
  }



})

