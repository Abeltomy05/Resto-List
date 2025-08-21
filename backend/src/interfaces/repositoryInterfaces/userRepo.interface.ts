import { IUserEntity } from "../../entities/user.entity";
import User from "../../models/user.model";

export interface IUserRepository{
    create(user: Omit<IUserEntity, "id">): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
}