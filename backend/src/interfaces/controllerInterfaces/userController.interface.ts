import { Request,Response } from "express";

export interface IUserController{
    logout(req:Request,res:Response):Promise<void>;
    addRestaurant(req:Request,res:Response):Promise<void>;
    getRestaurants(req:Request,res:Response):Promise<void>;
    editRestaurant(req:Request,res:Response):Promise<void>;
    deleteRestaurant(req:Request,res:Response):Promise<void>;
}