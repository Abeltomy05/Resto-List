import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants.ts/message";
import { CustomError } from "../utils/customError";
import { IUserDTO, UserLoginDTO, UserSignUpDTO } from "../utils/dto/user.dto";
import { comparePassword, hashPassword } from "../utils/bycript";
import { IAuthService } from "../interfaces/serviceInterfaces/authService.interface";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/repositoryInterfaces/userRepo.interface";
import { CustomJwtPayload } from "../middlewares/auth.middleware";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt";

@injectable()
export class AuthService implements IAuthService{
    constructor(
      @inject("IUserRepository")
      private _userRepo: IUserRepository
    ){}

 async signup(data: UserSignUpDTO): Promise<void> {
    const user = await this._userRepo.findByEmail(data.email);
    if (user) {
      throw new CustomError(
        SUCCESS_MESSAGES.USER_ALREADY_EXISTS,
        StatusCodes.CONFLICT
      );
    }

    const hashedPassword = await hashPassword(data.password!);
    data.password = hashedPassword;

    const savedUser = await this._userRepo.create(data);
  }

 async login(data: UserLoginDTO): Promise<{user:IUserDTO;access_token:string;refresh_token:string}>{
   const user = await this._userRepo.findByEmail(data.email);
     if(!user){
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
     }

     if(!(await comparePassword(data.password,user.password!))){
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        StatusCodes.UNAUTHORIZED
      );
     }

     const payload: CustomJwtPayload = {
      id: user.id,
      email: user.email,
    };

    const access_token = createAccessToken(payload);
    const refresh_token = createRefreshToken(payload);

    return { 
      user:{
        username: user.username,
        email:user.email,
        id:user.id
      }, 
      access_token, 
      refresh_token 
    };
 } 

 async refreshTokenVerify(
      refresh: string,
      access: string
    ): Promise<{ newAccessToken: string; }> {
      const decoded: any = verifyRefreshToken(refresh);
      const user = await this._userRepo.findById(decoded.id);
      if (!user) {
        throw new CustomError(ERROR_MESSAGES.TOKEN_INVALID_REUSED,StatusCodes.UNAUTHORIZED);
      }

      const payload: CustomJwtPayload = {
        id: user.id,
        email: user.email,
      };

      const newAccessToken = createAccessToken(payload);

      return { newAccessToken };
  }
}