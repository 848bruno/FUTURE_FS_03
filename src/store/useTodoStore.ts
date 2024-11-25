import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo } from '../types/todo';
import { checkDueDateAndNotify } from '../utils/notifications';

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, dueDate?: Date) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  updateNotes: (id: string, notes: string) => void;
  startTimer: (id: string) => void;
  stopTimer: (id: string) => void;
  updateDueDate: (id: string, dueDate: Date) => void;
  checkNotifications: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (text, dueDate) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              createdAt: new Date(),
              dueDate,
              timeSpent: 0,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { 
                  ...todo, 
                  completed: !todo.completed, 
                  startTime: undefined,
                  timeSpent: todo.startTime 
                    ? (todo.timeSpent || 0) + (Date.now() - todo.startTime)
                    : todo.timeSpent
                }
              : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
      updateNotes: (id, notes) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, notes } : todo
          ),
        })),
      startTimer: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, startTime: Date.now() } : todo
          ),
        })),
      stopTimer: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id && todo.startTime
              ? {
                  ...todo,
                  timeSpent: (todo.timeSpent || 0) + (Date.now() - todo.startTime),
                  startTime: undefined,
                }
              : todo
          ),
        })),
      updateDueDate: (id, dueDate) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, dueDate } : todo
          ),
        })),
      checkNotifications: () => {
        const { todos } = get();
        todos.forEach(checkDueDateAndNotify);
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);