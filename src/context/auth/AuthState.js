import React, { useEffect, useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import { useAuth0 } from '@auth0/auth0-react';

import { USER_TOKEN, USER_TOKEN_FAIL, LOGOUT } from '../types';
import axios from 'axios';

const AuthState = props => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const { getAccessTokenSilently, user, logout } = useAuth0();

  // Logout
  const logoutBtn = () => {
    localStorage.removeItem('accessToken');
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

        localStorage.setItem('accessToken', accessToken);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const res = await axios.get(userDetailsByIdUrl, config);

        dispatch({ type: USER_TOKEN, payload: res.data });
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
