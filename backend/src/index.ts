import 'reflect-metadata'
import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from "./config/db";
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.route';
import { config } from './config/config';

const app = express();

const PORT = config.PORT

app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: config.ORIGIN,
  methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders:["Authorization","Content-Type"],
  credentials:true
}));

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
  console.log(err);
  res.status(500).json({message:err.message || "Something went wrong"});
})

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);

sequelize.sync() 
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => console.log("🚀 Server running on http://localhost:3000"));
  })
  .catch(err => console.error("❌ Sync error:", err));