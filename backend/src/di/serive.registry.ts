import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";
import { IAuthService } from "../interfaces/serviceInterfaces/authService.interface";
import { UserService } from "../services/user.service";
import { IUserService } from "../interfaces/serviceInterfaces/userService.interface";

export class ServiceRegister{
    static registerService(): void{
        container.register<IAuthService>("IAuthService",{
            useClass: AuthService
        })
        container.register<IUserService>("IUserService",{
            useClass: UserService
        })
    }
}