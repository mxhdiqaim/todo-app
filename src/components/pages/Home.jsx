import React from 'react';
import Form from '../layouts/Form';
import Todos from '../layouts/Todos';

import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { logout, isAuthenticated, isLoading } = useAuth0();

  console.log(useAuth0());

  return (
    <div className='home'>
      <div className='home-content'>
        <h1>To Do App</h1>
        <Form />
        <Todos />
      </div>
      <button onClick={() => logout()}> Logout</button>
    </div>
  );
};

export default Home;
