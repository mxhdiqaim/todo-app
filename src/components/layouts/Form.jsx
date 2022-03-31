import React, { useContext, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';

import { useMutation, gql } from '@apollo/client';

// ADD todo
const ADD_TODO = gql`
  mutation addTodo($title: String!, $is_completed: Boolean!) {
    insert_todos_one(object: { title: $title, is_completed: $is_completed }) {
      id
    }
  }
`;

const Form = () => {
  const { setAlert } = useContext(AlertContext);

  const [todo, setTodo] = useState({
    title: '',
    isCompleted: false,
  });

  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () =>
      setTodo({
        title: '',
        isCompleted: false,
      }),
  });

  const { title } = todo;

  const onChange = e => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (title === '') {
      setAlert('Please add a todo', 'danger');
    } else {
      setAlert('Adding todo', 'success');
      await addTodo({
        variables: { title: title, is_completed: false },
      });
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
        <hr />
      </form>
    </div>
  );
};

export default Form;
