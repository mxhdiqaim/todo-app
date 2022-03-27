import React, { useState } from 'react';

const Todo = ({ todo }) => {
  const [todoes, setTodoes] = useState({
    title: todo.title,
    isCompleted: todo.isCompleted,
    isPublic: todo.isPublic,
  });

  const [, setEdit] = useState(false);

  const { title, isCompleted, isPublic } = todoes;

  const onChange = e => {
    setTodoes({ ...todoes, [e.target.name]: e.target.value });
  };

  return (
    <div className='todo'>
      <form>
        <div className='todo-item'>
          <input
            className='isCompleted'
            type='checkbox'
            name='isCompleted'
            value={isCompleted}
            onChange={() => setTodoes({ ...todoes, isCompleted: !isCompleted })}
          />
          {/* <p>{todo.title}</p> */}
          <input
            className='title'
            type='text'
            name='title'
            value={title}
            onChange={onChange}
            onFocus={() => setEdit(true)}
            onBlur={() => setEdit(false)}
          />
          <span
            className='isPublic'
            style={
              (isPublic ? { color: 'red' } : { color: 'black' },
              { marginRight: '-10px' })
            }>
            {todo.isPublic ? 'public' : 'private'}
          </span>

          <input
            className='isPublic'
            type='checkbox'
            name='isPublic'
            value={isPublic}
            onChange={() => setTodoes({ ...todoes, isPublic: !isPublic })}
          />
        </div>
      </form>
    </div>
  );
};

export default Todo;
