import { IRestaurantEntity } from "../../entities/restaurant.entity";
import Restaurant from "../../models/restaurant.model";

export interface IRestaurantRepository{
    create(restaurant: Omit<IRestaurantEntity, "id">): Promise<Restaurant>;
    findById(id: number): Promise<Restaurant | null>;
    findByNameAndAddress(name: string, address: string, userId: number): Promise<Restaurant | null>;
    findAllByUserId(id: number): Promise<Restaurant[] | []>;
    updateById(id: number, data: Partial<IRestaurantEntity>): Promise<void>;
    deleteById(id: number): Promise<boolean>;
}