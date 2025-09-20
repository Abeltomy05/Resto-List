import { inject, injectable } from "tsyringe";
import { IUserService } from "../interfaces/serviceInterfaces/userService.interface";
import { RestaurantDTO } from "../utils/dto/restaurant.dto";
import { IRestaurantRepository } from "../interfaces/repositoryInterfaces/restaurantRepo.interface";
import { CustomError } from "../utils/customError";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES } from "../constants.ts/message";

@injectable()
export class UserService implements IUserService{
    constructor(
      @inject("IRestaurantRepository")
      private _restaurantRepo: IRestaurantRepository
    ){}

    async addRestaurant(data:Omit<RestaurantDTO, "id">,id:number):Promise<{id:number}>{
       const userId = id;
       const existing = await this._restaurantRepo.findByNameAndAddress(data.name, data.address, userId);
        if (existing) {
            throw new CustomError(ERROR_MESSAGES.RESTAURANT_ALREADY_EXISTS ,StatusCodes.CONFLICT);
        }

        const result = await this._restaurantRepo.create({
            ...data,
            userId, 
        });

        return {id:result.id};
    }

    async getRestaurants(userId:number):Promise<RestaurantDTO[]>{
       const restaurants = await this._restaurantRepo.findAllByUserId(userId);

         return restaurants.map(r => ({
            id: r.id,
            name: r.name,
            address: r.address,
            phone: r.phone,
            email: r.email
         }));
      
    }

    async editRestaurant(data:Omit<RestaurantDTO, "id">,id:number,userId:number):Promise<void>{
         const existing = await this._restaurantRepo.findByNameAndAddress(
            data.name,
            data.address,
            userId
         );

         if (existing && existing.id !== id) {
            throw new CustomError(
               ERROR_MESSAGES.RESTAURANT_ALREADY_EXISTS,
               StatusCodes.CONFLICT
            );
         }
         
       await this._restaurantRepo.updateById(id,data);
    }

    async deleteRestaurant(id:number,userId:number):Promise<void>{
       const restaurant = await this._restaurantRepo.findById(id);

       if (!restaurant) {
         throw new CustomError(ERROR_MESSAGES.RESTAURANT_NOT_FOUND,StatusCodes.NOT_FOUND);
       }

       if (restaurant.userId !== userId) {
          throw new CustomError(ERROR_MESSAGES.CANT_DELETE_RESTAURANT,StatusCodes.FORBIDDEN);
       }

       const res = await this._restaurantRepo.deleteById(id);

       if(!res){
        throw new CustomError(ERROR_MESSAGES.FAILED_TO_DELETE_RESTAURANT,StatusCodes.INTERNAL_SERVER_ERROR);
       }
    }
}