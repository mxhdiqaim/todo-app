import React, { useContext } from 'react';
import Form from '../layouts/Form';
import Todos from '../layouts/Todos';

// HOOKS
import AuthContext from '../../context/auth/authContext';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { isAuthenticated } = useAuth0();

  const { logoutBtn, user } = useContext(AuthContext);

  return (
    <div className='home'>
      <div className='home-content'>
        <div className='logo'>
          <h1>To Do App</h1>
          {(isAuthenticated || user) && (
            <button className='logout' onClick={() => logoutBtn()}>
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
