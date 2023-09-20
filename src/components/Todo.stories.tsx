import { DndProvider } from 'react-dnd';
import type { Meta, StoryObj } from '@storybook/react';
import Todo from './Todo';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { nanoid } from 'nanoid';

const meta = {
  title: 'Example/Todo',
  component: Todo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    todo: {
      id: nanoid(),
      content: '테스트 1',
    },
    deleteTodo: () => {},
    modifyTodo: (inputText: string) => {},
    moveTodo: (dragIndex: number, hoverIndex: number) => {},
  },
} satisfies Meta<typeof Todo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    console.log('????', args);
    return (
      <DndProvider backend={HTML5Backend}>
        <Todo {...args} />
      </DndProvider>
    );
  },
};
