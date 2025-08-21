export interface IRestaurantEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  userId: number;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}