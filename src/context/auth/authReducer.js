import { LOGOUT } from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
