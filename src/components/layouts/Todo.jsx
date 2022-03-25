import React from 'react';

const Todo = ({ todo }) => {
  return (
    <div className='todo'>
      <div className='todo-item'>
        <input
          type='checkbox'
          name='name'
          checked={todo.isCompleted ? true : false}
        />
        <p>{todo.title}</p>
        {/* <span>{todo.isPublic ? 'public' : 'private'}</span> */}
      </div>
    </div>
  );
};

export default Todo;
