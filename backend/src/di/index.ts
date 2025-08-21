import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";
import { IAuthController } from "../interfaces/controllerInterfaces/authController.interface";
import { ServiceRegister } from "./serive.registry";
import { RepositoryRegister } from "./repository.registry";
import { IUserController } from "../interfaces/controllerInterfaces/userController.interface";
import { UserController } from "../controllers/user.controller";

export class DependencyInjection{
  static registerAll():void{
    ServiceRegister.registerService();
    RepositoryRegister.registerRepository();
  }
}

 DependencyInjection.registerAll();

 export const authController = container.resolve<IAuthController>(AuthController); 
 export const userController = container.resolve<IUserController>(UserController); 