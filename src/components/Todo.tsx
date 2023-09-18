import { TodoType } from '@/hooks/useTodoList';
import React, { useState } from 'react';

type TodoPropsType = {
  todo: TodoType;
  deleteTodo: () => void;
  modifyTodo: (inputText: string) => void;
};
const Todo = ({ todo, deleteTodo, modifyTodo }: TodoPropsType) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const editHandler = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className='flex flex-row justify-between items-center w-full p-2 rounded-lg shadow-lg gap-2'>
      {isEditMode ? (
        <input
          className='w-full px-1 rounded-md'
          defaultValue={todo}
          onBlur={(e) => modifyTodo(e.target.value)}
        />
      ) : (
        <div className='px-1 truncate'>{todo}</div>
      )}
      <div className='flex justify-center items-center gap-2'>
        <button
          className='flex justify-center items-center p-2 w-12 h-6 text-white bg-gray-500  rounded-lg'
          onClick={editHandler}
        >
          <div>edit</div>
        </button>
        <button
          className='flex justify-center items-center p-2 w-6 h-6 text-white bg-gray-500  rounded-lg'
          onClick={deleteTodo}
        >
          <div>x</div>
        </button>
      </div>
    </div>
  );
};
export default React.memo(Todo);
