import { DndProvider } from 'react-dnd';
import type { Meta, StoryObj } from '@storybook/react';
import TodoList from './TodoList';
import { HTML5Backend } from 'react-dnd-html5-backend';

const meta = {
  title: 'Example/TodoList',
  component: TodoList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <DndProvider backend={HTML5Backend}>
      <TodoList />
    </DndProvider>
  ),
};
