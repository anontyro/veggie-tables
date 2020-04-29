import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import stock from './modules/stock/reducer';
import userCart from './modules/cart/reducer';
import modal from './modules/modal/reducer';

const rootReducer = combineReducers({
  user,
  stock,
  userCart,
  modal,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
