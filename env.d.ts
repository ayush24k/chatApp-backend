declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        VALKEY_REDIS_KEY: string;
    }
}