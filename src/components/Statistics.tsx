import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTodoStore } from '../store/useTodoStore';
import { useThemeStore } from '../store/useThemeStore';
import { Trash2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Statistics() {
  const { todos, clearCompleted } = useTodoStore();
  const { isDarkMode } = useThemeStore();

  const completedTasks = todos.filter((todo) => todo.completed);
  const totalTimeSpent = completedTasks.reduce((acc, todo) => acc + (todo.timeSpent || 0), 0);

  const data = {
    labels: completedTasks.map((todo) => 
      new Date(todo.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: completedTasks.map((todo) => (todo.timeSpent || 0) / 60000),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
      },
      title: {
        display: true,
        text: 'Task Completion Time',
        color: isDarkMode ? '#e5e7eb' : '#374151',
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Statistics</h2>
        <button
          onClick={clearCompleted}
          className="flex items-center gap-2 px-3 py-1 text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          <Trash2 className="w-4 h-4" />
          Clear Statistics
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-100">
            Completed Tasks
          </h3>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">
            {completedTasks.length}
          </p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-100">
            Total Time Spent
          </h3>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">
            {Math.round(totalTimeSpent / 60000)}m
          </p>
        </div>
      </div>
      <div className="h-64">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}