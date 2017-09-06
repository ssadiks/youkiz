import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import App from './components/container/App';
import HeaderContainer from './components/container/HeaderContainer';
import VideosListContainer from './components/container/VideosListContainer';
import VideoDetailsContainer from './components/container/VideoDetailsContainer';
import NotFound from './components/presentational/NotFound';
import reducers from './redux/reducers';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Root = () => (
  <Router>
    <div>
      <HeaderContainer/>
      <hr/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/videos" component={VideosListContainer} />
        <Route path="/videos/:videoId" component={VideoDetailsContainer}/>
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <Root />
  </Provider>
  , document.querySelector('.container'));
