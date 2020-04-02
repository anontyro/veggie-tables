import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import connection from '../connection';
import Stock from '../database/stock/entity';

@Controller('api/stock/')
class StockController {
  @Get()
  private getAllItems(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const itemList: Stock[] = await connection.manager.find(Stock);
        return res.status(OK).json({
          response: itemList,
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
        response: {},
      });
    }
  }

  @Get(':id')
  private getById(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const { id } = req.params;
        const item: Stock = await connection.manager.findOne(Stock, {
          where: {
            id,
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
        response: {},
      });
    }
  }

  @Post()
  private addItem(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const item: Stock = req.body;
        const nextItem = connection.manager.create(Stock, item);
        const results = await connection.manager.save(nextItem);
        return res.status(OK).json({
          response: results,
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
        response: {},
      });
    }
  }

  @Delete(':id')
  private removeItem(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const { id } = req.params;
        const item: Stock = await connection.manager.findOne(Stock, {
          where: {
            id,
          },
        });
        const results = await connection.manager.delete(Stock, id);
        const removed = results.raw.affectedRows > 0;
        return res.status(OK).json({
          removed,
          response: item,
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
        response: {},
      });
    }
  }
}

export default StockController;
