import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from './consts';
import { StockItem } from '../../../../types/Stock';

interface AddItemToCart {
  type: ADD_ITEM_TO_CART;
  payload: StockItem;
}

interface RemoveItemFromCart {
  type: REMOVE_ITEM_FROM_CART;
  payload: {
    id: number;
  };
}

interface ClearCart {
  type: CLEAR_CART;
}

export type CartActions = AddItemToCart | RemoveItemFromCart | ClearCart;

export const addItemToCart = (item: StockItem): AddItemToCart => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
});

export const removeItemFromCart = (id: number): RemoveItemFromCart => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: { id },
});

export const clearCart = (): ClearCart => ({
  type: CLEAR_CART,
});
