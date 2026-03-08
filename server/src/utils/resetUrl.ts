import crypto from 'node:crypto';
import { env } from '../config/env';


const getresetLinkData = () => {
    const token = crypto.randomBytes(32).toString('hex');
    // token = "a1b2c3d4e5f6..." (64 random characters)

    // 3. Build the link using the RAW token
    const resetUrl = `${env.CLIENT_URL}/reset-password?token=${token}`;

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
