import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import stock from './modules/stock/reducer';
import userCart from './modules/cart/reducer';

const rootReducer = combineReducers({
  user,
  stock,
  userCart,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
