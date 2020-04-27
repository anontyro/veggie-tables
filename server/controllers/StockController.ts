import { OK, BAD_REQUEST } from 'http-status-codes';
import * as path from 'path';
import { Controller, Get, Post, Delete, Put, Middleware } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import connection from '../connection';
import Stock from '../database/stock/entity';
import { Like } from 'typeorm';
import { scanDirectories, saveFile } from '../utils/fileSystemUtils';
import authMiddleware from '../middleware/authMiddleware';
import formidableMiddleware from 'express-formidable';

const getImageRoot = () => path.join((global as any).appRoot, './static/images');

interface ImageUploadFields {
  dir: string;
}

@Controller('api/stock/')
class StockController {
  @Get('images')
  private async getAllImages(req: Request, res: Response) {
    const imgDir = getImageRoot();
    const images = await scanDirectories(imgDir);
    return res.status(OK).json({
      error: {},
      response: images,
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
      return res.status(BAD_REQUEST).json({
        error: {
          message: 'error saving image',
          code: BAD_REQUEST,
        },
        response: {},
      });
    }

    return res.status(OK).json({
      error: {},
      response: savedFile,
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
  @Middleware(authMiddleware)
  private addItem(req: Request, res: Response) {
    Logger.Info('adding new item');
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
