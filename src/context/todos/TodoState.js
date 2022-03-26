import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING,
  SET_SPINNER,
  REMOVE_SPINNER,
  USER_TOKEN,
  USER_TOKEN_FAIL,
} from '../types';

import { useAuth0 } from '@auth0/auth0-react';

const TodoState = props => {
  const { getAccessTokenSilently, user } = useAuth0();

  const initialState = {
    loading: false,
    todos: null,
    todo: null,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load User
  const loadUser = async () => {
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }

    try {
      const res = await axios.get('/auth');

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async formData => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/users', formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Login User
  const login = async formData => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/auth', formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // SET Spinner
  const setSpinner = () => {
    // disableBodyScroll(document);
    dispatch({ type: SET_SPINNER });
  };

  // REMIVE Spinner
  const removeSpinner = () => {
    dispatch({ type: REMOVE_SPINNER });
    // enableBodyScroll(document);
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
    <TodoContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        spinner: state.spinner,
        setSpinner,
        removeSpinner,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
