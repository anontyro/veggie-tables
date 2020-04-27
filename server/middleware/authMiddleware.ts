import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { validateToken, JwtToken } from '../utils/authUtil';
import { sendHttpResponse } from '../utils/responseUtil';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    return sendHttpResponse({
      res,
      error: {
        message: 'Authorization header is required',
        errorCode: UNAUTHORIZED,
      },
      statusCode: UNAUTHORIZED,
    });
  }
  const token = authHeader.split(' ')[1] || '';
  const jwtToken: JwtToken | false = validateToken(token);

  if (!jwtToken) {
    return sendHttpResponse({
      res,
      error: {
        message: 'Not a valid token try signing in again',
        errorCode: UNAUTHORIZED,
      },
      statusCode: UNAUTHORIZED,
    });
  }

  res.locals.email = jwtToken.email;
  console.log(`user email moving to next`, res.locals.email);
  next();
};

export default authMiddleware;
