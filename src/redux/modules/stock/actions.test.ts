import * as stockActions from './actions';
import { StockItem } from '../../../../types/Stock';
import { INITIAL_STATE } from './reducer';
import { FETCHED_STOCK_LIST, FETCHED_ITEM_DETAILS } from './consts';
import { BACKEND_ROUTES } from '../../../enum/routes';

const MockItem: StockItem = {
  id: 1,
  name: 'carrots',
  unitPrice: 1.99,
  currency: 'SGD',
  imageUrl: '/static/images/carrots_01.jpg',
  stockLevel: 20,
  description: 'An orange root vegetable ',
};

describe('StockActions', () => {
  test('dispatch the correct actions and payload for fetchStockList', async () => {
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: [MockItem] });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await stockActions.fetchStockList()(dispatch, () => ({
      stock: INITIAL_STATE,
    }));
    expect(dispatch).toBeCalledWith({
      payload: [
        {
          ...MockItem,
        },
      ],
      type: FETCHED_STOCK_LIST,
    });
    expect(window.fetch).toBeCalledWith(`${BACKEND_ROUTES.STOCK_ROOT}`);
    expect(mockResolved).toBeCalledTimes(1);
  });

  test('fetchStockList will no fire any actions when item is in store', async () => {
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: MockItem });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await stockActions.fetchStockList()(dispatch, () => ({
      stock: {
        ...INITIAL_STATE,
        stockList: [MockItem],
      },
    }));
    expect(dispatch).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);
    expect(mockResolved).toBeCalledTimes(0);
  });

  test('fetchStockList will get fresh data when getFresh is true', async () => {
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: MockItem });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await stockActions.fetchStockList(true)(dispatch, () => ({
      stock: {
        ...INITIAL_STATE,
        stockList: [MockItem],
      },
    }));
    expect(dispatch).toBeCalledTimes(2);
    expect(window.fetch).toBeCalledTimes(1);
    expect(mockResolved).toBeCalledTimes(1);
  });

  test('dispatch the correct actions and payload for fetchDetails', async () => {
    const MOCK_ID = 1;
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: MockItem });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await stockActions.fetchItemDetail(MOCK_ID)(dispatch, () => ({
      stock: INITIAL_STATE,
    }));
    expect(dispatch).toBeCalledWith({
      payload: {
        ...MockItem,
      },
      type: FETCHED_ITEM_DETAILS,
    });
    expect(window.fetch).toBeCalledWith(`${BACKEND_ROUTES.STOCK_ROOT}/${MOCK_ID}`);
    expect(mockResolved).toBeCalledTimes(1);
  });

  test('fetchDetails will no fire any actions when item is in stockList', async () => {
    const MOCK_ID = 1;
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: MockItem });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await stockActions.fetchItemDetail(MOCK_ID)(dispatch, () => ({
      stock: {
        ...INITIAL_STATE,
        stockList: [MockItem],
      },
    }));
    expect(dispatch).toBeCalledWith({
      payload: {
        ...MockItem,
      },
      type: FETCHED_ITEM_DETAILS,
    });
    expect(window.fetch).toBeCalledTimes(0);
    expect(mockResolved).toBeCalledTimes(0);
  });

  test('fetchDetails will no fire any actions when item is in currentItem', async () => {
    const MOCK_ID = 1;
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: MockItem });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await stockActions.fetchItemDetail(MOCK_ID)(dispatch, () => ({
      stock: {
        ...INITIAL_STATE,
        currentItem: MockItem,
      },
    }));
    expect(dispatch).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);
    expect(mockResolved).toBeCalledTimes(0);
  });
});
