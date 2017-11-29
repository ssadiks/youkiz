import * as types from '../types';

export const openModalDialog = data => ({ type: types.OPEN_MODAL_DIALOG, data });
export const hideModalDialog = () => ({ type: types.HIDE_MODAL_DIALOG });
