import { StockItem } from '../../../../types/Stock';
import { CartActions } from './actions';
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from './consts';

interface CartItem {
  item: StockItem;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

export const INITIAL_STATE: CartState = {
  cart: [],
};

const cart = (state: CartState = INITIAL_STATE, action: CartActions): CartState => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: addToCart(state.cart, action.payload),
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: removeFromCart(state.cart, action.payload.id),
      };
    case CLEAR_CART:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const removeFromCart = (cart: CartItem[], id: number) => {
  const output: CartItem[] = cart.map(cartItem => {
    if (cartItem.item.id === id) {
      if (cartItem.quantity > 1) {
        return {
          ...cartItem,
          quantity: cartItem.quantity--,
        };
      }
    } else {
      return cartItem;
    }
  });
  return output;
};

const addToCart = (cart: CartItem[], item: StockItem): CartItem[] => {
  let toAdd = true;
  const output: CartItem[] = cart.map(cartItem => {
    if (cartItem.item.id === item.id) {
      toAdd = false;
      return {
        ...cartItem,
        quantity: cartItem.quantity++,
      };
    }
    return cartItem;
  });
  if (toAdd) {
    output.push({
      item,
      quantity: 1,
    });
  }
  return output;
};

export default cart;
