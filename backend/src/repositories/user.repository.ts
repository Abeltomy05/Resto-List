import { injectable } from "tsyringe";
import { IUserEntity } from "../entities/user.entity";
import User from "../models/user.model";
import { IUserRepository } from "../interfaces/repositoryInterfaces/userRepo.interface";

@injectable()
export class UserRepository implements IUserRepository{
     async create(user: Omit<IUserEntity, "id">): Promise<User> {
            return await User.create(user);
     }

       async findByEmail(email: string): Promise<User | null> {
            return await User.findOne({ where: { email } });
       }

       async findById(id: number): Promise<User | null> {
            return await User.findOne({ where: { id } });
       }
}