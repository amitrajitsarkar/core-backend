import {Request,Response,NextFunction} from "express";
import ApiResponse from "../utils/ApiResponse";
import MailService from "../service/mail.service";

const mailService  = new MailService();
class EmailController {
    public emailHealth = async(req:Request,res:Response,next:NextFunction) =>{
        try{
            const data = await mailService.mailHealthService(req.body);
            return res.status(200).json(
                new ApiResponse(200,
                    "Email sent successfully",
                    `Data for trial this is info.messageId : ${data}`,
                    true
                )
            )
        }catch(err){
            next(err);
        }

    }

    public recoveryMail = async(req:Request,res:Response,next:NextFunction) =>{
        try{
            const data = await mailService.recoveryMailService(req.body);
            return res.status(200).json(
                new ApiResponse<string>(200,
                    "Email for password recovery is sent successfully",
                    `MessageId : ${data}`,
                    true
                )
            )
        }catch(error){
            next(error);
        }
    }

}

export default EmailController ;