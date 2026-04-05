import AuthService from "../service/signup.service";
import {NextFunction, Request,Response} from "express";
import ApiResponse from "../utils/ApiResponse";
import * as E from "../utils/specificErrors"

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
      maxAge: 15*60*1000, // 15 min
    })  
    res.cookie('refreshToken' , user.refreshToken ,{
      httpOnly:true,
      secure: false, //  only for dev env. 
      sameSite:'strict' ,
      maxAge: 7*24*60*60*1000,
    })  
    if(req.user)
    req.user.role = user.role;


    res.status(200).json(
      new ApiResponse(200, "User logged in successfully",{
        "username" : user.username,
        "role" : user.role,
      })
    );
  }
  
  resetPassword = async(req:Request , res:Response,next:NextFunction)=>{
    try{
      const {newPassword,repeatNewPassword} = req.body ;
      // const token = req.query.token as unknown as string;
      const token = String(req.query.token);

      if(!newPassword || !token){
        throw new E.BadRequestError();
      }


      const x = await this.authlogic.resetPasswordService({token , newPassword , repeatNewPassword});
      res.status(200).json(
        new ApiResponse(
          200,
          "password changed seccessfully",
          {
            "username" : x
          },
          true
        )
      )
    }catch(err){
      next(err);
    }
  }
}

export default AuthController ;