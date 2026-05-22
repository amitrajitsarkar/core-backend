import { env } from '../config/env';
import pino from 'pino';
import path from 'node:path';

// const isDev = process.env.NODE_ENV !== 'production';
const isDev = true;

export const logger = pino({
  level: env.LOG_LEVEL || 'info',
  redact: [
    'req.headers.authorization',
    'req.body.password',
    'body.password',
    'req.body.token',
    'body.token',
    'req.headers.cookie',
    'res.headers["set-cookie"]',
  ],
  base: {
    service: 'core-backend',
    env: env.NODE_ENV,
  },
  transport: {
    targets: [
     
      {
        target: 'pino-roll',
        level: 'info',
        options: {
          file: path.join(process.cwd(), 'logs', 'app.log'),
          frequency: 'daily',
          size: '10m',
          dateFormat: 'yyyy-MM-dd',
          mkdir: true,
        },
      },
      {
        target: 'pino-roll',
        level: 'error',
        options: {
          file: path.join(process.cwd(), 'logs', 'error.log'),
          frequency: 'daily',
          size: '10m',
          dateFormat: 'yyyy-MM-dd',
          mkdir: true,
        },
      },
      ...(isDev
        ? [
            {
              target: 'pino-pretty',
              level: 'info',
              options: {
                colorize: true,
                translateTime: 'HH:MM:ss',
                ignore: 'pid,hostname',
              },
            },
          ]
        : []),
    ],
  },
});