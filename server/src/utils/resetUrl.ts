import crypto from 'node:crypto';
import { env } from '../config/env';


const getresetLinkData = () => {
    const token = crypto.randomBytes(32).toString('hex');
    const resetUrl = `${env.CLIENT_URL}/api/v1/user/reset-password?token=${token}`;

    const hashedResetToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    return {
        resetUrl,
        hashedResetToken,
        resetTokenExpiry
    };
};

export default getresetLinkData;
