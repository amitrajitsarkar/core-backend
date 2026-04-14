import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redisClient } from "../config/redisConnection";

export const createtransactionRateLimit = () => rateLimit({
    windowMs : 15 * 60 * 1000 , // window  TTl
    max : 5, 
    message:{
        status : 429,
        message : "Too many transactions, please try again later"
    },
    store : new RedisStore ({
        sendCommand : (...args : string[])=> redisClient.sendCommand(args),
    })
})