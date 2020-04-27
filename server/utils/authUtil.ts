import jwt from 'jsonwebtoken';
import User from '../database/user/entity';

require('dotenv').config();

export interface AuthArgs {
  jwtToken?: string;
}

export interface JwtToken {
  id: number;
  email: string;
  issued: number;
  iat: number;
  exp: number;
}

const LOCAL_SECRET = '123efg34wsdfv43rwfcse3r4t5htrbfvcf3r43qwfv';
const SECRET = process.env.JWT_SECRET || LOCAL_SECRET;
const TOKEN_EXPIRY_SECONDS = 86400;

export const myAuthChecker = (args: AuthArgs) => {
  if (args.jwtToken) {
    return true;
  }
  return false;
};

export const createNewToken = (user: User, expires?: number): string => {
  const token = jwt.sign({ id: user.id, email: user.email, issued: Date.now() }, SECRET, {
    expiresIn: expires || TOKEN_EXPIRY_SECONDS,
  });
  return token;
};

export const validateToken = (token: string): any => {
  try {
    const verified: any = jwt.verify(token, SECRET);
    return verified;
  } catch (ex) {
    return false;
  }
};

export const isValidJWTFormat = (token: string) => {
  const matched = token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) || [];
  return matched.length === 1 ? true : false;
};
