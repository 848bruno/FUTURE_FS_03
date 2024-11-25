import React, { useEffect } from 'react';
import { ListTodo, Calendar as CalendarIcon } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { ThemeToggle } from './components/ThemeToggle';
import { Statistics } from './components/Statistics';
import { useTodoStore } from './store/useTodoStore';
import { useThemeStore } from './store/useThemeStore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { requestNotificationPermission } from './utils/notifications';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    updateNotes,
    startTimer,
    stopTimer,
    updateDueDate,
    checkNotifications,
  } = useTodoStore();
  const { isDarkMode } = useThemeStore();
  const completedCount = todos.filter((todo) => todo.completed).length;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    requestNotificationPermission();
    const interval = setInterval(checkNotifications, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [checkNotifications]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              To Do List
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary-800 dark:bg-primary-900 rounded-xl shadow-lg p-6 space-y-6">
              <TodoInput onAdd={addTodo} />
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdateNotes={updateNotes}
                onStartTimer={startTimer}
                onStopTimer={stopTimer}
              />

              {todos.length > 0 && (
                <div className="flex justify-between items-center text-sm text-gray-300 pt-4 border-t border-primary-700">
                  <span>
                    {completedCount} of {todos.length} completed
                  </span>
                  <button
                    onClick={clearCompleted}
                    className="text-blue-300 hover:text-blue-200"
                  >
                    Clear completed
                  </button>
                </div>
              )}
            </div>

            <Statistics />
          </div>

          <div className="space-y-6">
            <div className="bg-primary-800 dark:bg-primary-900 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-white">
                  Task Calendar
                </h2>
              </div>
              <Calendar
                onChange={(date) => {
                  if (date instanceof Date) {
                    updateDueDate(todos[0]?.id, date);
                  }
                }}
                className="w-full border-none"
              />
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Bruno Ambale. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;