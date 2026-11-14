import { readJSON, writeJSON } from './storageService';
import { createSampleTasks } from '../data/sampleTasks';

export const TASKS_STORAGE_KEY = 'taskflow:tasks';
const SEEDED_KEY = 'taskflow:seeded';

/**
 * Görevleri LocalStorage'dan yükler.
 * İlk açılışta (hiç kayıt yoksa) örnek görevlerle başlatır.
 * @returns {import('../interfaces/task').Task[]}
 */
export function loadTasks() {
  const stored = readJSON(TASKS_STORAGE_KEY);
  if (Array.isArray(stored)) return stored;

  // Örnekler daha önce yüklendiyse (ve veri bozulduysa) tekrar yükleme.
  if (readJSON(SEEDED_KEY, false)) return [];

  const samples = createSampleTasks();
  writeJSON(TASKS_STORAGE_KEY, samples);
  writeJSON(SEEDED_KEY, true);
  return samples;
}

/** @param {import('../interfaces/task').Task[]} tasks */
export function saveTasks(tasks) {
  return writeJSON(TASKS_STORAGE_KEY, tasks);
}
