import { Check, Eye, Pencil, Trash2 } from 'lucide-react';
import { STATUS } from '../../interfaces/task';
import { cn } from '../../utils/cn';
import { CategoryTag, DueDate, PriorityBadge, StatusBadge } from './TaskBadges';

function IconAction({ label, onClick, icon: Icon, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg p-2 text-slate-400 transition-colors focus-visible:ring-4 focus-visible:outline-none',
        danger
          ? 'hover:bg-red-50 hover:text-red-600 focus-visible:ring-red-500/15'
          : 'hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-slate-900/10',
      )}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

/** Tek bir görevin özet kartı */
export default function TaskCard({ task, onToggle, onView, onEdit, onDelete }) {
  const completed = task.status === STATUS.COMPLETED;

  return (
    <li className="group min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md hover:shadow-slate-900/5">
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          aria-label={`"${task.title}" görevini ${completed ? 'tamamlanmadı olarak işaretle' : 'tamamla'}`}
          onClick={() => onToggle(task)}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
            'focus-visible:ring-4 focus-visible:ring-slate-900/15 focus-visible:outline-none',
            completed
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-slate-300 bg-white hover:border-slate-500',
          )}
        >
          {completed && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={() => onView(task)}
              className="min-w-0 text-left focus-visible:underline focus-visible:outline-none"
            >
              <h3
                className={cn(
                  'truncate text-sm font-semibold',
                  completed ? 'text-slate-400 line-through' : 'text-slate-900',
                )}
              >
                {task.title}
              </h3>
            </button>
            <div className="-mt-1.5 -mr-1.5 flex shrink-0 items-center transition-opacity lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
              <IconAction label="Detayları görüntüle" icon={Eye} onClick={() => onView(task)} />
              <IconAction label="Görevi düzenle" icon={Pencil} onClick={() => onEdit(task)} />
              <IconAction label="Görevi sil" icon={Trash2} onClick={() => onDelete(task)} danger />
            </div>
          </div>

          {task.description && (
            <p className={cn('mt-1 line-clamp-2 text-sm', completed ? 'text-slate-400' : 'text-slate-500')}>
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            <CategoryTag category={task.category} />
            <span className="ml-auto">
              <DueDate dueDate={task.dueDate} completed={completed} />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
