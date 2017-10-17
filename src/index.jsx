import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/container/App';
import HeaderContainer from './components/container/HeaderContainer';
import VideosListContainer from './components/container/VideosListContainer';
import DancersListContainer from './components/container/BackOfficeContainer';
import NotFound from './components/presentational/NotFound/NotFound';
import reducers from './redux/reducers';

const Root = () => (
  <Router>
    <div>
      <HeaderContainer />
      <hr />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/videos" component={VideosListContainer} />
        <Route path="/bo" component={DancersListContainer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__())}
  >
    <MuiThemeProvider>
      <Root />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('#root'));
