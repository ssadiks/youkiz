import { combineReducers } from 'redux';

// Reducers
import videosReducer from './videosReducer';

const rootReducer = combineReducers({
  videosReducer: videosReducer
});

export default rootReducer;
