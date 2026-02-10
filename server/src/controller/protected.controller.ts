import {Response,Request} from "express";

class Protected{    
    protectedController = (req:Request , res:Response)=>{
        res.status(200).send("The route is alive");
    }
}

export default Protected;