import * as types from '../actions/types';
import { openModalDialog, hideModalDialog } from '../actions/modalDialogAction/modalDialogAction';

const modalDialogMiddleware = store => next => (action) => {
  const result = next(action);
  switch (result.type) {
    case types.OPEN_MODAL_DIALOG:
      /*return store.dispatch(openModalDialog({
        state: true,
        message: 'Are you sure ?',
        onValid: action.onValid,
        onCancel: action.onCancel
      }));
      /* return new Promise((resolve, reject) => {
        console.log('open modal ds le middleware');
      }) */
      break;
    default:
      break;
  }
  return result;
};

export default modalDialogMiddleware;
