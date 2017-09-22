import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import videosReducer from './videosReducer';
import dancersReducer from './dancersReducer';

const rootReducer = combineReducers({
  videosReducer,
  dancersReducer,
  form: formReducer
});

export default rootReducer;
