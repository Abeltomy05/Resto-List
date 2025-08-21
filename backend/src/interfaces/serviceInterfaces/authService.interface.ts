import { IUserDTO, UserLoginDTO, UserSignUpDTO } from "../../utils/dto/user.dto";

export interface IAuthService{
     signup(data: UserSignUpDTO): Promise<void>;
     login(data: UserLoginDTO): Promise<{user:IUserDTO;access_token:string;refresh_token:string}>;
     refreshTokenVerify( refresh: string, access: string ): Promise<{ newAccessToken: string; }>;
}