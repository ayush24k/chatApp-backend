import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

export const pub = new Redis(process.env.VALKEY_REDIS_KEY);
export const sub = new Redis(process.env.VALKEY_REDIS_KEY);