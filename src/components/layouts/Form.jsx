import React, { useState } from 'react';

const Form = () => {
  const [todo, setTodo] = useState({
    title: '',
    isCompleted: false,
    isPublic: false,
  });

  const { title, isPublic } = todo;

  const onChange = e => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(todo);
  };

  return (
    <div className='form'>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={onChange}
            placeholder='some words'
          />
          <button type='submit'>+</button>
        </div>
        <div className='mim'>
          <input
            className='checkbox'
            type='checkbox'
            name='isPublic'
            value={isPublic}
            onChange={() => setTodo({ ...todo, isPublic: !isPublic })}
          />
          <label>Public Todo</label>
        </div>
        <hr />
      </form>
    </div>
  );
};

export default Form;
