'use client';

import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';

export type TodoType = { id: string; content: string };

export type TodoListType = TodoType[];

const useTodoList = (initTodoList?: TodoListType) => {
  const [todoList, setTodoList] = useState<TodoListType>(initTodoList ?? []);

  const createTodo = useCallback((todoContent: TodoType['content']) => {
    return { id: nanoid(), content: todoContent };
  }, []);

  const addTodo = useCallback(
    (todoContent: TodoType['content']) => {
      setTodoList(
        produce((prev) => {
          prev.push(createTodo(todoContent));
        })
      );
    },
    [createTodo]
  );

  const deleteTodo = useCallback((deleteIndex: number) => {
    setTodoList(
      produce((prev) => {
        prev.splice(deleteIndex, 1);
      })
    );
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
      setTodoList(
        produce((prev) => {
          prev[modifyIndex].content = inputText;
        })
      );
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
    setTodoList,
    addTodo,
    deleteTodo,
    getFunctionDeleteTodo,
    modifyTodo,
    getFunctionModifyTodo,
  };
};
export default useTodoList;
