import { env } from "../config/env";
import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: env.LOG_LEVEL || "info",
  redact: [
  'req.headers.authorization',
  'req.body.password',      // if logging raw req object
  'body.password',          // if using pino-http serializer
  'req.body.token',
  'body.token',
  'req.headers.cookie',        // redacts the whole cookie header --  the tokens were exposed :--
  'res.headers["set-cookie"]',
],
  base:{
    service: "core-backend", // usefull @ multiple services
    env : env.NODE_ENV
  }
    ,
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});