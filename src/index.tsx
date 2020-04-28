import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import User from './pages/User';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux';
import './assets/main.css';
import HomePage from './pages/Home';
import Cart from './pages/Checkout/Cart';
import Item from './pages/Item';
import AddNewItem from './pages/Admin/AddNewItem';
import ItemList from './pages/Admin/ItemList';
import { FRONTEND_ROUTES } from './enum/routes';
import AdminLogin from './pages/Admin/AdminLogin';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { saveUserState, loadUserState } from './utils/localStorage';

const loadPersistedState = () => {
  const user = loadUserState();
  return {
    user,
  };
};

const store = createStore(
  rootReducer,
  loadPersistedState(),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveUserState(store.getState().user);
  }, 1000)
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route exact path={FRONTEND_ROUTES.HOME} component={HomePage} />
      <Route exact path={FRONTEND_ROUTES.CART} component={Cart} />
      <Route exact path={FRONTEND_ROUTES.USER} component={User} />
      <Route path={FRONTEND_ROUTES.ITEM_DETAILS} component={Item} />
      <ProtectedRoute exact path={FRONTEND_ROUTES.ADMIN.ADD_ITEM} component={AddNewItem} />
      <ProtectedRoute exact path={FRONTEND_ROUTES.ADMIN.ITEM_LIST} component={ItemList} />
      <Route exact path={FRONTEND_ROUTES.ADMIN.LOGIN} component={AdminLogin} />
    </Provider>
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
