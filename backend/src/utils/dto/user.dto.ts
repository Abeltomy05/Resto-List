export interface UserLoginDTO{
    email: string;
    password: string;
}


export interface UserSignUpDTO extends UserLoginDTO{
    username: string;
}

export interface IUserDTO{
   id:number;
   username:string;
   email:string;
   password?:string;
   createdAt?: Date;
   updatedAt?: Date;
}