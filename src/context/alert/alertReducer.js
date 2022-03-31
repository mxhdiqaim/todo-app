import { SET_ALERT, REMOVE_ALERT, WINDOW_RELOAD } from '../types';

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alerts: action.payload };
    case REMOVE_ALERT:
      return { ...state, alerts: null };
    case WINDOW_RELOAD:
      window.location.reload(false);
      return state;
    default:
      return state;
  }
};
