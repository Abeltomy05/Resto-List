import authAxiosInstance from "@/api/auth.axios";
import { userAxiosInstance } from "@/api/user.axios";
import { getErrorMessage } from "@/utils/error/error-handler";
import type { Restaurant } from "@/utils/types/restaurant.type";

export interface ApiResponse{
    success: boolean;
    message?: string;
    data?: any;
}

export const Service = {

    /*========================*/
         /*Auth Services*/
    /*========================*/

    signup: async (
        {username,email,password}:
        {username: string, email: string,password: string}
    ):Promise<ApiResponse>=>{
        try {
          const response = await authAxiosInstance.post("/signup",{username,email,password})
          return response.data;
        } catch (error:unknown) {
          return {
            success: false,
            message: getErrorMessage(error),
          };
        }
    },

    login: async (
        {email,password}:
        {email: string,password: string}
    ):Promise<ApiResponse>=>{
        try {
          const response = await authAxiosInstance.post('/login',{email,password})
          return response.data;
        } catch (error:unknown) {
          return {
            success: false,
            message: getErrorMessage(error),
          };
        }
    },

    logout: async():Promise<ApiResponse>=>{
      try {
         const response = await userAxiosInstance.post("/logout");
         return response.data;
      } catch (error:unknown) {
        return {
            success: false,
            message: getErrorMessage(error),
          };
      }
    },

    /*========================*/
         /*Restaurant Services*/
    /*========================*/

    addRestaurant: async(data: Omit<Restaurant, "id">):Promise<ApiResponse>=>{
     try {
      const response = await userAxiosInstance.post("/restaurants",data);
      return response.data;
     } catch (error) {
      return {
            success: false,
            message: getErrorMessage(error),
          };
     }
    },

    getRestaurants: async():Promise<ApiResponse>=>{
     try {
      const response = await userAxiosInstance.get("/restaurants");
      return response.data;
     } catch (error) {
      return {
            success: false,
            message: getErrorMessage(error),
          };
     }
    },

    editRestaurant: async(id:number,data:Omit<Restaurant, "id">):Promise<ApiResponse>=>{
     try {
      const response = await userAxiosInstance.patch(`/restaurants/${id}`,data);
      return response.data;
     } catch (error) {
      return {
            success: false,
            message: getErrorMessage(error),
          };
     }
    },

    deleteRestaurant: async(id:number):Promise<ApiResponse>=>{
     try {
      const response = await userAxiosInstance.delete(`/restaurants/${id}`);
      return response.data;
     } catch (error) {
      return {
            success: false,
            message: getErrorMessage(error),
          };
     }
    },

}