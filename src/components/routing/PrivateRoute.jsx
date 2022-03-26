import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Spinner from '../layouts/Spinner';

const PrivateRoute = props => {
  return (
    <Route
      component={withAuthenticationRequired(props.component, {
        onRedirecting: () => <Spinner />,
      })}
      {...props.args}
    />
  );
};

export default PrivateRoute;
