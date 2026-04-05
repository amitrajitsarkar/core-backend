import {env} from "../config/env"
import { createClient } from "redis";
import { logger } from "../utils/logger";
export const redisClient = createClient({
    socket:{
        host: env.REDIS_HOST || "127.0.0.1",
        port: 6379,
    }
});

redisClient.on("error" , (err)=>{
    logger.error({err} ,"Error while connecting with redis ");
})

export const connectRedis = async()=>{
    if(!redisClient.isOpen){
        await redisClient.connect();
        logger.info("Redis is connected");
    }
}