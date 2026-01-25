import AuthService from "../service/signup.service";
import {Request,Response} from "express";
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

  // login logic
  login = async (req:Request , res:Response) => {
    const user = await this.authlogic.login(req.body);

    res.status(200).json(
      new ApiResponse(200, "User logged in successfully", user)
    );
  }
  
}

export default AuthController ;