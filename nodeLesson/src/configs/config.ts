import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5550,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,

    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    SECRET_ACTION_KEY: process.env.SECRET_ACTION_KEY,

    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
    EXPIRES_IN_ACTION: process.env.EXPIRES_IN_ACTION,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    FRONTEND_URL: process.env.FRONTEND_URL,
    FRONTEND_URL_FORGOT: process.env.FRONTEND_URL_FORGOT,

    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,

    PORT_MONGO: process.env.PORT_MONGO,
    MONGODB_NAME: process.env.MONGODB_NAME,
};
