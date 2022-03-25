import React from 'react';

const Form = () => {
  return (
    <div className='form'>
      <div className='logo-search'>
        <h1>To Do App</h1>
        <form>
          <input type='text' name='search' placeholder='some words' />
          <button type='submit'>+</button>
          <hr />
        </form>
      </div>
    </div>
  );
};

export default Form;
