import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import Form from '../layouts/Form';
import Todos from '../layouts/Todos';
const Home = () => {
  const { getAccessTokenSilently, user } = useAuth0();

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
      <div className='home-content'>
        <div className='logo'>
          <h1>To Do App</h1>
        </div>
        <Form />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
