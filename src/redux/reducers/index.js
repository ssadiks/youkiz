import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import videosReducer from './videosReducer';
import dancersReducer from './dancersReducer';
import snackMessageReducer from './snackMessageReducer';

const rootReducer = combineReducers({
  videosReducer,
  dancersReducer,
  snackMessageReducer,
  form: formReducer
});

export default rootReducer;
