import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onStartTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
}

export function TodoList({ 
  todos, 
  onToggle, 
  onDelete,
  onUpdateNotes,
  onStartTimer,
  onStopTimer 
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateNotes={onUpdateNotes}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
        />
      ))}
    </div>
  );
}