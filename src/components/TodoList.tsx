'use client';

import useTodoList from '@/hooks/useTodoList';
import Todo from './Todo';
import { useRef } from 'react';
import React from 'react';

const TodoList = () => {
  const { todoList, addTodo, getFunctionDeleteTodo, getFunctionModifyTodo } =
    useTodoList();
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <form
        id='todo-form'
        className='flex justify-center mb-4 gap-2 w-full'
        onSubmit={(e) => {
          e.preventDefault();
          if (!!inputRef.current?.value) {
            const inputValue = inputRef.current.value;
            addTodo(inputValue);
            inputRef.current.value = '';
          }
        }}
      >
        <input
          type='text'
          id='todo-input'
          className='w-full p-2 rounded-lg shadow-lg'
          ref={inputRef}
        />
        <button
          type='submit'
          className='p-2  rounded-lg bg-gray-500 text-white'
        >
          Add
        </button>
      </form>
      {todoList.map((todo, index) => {
        const deleteTodo = getFunctionDeleteTodo(index);
        const modifyTodo = getFunctionModifyTodo(index);
        return (
          <Todo
            key={todo + index}
            todo={todo}
            deleteTodo={deleteTodo}
            modifyTodo={modifyTodo}
          />
        );
      })}
    </>
  );
};
export default TodoList;
