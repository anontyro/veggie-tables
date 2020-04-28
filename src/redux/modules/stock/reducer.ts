import { StockItem, StockImage } from '../../../../types/Stock';
import { StockActions } from './actions';
import {
  FETCHING_STOCK_LIST,
  FETCHED_STOCK_LIST,
  FETCHING_ITEM_DETAILS,
  FETCHED_ITEM_DETAILS,
  UPDATING_STOCK_ITEM,
  UPDATED_STOCK_ITEM,
  FETCHING_STOCK_IMG_LIST,
  FETCHED_STOCK_IMG_LIST,
  ADDING_STOCK_IMG,
  ADDED_STOCK_IMG,
} from './consts';
import HTTP_VERB from '../../../enum/http';

export interface StockState {
  stockList: StockItem[];
  stockImageList: StockImage[];
  currentItem: Partial<StockItem>;
  update: {
    httpVerb: HTTP_VERB | null;
    isUpdating: boolean;
  };
  isBusy: boolean;
}

export const INITIAL_STATE: StockState = {
  stockList: [],
  stockImageList: [],
  currentItem: null,
  update: {
    httpVerb: null,
    isUpdating: false,
  },
  isBusy: false,
};

const stock = (state: StockState = INITIAL_STATE, action: StockActions): StockState => {
  switch (action.type) {
    case FETCHING_STOCK_LIST:
      return {
        ...state,
        isBusy: true,
      };
    case FETCHED_STOCK_LIST:
      return {
        ...state,
        stockList: action.payload,
        isBusy: false,
      };
    case FETCHING_ITEM_DETAILS:
      return {
        ...state,
        isBusy: true,
      };
    case FETCHED_ITEM_DETAILS:
      return {
        ...state,
        currentItem: action.payload,
        isBusy: false,
      };
    case FETCHING_STOCK_IMG_LIST:
      return {
        ...state,
        isBusy: true,
      };
    case FETCHED_STOCK_IMG_LIST:
      return {
        ...state,
        stockImageList: action.payload,
        isBusy: false,
      };
    case ADDING_STOCK_IMG:
      return {
        ...state,
        isBusy: true,
      };
    case ADDED_STOCK_IMG:
      return {
        ...state,
        isBusy: false,
      };
    case UPDATING_STOCK_ITEM:
      return {
        ...state,
        update: {
          httpVerb: action.payload,
          isUpdating: true,
        },
      };
    case UPDATED_STOCK_ITEM:
      return {
        ...state,
        currentItem: action.payload,
        update: {
          ...state.update,
          isUpdating: false,
        },
      };
    default:
      return state;
  }
};

export default stock;
