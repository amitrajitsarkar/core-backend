import { env } from '../config/env';
import { userModel } from '../model/userModel';
import * as emailFucntion from '../config/email.config';
import * as E from '../utils/specificErrors'; // import as namespace

import getresetLinkData from '../utils/resetUrl';

interface mailHealthData {
    clientMail: string;
}

class MailService {
    public mailHealthService = async (data: mailHealthData) => {
        // data is req.body
        const { clientMail } = data;
        const info = await emailFucntion.sendTestEmail(clientMail);
        return info?.messageId;
    };

    public recoveryMailService = async (data: mailHealthData) => {
        // data is req.body
        const { clientMail } = data;
        const existMail = await userModel.findOne({ email: clientMail });

        if (!existMail) {
            throw new E.BadRequestError("user don't exists !");
        }
        
        const linkData = getresetLinkData();
        //TODO: have to save the hashedtoken and the expiry in the correct db model

        const hashedtoken = linkData.hashedResetToken;
        const expTime = linkData.resetTokenExpiry;

        const filter = { email: clientMail };
        const update = { 
            resetToken : hashedtoken,
            resetTokenExpiry : expTime,
        };

        await userModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true,
            rawResult: true, // Return the raw result from the MongoDB driver
        });
        

        const infoMsgId = await emailFucntion.sendResetEmail(
            clientMail,
            linkData.resetUrl,
        );
        return infoMsgId;
    };
}

export default MailService;
