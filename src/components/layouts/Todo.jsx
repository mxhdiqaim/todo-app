import React, { useState } from 'react';

const Todo = ({ todo, setTodo }) => {
  const [todoes, setTodoes] = useState({
    title: todo.title,
    isCompleted: todo.is_completed,
    isPublic: todo.is_public,
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
            checked={isCompleted}
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
            checked={isPublic}
            onChange={() => setTodoes({ ...todoes, isPublic: !isPublic })}
          />
        </div>
      </form>
    </div>
  );
};

export default Todo;
