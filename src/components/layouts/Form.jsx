import React from 'react';

const Form = () => {
  return (
    <div className='form'>
      <form>
        <input type='text' name='search' placeholder='some words' />
        <button type='submit'>+</button>
        <hr />
      </form>
    </div>
  );
};

export default Form;
