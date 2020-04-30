import { StockItem } from '../../../../types/Stock';
import { CartActions } from './actions';
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from './consts';

export interface CartItem {
  item: StockItem;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

export const INITIAL_STATE: CartState = {
  cart: [],
};

const userCart = (state: CartState = INITIAL_STATE, action: CartActions): CartState => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const cart = addToCart(state.cart, action.payload);
      return {
        ...state,
        cart,
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
        cartItem.quantity--;
        return {
          ...cartItem,
        };
      } else {
        return null;
      }
    } else {
      return cartItem;
    }
  });
  return output.filter(cartItem => cartItem !== null);
};

const addToCart = (cart: CartItem[], item: StockItem): CartItem[] => {
  let toAdd = true;
  const output: CartItem[] = cart.map(cartItem => {
    if (cartItem.item.id === item.id) {
      toAdd = false;
      cartItem.quantity++;
      return {
        ...cartItem,
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

export default userCart;

export const cartSubTotal = (state: CartState): number => {
  let subTotal = 0;
  state.cart.forEach((item: CartItem) => {
    const cost = item.quantity * item.item.unitPrice;
    subTotal += cost;
  });

  return subTotal;
};
