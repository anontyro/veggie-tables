import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import stock from './modules/stock/reducer';

const rootReducer = combineReducers({
  user,
  stock,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
