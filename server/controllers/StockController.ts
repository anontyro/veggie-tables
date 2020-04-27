import { OK, BAD_REQUEST } from 'http-status-codes';
import * as path from 'path';
import { Controller, Get, Post, Delete, Put } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import connection from '../connection';
import Stock from '../database/stock/entity';
import { Like } from 'typeorm';
import { scanDirectories } from '../utils/fileSystemUtils';

@Controller('api/stock/')
class StockController {
  @Get('images')
  private async getAllImages(req: Request, res: Response) {
    const imgDir = path.join((global as any).appRoot, './static/images');
    const images = await scanDirectories(imgDir);

    return res.status(OK).json({
      error: {},
      response: images,
    });
  }

  @Get()
  private getAllItems(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        let output: Stock[] = [];
        const { name, price } = req.query;
        // if name query search for name
        if (name) {
          output = await connection.manager.find(Stock, {
            where: {
              name: Like(`%${name}%`),
            },
          });
          // if price query search for price
        } else if (price) {
          output = await connection.manager.find(Stock, {
            where: {
              unitPrice: Like(`${price}%`),
            },
          });
          // when no query just get the list
        } else {
          output = await connection.manager.find(Stock);
        }
        return res.status(OK).json({
          response: output,
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

  @Put(':id')
  private updateItem(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const { id } = req.params;
        const item: Stock = await connection.manager.findOne(Stock, {
          where: {
            id,
          },
        });
        connection.manager.merge(Stock, item, req.body);
        const results = await connection.manager.save(item);
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
