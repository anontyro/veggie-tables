import { OK } from 'http-status-codes';
import { Response } from 'express';

interface BuildResponse {
  res: Response;
  response?: {};
  error?:
    | {
        errorCode: number;
        message: string;
      }
    | {};
  statusCode?: number;
}

export const sendHttpResponse = ({
  res,
  response = {},
  error = {},
  statusCode = OK,
}: BuildResponse) => {
  return res.status(statusCode).json({
    error: {
      ...error,
    },
    response: {
      ...response,
    },
  });
};
