import { useCallback, useEffect, useRef, useState } from 'react';
import { loadTasks, saveTasks } from '../services/taskService';
import { generateId } from '../utils/id';
import { STATUS } from '../interfaces/task';

const sanitize = (input) => ({
  title: input.title.trim(),
  description: input.description.trim(),
  priority: input.priority,
  category: input.category,
  dueDate: input.dueDate,
  status: input.status,
});

/**
 * Görevlerin CRUD işlemlerini ve LocalStorage senkronizasyonunu yönetir.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hydrated = useRef(false);

  // READ – ilk yükleme (kısa gecikme ile loading durumu görünür olur)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(loadTasks());
      hydrated.current = true;
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Her değişiklikte LocalStorage'a kalıcı kayıt
  useEffect(() => {
    if (hydrated.current) saveTasks(tasks);
  }, [tasks]);

  // CREATE
  const addTask = useCallback((input) => {
    const now = new Date().toISOString();
    const task = { id: generateId(), ...sanitize(input), createdAt: now, updatedAt: now };
    setTasks((prev) => [task, ...prev]);
    return task;
  }, []);

  // UPDATE
  const updateTask = useCallback((id, changes) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...sanitize({ ...task, ...changes }), updatedAt: new Date().toISOString() }
          : task,
      ),
    );
  }, []);

  const toggleComplete = useCallback(
    (task) => {
      const status = task.status === STATUS.COMPLETED ? STATUS.TODO : STATUS.COMPLETED;
      updateTask(task.id, { status });
      return status;
    },
    [updateTask],
  );

  // DELETE
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return { tasks, isLoading, addTask, updateTask, deleteTask, toggleComplete };
}
