import React from 'react';
import Form from '../layouts/Form';
import Todos from '../layouts/Todos';

import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { logout, isAuthenticated } = useAuth0();

  console.log(useAuth0());

  return (
    <div className='home'>
      <div className='home-content'>
        <div className='logo'>
          <h1>To Do App</h1>
          {isAuthenticated && (
            <button className='logout' onClick={() => logout()}>
              {' '}
              Logout
            </button>
          )}
        </div>
        <Form />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
