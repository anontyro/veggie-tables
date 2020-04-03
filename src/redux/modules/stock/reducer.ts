import { StockItem } from '../../../../types/Stock';
import { StockActions } from './actions';
import { FETCHING_STOCK_LIST, FETCHED_STOCK_LIST } from './consts';

export interface StockState {
  stockList: StockItem[];
  isBusy: boolean;
}

export const INITIAL_STATE: StockState = {
  stockList: [],
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
    default:
      return state;
  }
};

export default stock;
