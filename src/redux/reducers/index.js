import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import videosReducer from './videosReducer';
import dancersReducer from './dancersReducer';
import snackMessageReducer from './snackMessageReducer';
import modalDialogReducer from './modalDialogReducer';

const rootReducer = combineReducers({
  videosReducer,
  dancersReducer,
  snackMessageReducer,
  modalDialogReducer,
  form: formReducer
});

export default rootReducer;
