import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT, WINDOW_RELOAD } from '../types';

const AlertState = props => {
  const initialState = {
    alerts: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
  };
  const reloadWindow = () => {
    dispatch({
      type: WINDOW_RELOAD,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        setAlert,
        reloadWindow,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
