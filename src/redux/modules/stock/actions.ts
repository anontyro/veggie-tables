import { FETCHED_STOCK_LIST, FETCHING_STOCK_LIST } from './consts';
import { StockItem } from '../../../../types/Stock';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { BACKEND_ROUTES } from '../../../enum/routes';

interface FetchingStockList {
  type: FETCHING_STOCK_LIST;
}

interface FetchedStockList {
  type: FETCHED_STOCK_LIST;
  payload: StockItem[];
}

export type StockActions = FetchingStockList | FetchedStockList;

const fetchingStockList = (): FetchingStockList => ({
  type: FETCHING_STOCK_LIST,
});

const fetchedStockList = (stock: StockItem[]): FetchedStockList => ({
  type: FETCHED_STOCK_LIST,
  payload: stock,
});

export const fetchStockList = () => {
  return async (dispatch: ThunkDispatch<unknown, undefined, StockActions>, getState) => {
    const state: RootState = getState();

    if (state.stock.stockList.length > 0) {
      return;
    }

    dispatch(fetchingStockList());
    try {
      const response: any = await fetch(BACKEND_ROUTES.STOCK_ROOT);
      const json: { response: StockItem[] } = await response.json();
      dispatch(fetchedStockList(json.response));
    } catch (err) {
      console.error(err);
    }
  };
};
