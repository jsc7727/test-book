'use client';
import useTodoList from '@/hooks/useTodoList';
import Todo from './Todo';
import { useCallback, useRef } from 'react';
import React from 'react';
import { produce } from 'immer';

const TodoList = () => {
  const {
    todoList,
    setTodoList,
    addTodo,
    getFunctionDeleteTodo,
    getFunctionModifyTodo,
  } = useTodoList();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const moveTodo = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setTodoList(
        produce((prev) => {
          [prev[dragIndex], prev[hoverIndex]] = [
            prev[hoverIndex],
            prev[dragIndex],
          ];
        })
      );
    },
    [setTodoList]
  );

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
      <div className='flex flex-col gap-3'>
        {todoList.map((todo, index) => {
          const deleteTodo = getFunctionDeleteTodo(index);
          const modifyTodo = getFunctionModifyTodo(index);
          return (
            <Todo
              key={todo.id}
              index={index}
              todo={todo}
              deleteTodo={deleteTodo}
              modifyTodo={modifyTodo}
              moveTodo={moveTodo}
            />
          );
        })}
      </div>
    </>
  );
};
export default TodoList;
