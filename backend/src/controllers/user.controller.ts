import { Request,Response } from "express";
import { handleErrorResponse } from "../utils/error.handler";
import { clearAuthCookies } from "../utils/helper/cookie.helper";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants.ts/message";
import { IUserController } from "../interfaces/controllerInterfaces/userController.interface";
import { RestaurantDTO } from "../utils/dto/restaurant.dto";
import { inject, injectable } from "tsyringe";
import { IUserService } from "../interfaces/serviceInterfaces/userService.interface";
import { CustomRequest } from "../middlewares/auth.middleware";

@injectable()
export class UserController implements IUserController{
    constructor(
      @inject("IUserService")
      private _userService: IUserService,
    ){}

    async logout(req:Request,res:Response):Promise<void>{
        try {
            clearAuthCookies(res);
            res.status(StatusCodes.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
			});
        } catch (error) {
             handleErrorResponse(res,error);
        }
    }

    async addRestaurant(req:Request,res:Response):Promise<void>{
        try {
            const data:Omit<RestaurantDTO, "id"> = req.body;
            const userId = (req as CustomRequest).user.id;

            if(!data.name || !data.phone || !data.address || !data.email){
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.MISSING_FIELDS,
                });
                return
            }

            const id = await this._userService.addRestaurant(data,userId);

            res.status(StatusCodes.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.CREATED,
                data:id
			});
        } catch (error) {
             handleErrorResponse(res,error);
        }
    }

    async getRestaurants(req:Request,res:Response):Promise<void>{
        try {
            const userId = (req as CustomRequest).user.id;

            const result = await this._userService.getRestaurants(userId);

            res.status(StatusCodes.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.CREATED,
                data:result
			});
        } catch (error) {
             handleErrorResponse(res,error);
        }
    }

    async editRestaurant(req:Request,res:Response):Promise<void>{
        try {
            const data:Omit<RestaurantDTO, "id"> = req.body;
            const id = req.params.id;
            const userId = (req as CustomRequest).user.id;
            if(!id){
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.MISSING_ID,
                });
                return
            }

            await this._userService.editRestaurant(data,Number(id),userId);

            res.status(StatusCodes.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.UPDATED,
			});
        } catch (error) {
             handleErrorResponse(res,error);
        }
    }

    async deleteRestaurant(req:Request,res:Response):Promise<void>{
        try {
            const id = req.params.id;
            const userId = (req as CustomRequest).user.id;
            if(!id){
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.MISSING_ID,
                });
                return
            }

            await this._userService.deleteRestaurant(Number(id),Number(userId));

            res.status(StatusCodes.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.DELETED,
			});
        } catch (error) {
             handleErrorResponse(res,error);
        }
    }
}