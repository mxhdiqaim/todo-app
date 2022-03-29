import React from 'react';
import Todo from './Todo';

const Todos = ({ todos, setTodos }) => {
  return (
    <div className='todos'>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} setTodo={setTodos} />
      ))}
    </div>
  );
};

export default Todos;
