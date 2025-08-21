import { container } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { IUserRepository } from "../interfaces/repositoryInterfaces/userRepo.interface";
import { IRestaurantRepository } from "../interfaces/repositoryInterfaces/restaurantRepo.interface";
import { RestaurantRepository } from "../repositories/restaurant.repository";

export class RepositoryRegister{
    static registerRepository():void{
        container.register<IUserRepository>("IUserRepository",{
            useClass: UserRepository
        })
        container.register<IRestaurantRepository>("IRestaurantRepository",{
            useClass: RestaurantRepository
        })
    }
}