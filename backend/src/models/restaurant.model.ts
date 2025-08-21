import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { IRestaurantEntity } from "../entities/restaurant.entity";

export interface RestaurantCreationModel extends Optional<IRestaurantEntity, "id"> {}

class Restaurant extends Model<IRestaurantEntity, RestaurantCreationModel> implements IRestaurantEntity {
  public id!: number;
  public name!: string;
  public email!: string;
  public address!: string;
  public phone!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: false,
    },
     address: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
     phone: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    userId: {   
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
  },
},
  {
    sequelize,
    tableName: "restaurants",
    timestamps: true,
  }
);

export default Restaurant;
