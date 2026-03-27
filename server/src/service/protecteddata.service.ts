import { env } from '../config/env';
import { redisClient } from '../config/redisConnection';
import { userModel } from '../model/userModel';
import { logger } from '../utils/logger';

class ProtectedData {
    public expTime = env.REDIS_EXP_SEC;
    public AdminOnlyData = async () => {
        const cached = await redisClient.get('Admin-only-data');
        if (cached) {
            logger.info('Redis cache hit');
            return JSON.parse(cached);
        }
        logger.info('Redis cache miss');

        const data = await userModel.find({});
        await redisClient.set('Admin-only-data', JSON.stringify(data), {
            expiration: {
                type: 'EX',
                value: this.expTime,
            },
        });
        return data;
    };

    public ModeratorOnlyData = async () => {
        const cached = await redisClient.get('moderator-only-data');
        if (cached) {
            logger.info('Redis cache hit');
            return JSON.parse(cached);
        }
        logger.info('Redis cache miss');
        const data = await userModel.find({
            role: { $nin: ['admin'] },
        });
        await redisClient.set('moderator-only-data', JSON.stringify(data), {
            expiration: {
                type: 'EX',
                value: this.expTime,
            },
        });
        return data;
    };
}

export default ProtectedData;
