import {Request,Response,NextFunction} from "express";
import ApiResponse from "../utils/ApiResponse";
import MailService from "../service/mail.service";

const mailService  = new MailService();
class EmailController {
    public emailHealth = async(req:Request,res:Response,next:NextFunction) =>{
        try{
            const data = mailService.mailHealthService(req.body);
            return res.status(200).json(
                new ApiResponse(200,
                    "Email sent successfully",
                    `Data for trial this is info.response : ${data}`,
                    true
                )
            )
        }catch(err){
            next(err);
        }

    }

}

export default EmailController ;