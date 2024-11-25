import React, { useState, useEffect } from 'react';
import { Check, Trash2, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { Todo } from '../types/todo';
import { TodoTimer } from './TodoTimer';
import { format } from 'date-fns';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onStartTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
}

export function TodoItem({ 
  todo, 
  onToggle, 
  onDelete, 
  onUpdateNotes,
  onStartTimer,
  onStopTimer 
}: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bulletPoints, setBulletPoints] = useState<string[]>(
    todo.notes ? todo.notes.split('\n').filter(note => note.trim()) : ['']
  );

  useEffect(() => {
    if (todo.completed && todo.startTime) {
      onStopTimer(todo.id);
    }
  }, [todo.completed, todo.startTime, todo.id, onStopTimer]);

  const handleBulletPointChange = (index: number, value: string) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints[index] = value;
    setBulletPoints(newBulletPoints);
    onUpdateNotes(todo.id, newBulletPoints.join('\n'));
  };

  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, '']);
  };

  const removeBulletPoint = (index: number) => {
    const newBulletPoints = bulletPoints.filter((_, i) => i !== index);
    setBulletPoints(newBulletPoints);
    onUpdateNotes(todo.id, newBulletPoints.join('\n'));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 p-4 group">
        <button
          onClick={() => onToggle(todo.id)}
          className={clsx(
            'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          )}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={clsx(
              'text-gray-900 dark:text-white',
              todo.completed && 'line-through text-gray-400 dark:text-gray-500'
            )}>
              {todo.text}
            </span>
            {todo.dueDate && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
              </span>
            )}
          </div>
          
          <TodoTimer
            todoId={todo.id}
            timeSpent={todo.timeSpent || 0}
            startTime={todo.startTime}
            onStart={onStartTimer}
            onStop={onStopTimer}
            isCompleted={todo.completed}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 -mt-2 space-y-2">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-gray-400 dark:text-gray-500 mt-2">•</span>
              <input
                type="text"
                value={point}
                onChange={(e) => handleBulletPointChange(index, e.target.value)}
                placeholder="Add a note..."
                className="flex-1 p-2 bg-transparent border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              {bulletPoints.length > 1 && (
                <button
                  onClick={() => removeBulletPoint(index)}
                  className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addBulletPoint}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add note</span>
          </button>
        </div>
      )}
    </div>
  );
}