import { env } from "../config/env";
import { userModel } from "../model/userModel";
import * as emailFucntion from "../config/email.config";
import * as customErrors from "../utils/specificErrors"; // import as namespace

interface mailHealthData {
    clientMial : string
}

class MailService {
    public mailHealthService = async(data : mailHealthData)=>{ // data is req.body
        const {clientMial} = data;
        const info = await emailFucntion.sendTestEmail(clientMial)

        return info?.messageId ;
    }
}

export default MailService ;