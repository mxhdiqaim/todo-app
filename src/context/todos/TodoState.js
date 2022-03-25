import React, { useReducer } from 'react';
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
} from '../types';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const TodoState = props => {
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
