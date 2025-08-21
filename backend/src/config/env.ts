import dotenv from 'dotenv';
dotenv.config(); 

export const config = {
  ORIGIN: process.env.ORIGIN,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  isProduction: process.env.NODE_ENV === "production",
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET
};