import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth = ({ history }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const onSubmit = e => {
    e.preventDefault();

    loginWithRedirect();
  };

  if (isAuthenticated) {
    history.push('/');
  }

  return (
    <div className='auth'>
      <form onSubmit={onSubmit}>
        <button type='submit'>Login / Register</button>
      </form>
    </div>
  );
};

export default Auth;
