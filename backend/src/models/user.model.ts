import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { IUserEntity } from "../entities/user.entity";

export interface UserCreationModel extends Optional<IUserEntity, "id"> {}

class User extends Model<IUserEntity, UserCreationModel> implements IUserEntity {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
     password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;