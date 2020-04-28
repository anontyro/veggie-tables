import { StockItem } from '../../../../types/Stock';
import { StockActions } from './actions';
import {
  FETCHING_STOCK_LIST,
  FETCHED_STOCK_LIST,
  FETCHING_ITEM_DETAILS,
  FETCHED_ITEM_DETAILS,
  UPDATING_STOCK_ITEM,
  UPDATED_STOCK_ITEM,
} from './consts';
import HTTP_VERB from '../../../enum/http';

export interface StockState {
  stockList: StockItem[];
  currentItem: Partial<StockItem>;
  update: {
    httpVerb: HTTP_VERB | null;
    isUpdating: boolean;
  };
  isBusy: boolean;
}

export const INITIAL_STATE: StockState = {
  stockList: [],
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
