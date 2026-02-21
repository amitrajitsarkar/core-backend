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

    res.cookie('accessToken' , user.accessToken ,{
      httpOnly:true,
      secure: false, //  only for dev env. 
      sameSite: 'strict' ,
      maxAge: 15*1000, // should not be this low ~15sec only for testing purpose.
    })  
    res.cookie('refreshToken' , user.refreshToken ,{
      httpOnly:true,
      secure: false, //  only for dev env. 
      sameSite:'strict' ,
      maxAge: 7*24*60*60*1000,
    })  

    req.role = user.role ;


    res.status(200).json(
      new ApiResponse(200, "User logged in successfully",{
        "username" : user.username,
        "role" : user.role,
      })
    );
  }
  
}

export default AuthController ;