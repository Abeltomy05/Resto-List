import { Router, Request, Response } from "express";
import { authController } from "../di";

class AuthRoutes{
      public router: Router;
      constructor() {
            this.router = Router();
            this.initialRoutes();
       }

     initialRoutes(): void {
        this.router.post("/signup", (req: Request, res: Response) => {
            authController.signup(req, res);
        }) 
         this.router.post("/login", (req: Request, res: Response) => {
            authController.login(req, res);
        }) 

     }  
}

export const authRoutes = new AuthRoutes().router;