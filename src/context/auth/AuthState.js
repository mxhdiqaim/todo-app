import React, { useEffect, useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import { useAuth0 } from '@auth0/auth0-react';

import { USER_TOKEN, USER_TOKEN_FAIL, LOGOUT } from '../types';

const AuthState = props => {
  const initialState = {
    accessToken: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const { getAccessTokenSilently, user, logout } = useAuth0();

  // Logout
  const logoutBtn = () => {
    logout();
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });

        dispatch({ type: USER_TOKEN, payload: accessToken });
      } catch (err) {
        dispatch({ type: USER_TOKEN_FAIL, payload: err.message });
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <AuthContext.Provider
      value={{
        accessToken: state.accessToken,
        spinner: state.spinner,
        logoutBtn,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
