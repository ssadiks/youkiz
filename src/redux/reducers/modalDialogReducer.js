import * as types from '../actions/types';

const initialState = () => ({
  modalDialog: null,
});

const modalDialogReducer = (state = initialState(), action) => {
  switch (action.type) {
    case types.OPEN_MODAL_DIALOG:
      console.log('open modal', action);
      return {
        modalDialog: {
          state: true,
          ...action.data,
        }
      };
    case types.HIDE_MODAL_DIALOG:
      return {
        modalDialog: null
      };

    default:
      return state;
  }
};

export default modalDialogReducer;
