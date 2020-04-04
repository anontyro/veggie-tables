import {
  FETCHED_STOCK_LIST,
  FETCHING_STOCK_LIST,
  FETCHING_ITEM_DETAILS,
  FETCHED_ITEM_DETAILS,
} from './consts';
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

interface FetchingItemDetails {
  type: FETCHING_ITEM_DETAILS;
}

interface FetchedItemDetails {
  type: FETCHED_ITEM_DETAILS;
  payload: StockItem;
}

export type StockActions =
  | FetchingStockList
  | FetchedStockList
  | FetchingItemDetails
  | FetchedItemDetails;

const fetchingStockList = (): FetchingStockList => ({
  type: FETCHING_STOCK_LIST,
});

const fetchedStockList = (stock: StockItem[]): FetchedStockList => ({
  type: FETCHED_STOCK_LIST,
  payload: stock,
});

const fetchingItemDetails = (): FetchingItemDetails => ({
  type: FETCHING_ITEM_DETAILS,
});

const fetchedItemDetails = (stockItem: StockItem): FetchedItemDetails => ({
  type: FETCHED_ITEM_DETAILS,
  payload: stockItem,
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

export const fetchItemDetail = (id: number) => {
  return async (dispatch: ThunkDispatch<unknown, undefined, StockActions>, getState) => {
    const state: RootState = getState();

    if (state.stock?.currentItem?.id === id) {
      return;
    }

    const itemInStore = state.stock.stockList.find(item => item.id === id);

    if (itemInStore) {
      dispatch(fetchedItemDetails(itemInStore));
    }

    dispatch(fetchingItemDetails());
    try {
      const response: any = await fetch(`${BACKEND_ROUTES.STOCK_ROOT}/${id}`);
      const json: { response: StockItem } = await response.json();
      dispatch(fetchedItemDetails(json.response));
    } catch (err) {
      console.error(err);
    }
  };
};
