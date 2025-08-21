import { Request,Response } from "express";
import { handleErrorResponse } from "../utils/error.handler";
import { IAuthController } from "../interfaces/controllerInterfaces/authController.interface";
import { inject, injectable } from "tsyringe";
import { UserLoginDTO, UserSignUpDTO } from "../utils/dto/user.dto";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants.ts/message";
import { IAuthService } from "../interfaces/serviceInterfaces/authService.interface";
import { setCookies, updateCookieWithAccessToken } from "../utils/helper/cookie.helper";
import { CustomError } from "../utils/customError";
import { verifyAccessToken } from "../utils/jwt";

@injectable()
export class AuthController implements IAuthController{
    constructor(
      @inject("IAuthService")
      private _authService: IAuthService
    ){}

    async signup(req:Request,res:Response):Promise<void>{
        try {
            const data:UserSignUpDTO = req.body;
            if(!data.email || !data.username || !data.password){
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.MISSING_CREDENTIALS
                })
            } 

            await this._authService.signup(data);
            res.status(StatusCodes.OK).json({
                success:true,
                message:SUCCESS_MESSAGES.USER_REGISTERED,
            });
        } catch (error) {
            handleErrorResponse(res,error);
        }
    }

    async login(req:Request,res:Response):Promise<void>{
        try {
            const data:UserLoginDTO = req.body;
            if(!data.email || !data.password){
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.MISSING_CREDENTIALS
                })
            }

            const response = await this._authService.login(data);
            const {user,access_token,refresh_token} = response;

            setCookies(res, access_token, refresh_token);
            
            res.status(StatusCodes.OK).json({
                success:true,
                message:SUCCESS_MESSAGES.LOGIN_SUCCESS,
                data: user,
            });
        } catch (error) {
            handleErrorResponse(res,error);
        }
    }

    async refreshtoken(req:Request,res:Response):Promise<void>{
          const accessToken = req.cookies["access-token"];
          const refreshToken = req.cookies["refresh-token"];   

          console.log("Access Token:", accessToken);
          console.log("Refresh Token:", refreshToken);

          if (!refreshToken) {
                throw new CustomError(ERROR_MESSAGES.TOKEN_MISSING, StatusCodes.UNAUTHORIZED);
           }

        try{
            if (accessToken) {
                try {
                    verifyAccessToken(accessToken);
                    res.status(StatusCodes.OK).json({
                    success: true,
                    message: SUCCESS_MESSAGES.TOKEN_VALID,
                    });
                    return;
                } catch (err: any) {
                    if (err.name !== "TokenExpiredError") {
                    throw new CustomError(ERROR_MESSAGES.TOKEN_INVALID, StatusCodes.UNAUTHORIZED);
                    }
                }
            } 

            const {newAccessToken} = await this._authService.refreshTokenVerify(refreshToken,accessToken)
            updateCookieWithAccessToken(res, newAccessToken);
            
            res.status(StatusCodes.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.SESSION_RENEWED,
            })
        }catch(error){
            handleErrorResponse(res,error);
        }
    }
}