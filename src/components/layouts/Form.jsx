import React, { useContext, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Form = () => {
  const { setAlert, alerts } = useContext(AlertContext);

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
    if (title === '') {
      setAlert('Please add a todo', 'danger');
    } else {
      console.log(todo);
    }
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
