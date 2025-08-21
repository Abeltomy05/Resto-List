import { injectable } from "tsyringe";
import { IRestaurantEntity } from "../entities/restaurant.entity";
import Restaurant from "../models/restaurant.model";
import { IRestaurantRepository } from "../interfaces/repositoryInterfaces/restaurantRepo.interface";

@injectable()
export class RestaurantRepository implements IRestaurantRepository{
     async create(restaurant: Omit<IRestaurantEntity, "id">): Promise<Restaurant> {
            return await Restaurant.create(restaurant);
     }

     async findById(id: number): Promise<Restaurant | null> {
          return await Restaurant.findOne({ where: { id } });
     } 

     async findByNameAndAddress(name: string, address: string, userId: number): Promise<Restaurant | null> {
          return await Restaurant.findOne({ where: { name, address, userId } });
     }

     async findAllByUserId(id: number): Promise<Restaurant[] | []> {
          return await Restaurant.findAll({ where: { userId:id } });
     }
     
     async updateById(id: number, data: Partial<IRestaurantEntity>): Promise<void> {
          await Restaurant.update(data, {
          where: { id },
          });
     }

     async deleteById(id: number): Promise<boolean> {
          const deletedCount = await Restaurant.destroy({
          where: { id },
          });

          return deletedCount > 0; 
     }
       
}