import { PRIORITY_WEIGHT, STATUS } from '../interfaces/task';
import { daysUntil } from './date';

export const DEFAULT_FILTERS = {
  search: '',
  status: 'all',
  priority: 'all',
  category: 'all',
  sort: 'newest',
  view: 'all',
};

/** Sidebar görünümleri */
export const VIEWS = [
  { value: 'all', label: 'Tüm görevler' },
  { value: 'today', label: 'Bugün' },
  { value: 'upcoming', label: 'Yaklaşan (7 gün)' },
  { value: 'overdue', label: 'Gecikmiş' },
];

const VIEW_MATCHERS = {
  all: () => true,
  today: (task) => daysUntil(task.dueDate) === 0,
  upcoming: (task) => {
    const diff = daysUntil(task.dueDate);
    return task.status !== STATUS.COMPLETED && diff > 0 && diff <= 7;
  },
  overdue: (task) => task.status !== STATUS.COMPLETED && daysUntil(task.dueDate) < 0,
};

export function matchesView(task, view) {
  return (VIEW_MATCHERS[view] ?? VIEW_MATCHERS.all)(task);
}

const SORTERS = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
  dueDate: (a, b) => a.dueDate.localeCompare(b.dueDate),
  priority: (a, b) =>
    PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority] || a.dueDate.localeCompare(b.dueDate),
  title: (a, b) => a.title.localeCompare(b.title, 'tr'),
};

/**
 * Görünüm, arama, filtre ve sıralamayı uygular.
 * @param {import('../interfaces/task').Task[]} tasks
 * @param {typeof DEFAULT_FILTERS} filters
 */
export function applyFilters(tasks, filters) {
  const query = filters.search.trim().toLocaleLowerCase('tr');

  return tasks
    .filter((task) => {
      if (!matchesView(task, filters.view)) return false;
      if (filters.status !== 'all' && task.status !== filters.status) return false;
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      if (filters.category !== 'all' && task.category !== filters.category) return false;
      if (!query) return true;
      return (
        task.title.toLocaleLowerCase('tr').includes(query) ||
        task.description.toLocaleLowerCase('tr').includes(query)
      );
    })
    .sort(SORTERS[filters.sort] ?? SORTERS.newest);
}

export function computeStats(tasks) {
  const stats = { total: tasks.length, completed: 0, inProgress: 0, todo: 0, overdue: 0 };
  for (const task of tasks) {
    if (task.status === STATUS.COMPLETED) stats.completed += 1;
    else if (task.status === STATUS.IN_PROGRESS) stats.inProgress += 1;
    else stats.todo += 1;
    if (VIEW_MATCHERS.overdue(task)) stats.overdue += 1;
  }
  stats.completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  return stats;
}

export function countByView(tasks) {
  return Object.fromEntries(
    VIEWS.map(({ value }) => [value, tasks.filter((task) => matchesView(task, value)).length]),
  );
}

export function hasActiveFilters(filters) {
  return (
    filters.search.trim() !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.view !== 'all'
  );
}
