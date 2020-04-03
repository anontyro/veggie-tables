import React from 'react';
import ReactDOM from 'react-dom';
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

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/user" component={User} />
      <Route path="/item/:id" component={Item} />
    </Provider>
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
