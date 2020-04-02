import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import connection from '../connection';
import Stock from '../database/stock/entity';

@Controller('api/stock/')
class StockController {
  @Get(':id')
  private getById(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const { id } = req.params;
        const item: Stock = await connection.manager.findOne(Stock, {
          where: {
            id: id,
          },
        });
        return res.status(OK).json({
          response: item,
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}

export default StockController;
