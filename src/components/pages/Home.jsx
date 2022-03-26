import React from 'react';
import Form from '../layouts/Form';
import Todos from '../layouts/Todos';
const Home = () => {
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
