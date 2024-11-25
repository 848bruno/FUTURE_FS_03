export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  notes?: string;
  timeSpent?: number;
  startTime?: number;
}