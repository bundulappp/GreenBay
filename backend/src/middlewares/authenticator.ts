import { Request, Response, NextFunction } from 'express';
import { unauthorizedError } from '../services/generalErrorService';
import { jwtService } from '../services/jwtService';

export default async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = jwtService.getTokenFromRequest(req);

  if (!token) {
    next(unauthorizedError('Token missing'));
    return;
  }

  if (!jwtService.verifyToken(token as string)) {
    next(unauthorizedError('Invalid token'));
    return;
  }

  next();
}
