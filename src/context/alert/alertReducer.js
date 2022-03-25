import { SET_ALERT, REMOVE_ALERT } from '../types';

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alerts: action.payload };
    case REMOVE_ALERT:
      return { ...state, alerts: null };
    default:
      return state;
  }
};
