import Restaurant from "./restaurant.model";
import User from "./user.model";

User.hasMany(Restaurant, {
  foreignKey: "userId",
  as: "restaurants",
});

Restaurant.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

export { User, Restaurant };

