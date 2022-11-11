import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;

function validateJwt(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json('Missing authorization headers');
    }
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET as string);

    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
}

export default {
  validateJwt
};
