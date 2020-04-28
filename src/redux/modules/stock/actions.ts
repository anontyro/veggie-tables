import {
  FETCHED_STOCK_LIST,
  FETCHING_STOCK_LIST,
  FETCHING_ITEM_DETAILS,
  FETCHED_ITEM_DETAILS,
  UPDATING_STOCK_ITEM,
  UPDATED_STOCK_ITEM,
} from './consts';
import { StockItem } from '../../../../types/Stock';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { BACKEND_ROUTES } from '../../../enum/routes';
import itemFetcher from '../../../apiHelpers/itemFetcher';
import HTTP_VERB from '../../../enum/http';
import { getBearerHeader } from '../user/reducer';
import { ItemFetcher } from '../../../apiHelpers/itemFetcher';

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

interface UpdatingStockItem {
  type: UPDATING_STOCK_ITEM;
  payload: HTTP_VERB;
}

interface UpdatedStockItem {
  type: UPDATED_STOCK_ITEM;
  payload: Partial<StockItem>;
}

export type StockActions =
  | FetchingStockList
  | FetchedStockList
  | FetchingItemDetails
  | FetchedItemDetails
  | UpdatingStockItem
  | UpdatedStockItem;

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

const updatingStockItem = (httpVerb: HTTP_VERB): UpdatingStockItem => ({
  type: UPDATING_STOCK_ITEM,
  payload: httpVerb,
});

const updatedStockItem = (stockItem: Partial<StockItem>): UpdatedStockItem => ({
  type: UPDATED_STOCK_ITEM,
  payload: stockItem,
});

export const fetchStockList = (getFresh = false) => {
  return async (dispatch: ThunkDispatch<unknown, undefined, StockActions>, getState) => {
    const state: RootState = getState();

    if (state.stock.stockList.length > 0 && !getFresh) {
      return;
    }

    dispatch(fetchingStockList());
    try {
      const json: { response: StockItem[] } = await itemFetcher({ url: BACKEND_ROUTES.STOCK_ROOT });

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
      return;
    }

    dispatch(fetchingItemDetails());
    try {
      const json: { response: StockItem } = await itemFetcher({
        url: `${BACKEND_ROUTES.STOCK_ROOT}/${id}`,
      });

      dispatch(fetchedItemDetails(json.response));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateItem = (
  item: Partial<StockItem>,
  httpVerb: HTTP_VERB,
  onFetched?: () => void
) => {
  return async (dispatch: ThunkDispatch<unknown, undefined, StockActions>, getState) => {
    dispatch(updatingStockItem(httpVerb));
    const state: RootState = getState();
    const authHeader = getBearerHeader(state.user);
    const fetchOptions: ItemFetcher = {
      url: BACKEND_ROUTES.STOCK_ROOT,
      method: HTTP_VERB.POST,
      extraHeaders: authHeader,
      body: item,
      onFetched,
    };

    switch (httpVerb) {
      case HTTP_VERB.DELETE:
        await itemFetcher({
          ...fetchOptions,
          method: HTTP_VERB.DELETE,
          url: `${fetchOptions.url}/${item.id}`,
        });
        break;
      case HTTP_VERB.PUT:
        await itemFetcher({
          ...fetchOptions,
          method: HTTP_VERB.PUT,
          url: `${fetchOptions.url}/${item.id}`,
        });
        break;
      // post is default
      default:
        const addedItem: StockItem = await itemFetcher(fetchOptions);
        item.id = addedItem.id;
        break;
    }

    dispatch(updatedStockItem(item));
  };
};
