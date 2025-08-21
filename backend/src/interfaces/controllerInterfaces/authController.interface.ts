import { Request,Response } from "express";

export interface IAuthController{
    signup(req:Request,res:Response):Promise<void>;
    login(req:Request,res:Response):Promise<void>;
    refreshtoken(req:Request,res:Response):Promise<void>;
}