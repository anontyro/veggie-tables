import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import stock from './modules/stock/reducer';
import cart from './modules/cart/reducer';

const rootReducer = combineReducers({
  user,
  stock,
  cart,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
