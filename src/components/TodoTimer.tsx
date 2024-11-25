import React, { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { formatDuration } from '../utils/formatTime';

interface TodoTimerProps {
  todoId: string;
  timeSpent: number;
  startTime?: number;
  isCompleted?: boolean;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
}

export function TodoTimer({ 
  todoId, 
  timeSpent, 
  startTime, 
  isCompleted,
  onStart, 
  onStop 
}: TodoTimerProps) {
  const [elapsed, setElapsed] = useState(timeSpent);
  const isRunning = !!startTime;

  useEffect(() => {
    let interval: number;
    if (isRunning && !isCompleted) {
      interval = window.setInterval(() => {
        setElapsed(timeSpent + (Date.now() - startTime));
      }, 1000);
    } else {
      setElapsed(timeSpent);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, timeSpent, isCompleted]);

  return (
    <div className="flex items-center gap-2">
      {!isCompleted && (
        <button
          onClick={() => (isRunning ? onStop(todoId) : onStart(todoId))}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isRunning ? (
            <Pause className="w-4 h-4 text-blue-500" />
          ) : (
            <Play className="w-4 h-4 text-blue-500" />
          )}
        </button>
      )}
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {formatDuration(elapsed)}
      </span>
    </div>
  );
}