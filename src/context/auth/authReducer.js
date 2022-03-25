import { LOGOUT, USER_TOKEN, USER_TOKEN_FAIL } from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        accessToken: null,
      };

    case USER_TOKEN:
      localStorage.setItem('accessToken', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
    case USER_TOKEN_FAIL:
      return state;
  }
};

export default authReducer;
