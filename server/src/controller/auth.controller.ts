import AuthService from "../service/signup.service";
import express,{Request,Response} from "express";
import ApiResponse from "../utils/ApiResponse";

class AuthController {
  private authlogic = new AuthService();
  
  // singup logic
  signup = async(req:Request,res:Response)=>{
    const user = await this.authlogic.signup(req.body);

    res.status(201).json(
      new ApiResponse(201,"User created successfully" , user)
    );
  }
  
}

export default AuthController ;