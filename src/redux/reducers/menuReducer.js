import * as types from '../actions/types';

const initialState = () => ({
  menuClosed: true,
});

const menuReducer = (state = initialState(), action) => {
  switch (action.type) {
    case types.TOGGLE_MENU:
      return {
        ...state,
        menuClosed: !action.data
      };

    default:
      return state;
  }
};

export default menuReducer;