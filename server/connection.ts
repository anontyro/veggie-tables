import { createConnection } from 'typeorm';
import Stock from './database/stock/Stock';
import StockInformation from './database/stock/StockInformation';
import PromotionTypes from './database/promotion/PromotionTypes';
import StockPromotions from './database/stock/StockPromotions';
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const defaultConnection = {
  name: 'default',
  type: 'mysql',
  host: DB_HOST,
  port: 3306,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Stock, StockInformation, StockPromotions, PromotionTypes],
};

const connection = createConnection({
  name: defaultConnection.name,
  type: 'mysql',
  host: defaultConnection.host,
  port: defaultConnection.port,
  username: defaultConnection.username,
  password: defaultConnection.password,
  database: defaultConnection.database,
  synchronize: true,
  logging: true,
  entities: [...defaultConnection.entities],
});

export default connection;
