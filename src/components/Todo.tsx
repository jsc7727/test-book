'use client';
import { TodoType } from '@/hooks/useTodoList';
import React, { useRef, useState } from 'react';
import { useDrop, useDrag, XYCoord } from 'react-dnd';

const ItemTypes = {
  TODO: 'todo',
};

type TodoPropsType = {
  todo: TodoType;
  index: number;
  deleteTodo: () => void;
  modifyTodo: (inputText: string) => void;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
};

const Todo = ({
  todo,
  index,
  deleteTodo,
  modifyTodo,
  moveTodo,
}: TodoPropsType) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditHandler = () => {
    setIsEditMode((prev) => !prev);
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const [_, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset() as XYCoord;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Calculate whether to move the item up or down
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO,
    item: () => {
      return { id: todo.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ opacity }}
      className='flex flex-row cursor-move justify-between items-center w-full p-2 rounded-lg shadow-lg gap-5'
    >
      {isEditMode ? (
        <input
          className='w-full px-1 rounded-md'
          defaultValue={todo.content}
          onBlur={(e) => {
            modifyTodo(e.target.value);
            toggleEditHandler();
          }}
        />
      ) : (
        <div className='px-1 truncate'>{todo?.content}</div>
      )}
      <div className='flex justify-center items-center gap-2'>
        <button
          className='flex justify-center items-center p-2 w-12 h-6 text-white bg-gray-500  rounded-lg'
          onClick={toggleEditHandler}
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
export default Todo;
