import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>Not Found</h1>
      <Link to='/'>Back to Home</Link>
    </div>
  );
};

export default NotFound;
