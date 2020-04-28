import jwt from 'jsonwebtoken';
import { IUser } from '../database/user/entity';

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
const TOKEN_EXPIRY_SECONDS = process.env.TOKEN_EXPIRY || 86400;

export const createNewToken = (user: IUser, expires?: number): string => {
  const token = jwt.sign({ id: user.id, email: user.email, issued: Date.now() }, SECRET, {
    expiresIn: expires || TOKEN_EXPIRY_SECONDS,
  });
  return token;
};

export const validateToken = (token: string): JwtToken | false => {
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
