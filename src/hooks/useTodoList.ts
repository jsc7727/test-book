'use client';

import { useCallback, useState } from 'react';

export type TodoType = string;

export type TodoListType = TodoType[];

const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoListType>([]);

  const addTodo = useCallback((newTodo: TodoType) => {
    setTodoList((prev) => [...prev, newTodo]);
  }, []);

  const deleteTodo = useCallback((deleteIndex: number) => {
    setTodoList((prev) => {
      prev.splice(deleteIndex, 1);
      return [...prev];
    });
  }, []);

  const getFunctionDeleteTodo = useCallback(
    (deleteIndex: number) => {
      return () => deleteTodo(deleteIndex);
    },
    [deleteTodo]
  );

  const modifyTodo = useCallback(
    ({
      modifyIndex,
      inputText,
    }: {
      modifyIndex: number;
      inputText: string;
    }) => {
      setTodoList((prev) => {
        prev[modifyIndex] = inputText;
        return [...prev];
      });
    },
    []
  );

  const getFunctionModifyTodo = useCallback(
    (modifyIndex: number) => {
      return (inputText: string) => modifyTodo({ modifyIndex, inputText });
    },
    [modifyTodo]
  );

  return {
    todoList,
    addTodo,
    deleteTodo,
    getFunctionDeleteTodo,
    modifyTodo,
    getFunctionModifyTodo,
  };
};
export default useTodoList;
