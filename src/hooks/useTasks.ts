import { useState, useEffect } from 'react';
import { Task } from '../types/task';

const STORAGE_KEY = 'task-manager-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
