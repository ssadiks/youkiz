import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter,
} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './redux/reducers';
import HeaderContainer from './components/container/HeaderContainer/HeaderContainer';

import Routes from './Routes';

const Root = () => (
  <BrowserRouter>
    <div>
      {renderRoutes(Routes)}
    </div>
  </BrowserRouter>
);
const middleware = [thunk];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

ReactDOM.hydrate(
  <Provider
    store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__())}
  >
    <MuiThemeProvider>
      <Root />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('#root'));
