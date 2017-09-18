import { combineReducers } from 'redux';

// Reducers
import videosReducer from './videosReducer';
import dancersReducer from './dancersReducer';

const rootReducer = combineReducers({
  videosReducer,
  dancersReducer
});

export default rootReducer;
