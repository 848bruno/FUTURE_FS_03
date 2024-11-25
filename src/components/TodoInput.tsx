import React, { useState } from 'react';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface TodoInputProps {
  onAdd: (text: string, dueDate?: Date) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), selectedDate || undefined);
      setText('');
      setSelectedDate(null);
      setShowCalendar(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 rounded-lg border border-primary-600 bg-primary-700 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="px-4 py-2 text-primary-300 hover:text-blue-500 focus:outline-none transition-colors"
        >
          <CalendarIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </form>

      {showCalendar && (
        <div className="absolute right-0 mt-2 z-10 bg-primary-800 dark:bg-primary-900 rounded-lg shadow-lg p-4">
          <Calendar
            onChange={(date) => {
              setSelectedDate(date as Date);
              setShowCalendar(false);
            }}
            value={selectedDate}
            className="border-none"
          />
        </div>
      )}

      {selectedDate && (
        <div className="mt-2 text-sm text-primary-300">
          Due date: {selectedDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
}