import { RestaurantDTO } from "../../utils/dto/restaurant.dto";

export interface IUserService{
    addRestaurant(data:Omit<RestaurantDTO, "id">,id:number):Promise<{id:number}>;
    getRestaurants(userId:number):Promise<RestaurantDTO[]>;
    editRestaurant(data:Omit<RestaurantDTO, "id">,id:number):Promise<void>;
    deleteRestaurant(id:number):Promise<void>;
}