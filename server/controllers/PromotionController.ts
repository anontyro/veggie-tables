import { Controller, Get, Post, Delete, Put, Middleware } from '@overnightjs/core';
import connection from '../connection';
import PromotionTypes from '../database/promotion/PromotionTypes';
import { sendHttpResponse } from '../utils/responseUtil';
import { BAD_REQUEST } from 'http-status-codes';
import { Request, Response } from 'express';

@Controller('api/promotion')
class PromotionController {
  @Get()
  private async getAllPromotions(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const promoList = await connection.manager.find(PromotionTypes);

        return sendHttpResponse({
          res,
          response: {
            promoList,
          },
        });
      });
    } catch (err) {
      return sendHttpResponse({
        res,
        error: {
          message: err.message,
          errorCode: BAD_REQUEST,
        },
      });
    }
  }
}

export default PromotionController;
