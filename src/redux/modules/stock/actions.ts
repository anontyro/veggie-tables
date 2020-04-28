import {
  FETCHED_STOCK_LIST,
  FETCHING_STOCK_LIST,
  FETCHING_ITEM_DETAILS,
  FETCHED_ITEM_DETAILS,
  UPDATING_STOCK_ITEM,
  UPDATED_STOCK_ITEM,
  ADDING_STOCK_IMG,
  FETCHING_STOCK_IMG_LIST,
  FETCHED_STOCK_IMG_LIST,
  ADDED_STOCK_IMG,
} from './consts';
import { StockItem, StockImage, StockImageForm } from '../../../../types/Stock';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { BACKEND_ROUTES } from '../../../enum/routes';
import itemFetcher, { COMMON_HEADERS } from '../../../apiHelpers/itemFetcher';
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

interface FetchingStockImgList {
  type: FETCHING_STOCK_IMG_LIST;
}

interface FetchedStockImgList {
  type: FETCHED_STOCK_IMG_LIST;
  payload: StockImage[];
}

interface AddingStockImg {
  type: ADDING_STOCK_IMG;
}

interface AddedStockImg {
  type: ADDED_STOCK_IMG;
  payload: StockImage;
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
  | FetchingStockImgList
  | FetchedStockImgList
  | AddingStockImg
  | AddedStockImg
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

const fetchingStockImgList = (): FetchingStockImgList => ({
  type: FETCHING_STOCK_IMG_LIST,
});

const fetchedStockImgList = (stockImgList: StockImage[]): FetchedStockImgList => ({
  type: FETCHED_STOCK_IMG_LIST,
  payload: stockImgList,
});

const addingStockImg = (): AddingStockImg => ({
  type: ADDING_STOCK_IMG,
});

const addedStockImg = (stockImg: StockImage): AddedStockImg => ({
  type: ADDED_STOCK_IMG,
  payload: stockImg,
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

export const fetchStockImgList = (getFresh = false) => {
  return async (dispatch: ThunkDispatch<unknown, undefined, StockActions>, getState) => {
    const {
      stock: { stockImageList },
    }: RootState = getState();

    if (stockImageList.length > 0 && !getFresh) {
      return;
    }

    dispatch(fetchingStockImgList());

    try {
      const { response }: { response: StockImage[] } = await itemFetcher({
        url: BACKEND_ROUTES.STOCK_IMG_LIST,
      });

      dispatch(fetchedStockImgList(response));
    } catch (err) {
      console.error(err);
    }
  };
};

export const addStockImg = (imageForm: StockImageForm) => {
  return async (dispatch: ThunkDispatch<unknown, undefined, StockActions>, getState) => {
    dispatch(addingStockImg());

    const formData = new FormData();

    formData.append('image', imageForm.image);
    formData.append('dir', imageForm.dir);

    try {
      const { response }: { response: StockImage } = await itemFetcher({
        url: BACKEND_ROUTES.STOCK_IMG,
        extraHeaders: {
          ...COMMON_HEADERS.FORM_DATA,
        },
        method: HTTP_VERB.POST,
        body: formData,
      });
      dispatch(fetchStockImgList(true));
      dispatch(addedStockImg(response));
    } catch (err) {
      console.error(err);
    }
  };
};
