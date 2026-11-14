/**
 * Task "interface" – JavaScript projesinde tip sözleşmesini JSDoc ile tanımlıyoruz.
 *
 * @typedef {'todo' | 'in-progress' | 'completed'} TaskStatus
 * @typedef {'low' | 'medium' | 'high'} TaskPriority
 *
 * @typedef {Object} Task
 * @property {string} id           Benzersiz kimlik
 * @property {string} title        Görev başlığı (zorunlu)
 * @property {string} description  Açıklama (opsiyonel)
 * @property {TaskPriority} priority
 * @property {string} category     CATEGORIES içindeki bir değer
 * @property {string} dueDate      YYYY-MM-DD formatında son tarih
 * @property {TaskStatus} status
 * @property {string} createdAt    ISO tarih
 * @property {string} updatedAt    ISO tarih
 *
 * @typedef {Omit<Task, 'id' | 'createdAt' | 'updatedAt'>} TaskInput
 */

export const STATUS = Object.freeze({
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
});

export const STATUS_OPTIONS = [
  { value: STATUS.TODO, label: 'Bekliyor' },
  { value: STATUS.IN_PROGRESS, label: 'Devam ediyor' },
  { value: STATUS.COMPLETED, label: 'Tamamlandı' },
];

export const PRIORITY = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
});

export const PRIORITY_OPTIONS = [
  { value: PRIORITY.LOW, label: 'Low' },
  { value: PRIORITY.MEDIUM, label: 'Medium' },
  { value: PRIORITY.HIGH, label: 'High' },
];

/** Sıralama için öncelik ağırlıkları */
export const PRIORITY_WEIGHT = { high: 3, medium: 2, low: 1 };

export const CATEGORIES = [
  { value: 'work', label: 'İş', color: 'bg-sky-500' },
  { value: 'personal', label: 'Kişisel', color: 'bg-violet-500' },
  { value: 'study', label: 'Eğitim', color: 'bg-amber-500' },
  { value: 'health', label: 'Sağlık', color: 'bg-emerald-500' },
  { value: 'shopping', label: 'Alışveriş', color: 'bg-rose-500' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'En yeni' },
  { value: 'oldest', label: 'En eski' },
  { value: 'dueDate', label: 'Son tarih' },
  { value: 'priority', label: 'Öncelik' },
  { value: 'title', label: 'Başlık (A–Z)' },
];

/** Formun boş hali */
export const EMPTY_TASK_INPUT = {
  title: '',
  description: '',
  priority: PRIORITY.MEDIUM,
  category: CATEGORIES[0].value,
  dueDate: '',
  status: STATUS.TODO,
};

export const TITLE_MAX = 80;
export const DESCRIPTION_MAX = 500;

export const labelOf = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value;
