import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import videosReducer from './videosReducer';
import dancersReducer from './dancersReducer';
import snackMessageReducer from './snackMessageReducer';
import modalDialogReducer from './modalDialogReducer';
import translationReducer from './translationReducer';
import menuReducer from './menuReducer';
import lazyLoadingReducer from './lazyLoadingReducer';

const rootReducer = combineReducers({
  videosReducer,
  dancersReducer,
  snackMessageReducer,
  modalDialogReducer,
  translationReducer,
  menuReducer,
  lazyLoadingReducer,
  form: formReducer
});

export default rootReducer;
