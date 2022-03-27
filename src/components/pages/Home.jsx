import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect } from 'react';
import Alerts from '../layouts/Alerts';
import Form from '../layouts/Form';

import AlertContext from '../../context/alert/alertContext';

import Todos from '../layouts/Todos';

const GET_TODOS = gql`
  query {
    todos {
      id
      title
    }
  }
`;
const Home = () => {
  const { alerts } = useContext(AlertContext);

  const {
    getAccessTokenSilently,
    user,
    logout,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  const { loading, error, data } = useQuery(GET_TODOS);

  console.log({ loading, error, data });

  useEffect(() => {
    localStorage.removeItem('accessToken');
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });

        localStorage.setItem('accessToken', accessToken);
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <div className='home'>
      {alerts && <Alerts />}
      <div className='home-content'>
        <div className='logo'>
          <h1>To Do App</h1>
          {isAuthenticated && user ? (
            <button className='logout' onClick={() => logout()}>
              Logout
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()}>Login</button>
          )}
        </div>
        <Form />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
