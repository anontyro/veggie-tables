import { OK, BAD_REQUEST } from 'http-status-codes';
import * as path from 'path';
import { Controller, Get, Post, Delete, Put, Middleware } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import connection from '../connection';
import Stock from '../database/stock/Stock';
import { Like } from 'typeorm';
import { scanDirectories, saveFile } from '../utils/fileSystemUtils';
import authMiddleware from '../middleware/authMiddleware';
import formidableMiddleware from 'express-formidable';
import StockInformation from '../database/stock/StockInformation';
import { StockCompleteItem } from '../../types/Stock';
import { sendHttpResponse } from '../utils/responseUtil';

const getImageRoot = () => path.join((global as any).appRoot, './static/images');

interface stockArgs {
  details?: StockInformation[];
  promotions?: [];
}

const buildStockOutput = (item: Stock, res: Response) => ({
  details = [],
  promotions = [],
}: stockArgs = {}): void => {
  const response: StockCompleteItem = {
    item,
    promotions,
    details,
  };

  sendHttpResponse({
    res,
    response,
  });
};

interface ImageUploadFields {
  dir: string;
}

@Controller('api/stock/')
class StockController {
  @Get('images')
  private async getAllImages(req: Request, res: Response) {
    const imgDir = getImageRoot();
    const images = await scanDirectories(imgDir);
    return sendHttpResponse({
      res,
      response: {
        images,
      },
    });
  }

  @Post('image')
  @Middleware([formidableMiddleware(), authMiddleware])
  private async uploadImage(req: Request, res: Response) {
    const { dir = '' } = req.fields;
    const { image } = req.files;
    const saveDir = `${getImageRoot()}${dir}`;

    const savedFile = await saveFile(image, saveDir);
    if (!savedFile) {
      return sendHttpResponse({
        res,
        error: {
          message: 'Error saving image',
          errorCode: BAD_REQUEST,
        },
      });
    }

    return sendHttpResponse({
      res,
      response: { savedFile },
    });
  }

  @Get()
  private getAllItems(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        let stockList: Stock[] = [];
        const { name, price } = req.query;
        // if name query search for name
        if (name) {
          stockList = await connection.manager.find(Stock, {
            where: {
              name: Like(`%${name}%`),
            },
          });
          // if price query search for price
        } else if (price) {
          stockList = await connection.manager.find(Stock, {
            where: {
              unitPrice: Like(`${price}%`),
            },
          });
          // when no query just get the list
        } else {
          stockList = await connection.manager.find(Stock);
        }
        return sendHttpResponse({
          res,
          response: { output: stockList },
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return sendHttpResponse({
        res,
        error: {
          message: err.message,
          errorCode: BAD_REQUEST,
        },
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
        const response = buildStockOutput(item, res);

        if (item?.stockCode) {
          const details: StockInformation[] = await connection.manager.find(StockInformation, {
            where: {
              stockCode: item.stockCode,
            },
          });

          return response({ details });
        }

        return response();
      });
    } catch (err) {
      Logger.Err(err, true);
      return sendHttpResponse({
        res,
        error: {
          message: err.message,
          errorCode: BAD_REQUEST,
        },
      });
    }
  }

  @Post()
  @Middleware(authMiddleware)
  private addItem(req: Request, res: Response) {
    Logger.Info('adding new item');
    try {
      connection.then(async connection => {
        const item: Stock = req.body;
        const nextItem = connection.manager.create(Stock, item);
        const results = await connection.manager.save(nextItem);
        return sendHttpResponse({
          res,
          response: { results },
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return sendHttpResponse({
        res,
        error: {
          message: err.message,
          errorCode: BAD_REQUEST,
        },
      });
    }
  }

  @Put(':id')
  @Middleware(authMiddleware)
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
        const stockItem = await connection.manager.save(item);

        return sendHttpResponse({
          res,
          response: { stockItem },
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return sendHttpResponse({
        res,
        error: {
          message: err.message,
          errorCode: BAD_REQUEST,
        },
      });
    }
  }

  @Delete(':id')
  @Middleware(authMiddleware)
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
        return sendHttpResponse({
          res,
          response: {
            removed,
            item,
          },
        });
      });
    } catch (err) {
      Logger.Err(err, true);
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

export default StockController;
