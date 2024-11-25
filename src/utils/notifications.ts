import { Todo } from '../types/todo';

export async function requestNotificationPermission() {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
}

export function checkDueDateAndNotify(todo: Todo) {
  if (!todo.dueDate || todo.completed) return;

  const dueDate = new Date(todo.dueDate);
  const today = new Date();
  const timeDiff = dueDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff === 1 && Notification.permission === 'granted') {
    new Notification('Task Due Tomorrow', {
      body: `Friendly reminder: "${todo.text}" is due tomorrow. You've got this! 🎯`,
      icon: '/vite.svg',
    });
  }
}