import { ArrowUpDown, X } from 'lucide-react';
import { CATEGORIES, PRIORITY_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from '../../interfaces/task';
import Select from '../ui/Select';

const withAll = (label, options) => [{ value: 'all', label }, ...options];

const STATUS_FILTER = withAll('Tüm durumlar', STATUS_OPTIONS);
const PRIORITY_FILTER = withAll('Tüm öncelikler', PRIORITY_OPTIONS);
const CATEGORY_FILTER = withAll('Tüm kategoriler', CATEGORIES);

/** Durum / öncelik / kategori filtreleri ve sıralama */
export default function TaskToolbar({ filters, onChange, onClear, filtersActive, resultCount }) {
  const update = (key) => (event) => onChange({ [key]: event.target.value });

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <Select
          aria-label="Duruma göre filtrele"
          value={filters.status}
          onChange={update('status')}
          options={STATUS_FILTER}
          className="sm:w-40"
        />
        <Select
          aria-label="Önceliğe göre filtrele"
          value={filters.priority}
          onChange={update('priority')}
          options={PRIORITY_FILTER}
          className="sm:w-40"
        />
        <Select
          aria-label="Kategoriye göre filtrele"
          value={filters.category}
          onChange={update('category')}
          options={CATEGORY_FILTER}
          className="sm:w-40"
        />
        {filtersActive && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-9 items-center justify-center gap-1 rounded-lg px-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-4 focus-visible:ring-slate-900/10 focus-visible:outline-none"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Temizle
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 lg:justify-end">
        <p className="text-sm whitespace-nowrap text-slate-500" aria-live="polite">
          <span className="font-medium text-slate-900">{resultCount}</span> görev
        </p>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <Select
            aria-label="Görevleri sırala"
            value={filters.sort}
            onChange={update('sort')}
            options={SORT_OPTIONS}
            className="w-40"
          />
        </div>
      </div>
    </div>
  );
}
