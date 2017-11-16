import * as types from '../actions/types';

const initialState = () => ({
  snackMessage: null,
});

const snackMessageReducer = (state = initialState(), action) => {
  switch (action.type) {
    case types.UPDATE_SNACK_MESSAGE:
      return {
        snackMessage: {
          ...action.data,
        }
      };

    default:
      return state;
  }
};

export default snackMessageReducer;
