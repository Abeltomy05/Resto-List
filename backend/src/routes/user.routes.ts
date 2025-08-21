import { Router, Request, Response } from "express";
import { authController, userController } from "../di";
import { authMiddleware } from "../middlewares/auth.middleware";

class UserRoutes{
      public router: Router;
      constructor() {
            this.router = Router();
            this.initialRoutes();
       }

     initialRoutes(): void {

            /*========================*/
                    /* Auth */
            /*========================*/

         this.router.post("/logout", authMiddleware, (req: Request, res: Response) => {
            userController.logout(req, res);
         }) 
         this.router.post("/refresh-token", (req: Request, res: Response) => {
            authController.refreshtoken(req, res);
         }) 

            /*========================*/
                    /* Restaurant */
            /*========================*/

         this.router.post("/restaurants", authMiddleware, (req: Request, res: Response) => {
            userController.addRestaurant(req, res);
         }) 
         this.router.get("/restaurants", authMiddleware, (req: Request, res: Response) => {
            userController.getRestaurants(req, res);
         }) 
         this.router.patch("/restaurants/:id", authMiddleware, (req: Request, res: Response) => {
            userController.editRestaurant(req, res);
         }) 
         this.router.delete("/restaurants/:id", authMiddleware, (req: Request, res: Response) => {
            userController.deleteRestaurant(req, res);
         }) 
     }  
}

export const userRoutes = new UserRoutes().router;


