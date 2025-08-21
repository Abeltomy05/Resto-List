import { Request, Response, NextFunction } from 'express';
import {JwtPayload as DefaultJwtPayload} from 'jsonwebtoken'
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { verifyAccessToken } from '../utils/jwt';

export interface CustomJwtPayload extends DefaultJwtPayload {
    id: number;
    email: string;
}

export interface CustomRequest extends Request{
    user: CustomJwtPayload
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['access-token'];
  if(!token){
    res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED
    });
    return;
  }

  try {
     const decoded = verifyAccessToken(token);
     (req as CustomRequest).user = decoded;
     next();
  } catch (error) {
     res.status(StatusCodes.UNAUTHORIZED).json({
            message: ReasonPhrases.UNAUTHORIZED
        });
    return;
  }
}