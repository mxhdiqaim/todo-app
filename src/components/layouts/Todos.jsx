import React from 'react';
import Todo from './Todo';

const todos = [
  {
    id: 1,
    title: 'Todo One',
    isCompleted: true,
    isPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Todo Two',
    isCompleted: false,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Todo Three',
    isCompleted: true,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: 'Todo Four',
    isCompleted: false,
    isPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Todos = () => {
  return (
    <div className='todos'>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
