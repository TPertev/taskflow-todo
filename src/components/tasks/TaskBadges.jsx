import { CalendarDays, Circle, CircleCheck, CircleDashed } from 'lucide-react';
import {
  CATEGORIES,
  PRIORITY_OPTIONS,
  STATUS,
  STATUS_OPTIONS,
  labelOf,
} from '../../interfaces/task';
import { describeDueDate } from '../../utils/date';
import { cn } from '../../utils/cn';

const PRIORITY_STYLES = {
  high: 'bg-red-50 text-red-700 ring-red-600/15',
  medium: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  low: 'bg-slate-100 text-slate-600 ring-slate-500/15',
};

const PRIORITY_DOT = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-slate-400' };

export function PriorityBadge({ priority }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        PRIORITY_STYLES[priority],
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', PRIORITY_DOT[priority])} aria-hidden="true" />
      {labelOf(PRIORITY_OPTIONS, priority)}
    </span>
  );
}

const STATUS_STYLES = {
  [STATUS.TODO]: { className: 'bg-slate-100 text-slate-600', icon: Circle },
  [STATUS.IN_PROGRESS]: { className: 'bg-sky-50 text-sky-700', icon: CircleDashed },
  [STATUS.COMPLETED]: { className: 'bg-emerald-50 text-emerald-700', icon: CircleCheck },
};

export function StatusBadge({ status }) {
  const { className, icon: Icon } = STATUS_STYLES[status] ?? STATUS_STYLES[STATUS.TODO];
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium', className)}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {labelOf(STATUS_OPTIONS, status)}
    </span>
  );
}

export function CategoryTag({ category }) {
  const item = CATEGORIES.find((c) => c.value === category);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
      <span className={cn('h-2 w-2 rounded-sm', item?.color ?? 'bg-slate-400')} aria-hidden="true" />
      {item?.label ?? category}
    </span>
  );
}

const DUE_TONES = {
  overdue: 'text-red-600',
  soon: 'text-amber-700',
  normal: 'text-slate-500',
  done: 'text-slate-400',
};

export function DueDate({ dueDate, completed }) {
  const { label, tone } = describeDueDate(dueDate, completed);
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium', DUE_TONES[tone])}>
      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">Son tarih: </span>
      {label}
    </span>
  );
}
