import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import { useAuth0 } from '@auth0/auth0-react';

import { LOGOUT } from '../types';

const AuthState = props => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const { logout } = useAuth0();

  // Logout
  const logoutBtn = () => {
    logout();
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken: state.accessToken,
        logoutBtn,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
