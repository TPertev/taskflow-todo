import { useEffect } from 'react';
import { AlertCircle, CalendarClock, CalendarDays, CheckSquare, Inbox, X } from 'lucide-react';
import { CATEGORIES } from '../../interfaces/task';
import { VIEWS } from '../../utils/taskFilters';
import { cn } from '../../utils/cn';

const VIEW_ICONS = { all: Inbox, today: CalendarDays, upcoming: CalendarClock, overdue: AlertCircle };

function NavItem({ active, onClick, children, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
        'focus-visible:ring-4 focus-visible:ring-slate-900/10 focus-visible:outline-none',
        active ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900',
      )}
    >
      {children}
      <span className={cn('ml-auto text-xs tabular-nums', active ? 'text-slate-700' : 'text-slate-400')}>
        {count}
      </span>
    </button>
  );
}

/** Responsive sidebar: masaüstünde sabit, mobilde açılır çekmece. */
export default function Sidebar({ open, onClose, filters, onChange, viewCounts, categoryCounts, stats }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const select = (changes) => {
    onChange(changes);
    onClose();
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-slate-900/30 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="app-sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-slate-50 transition-[transform,visibility] duration-200',
          'lg:visible lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:translate-x-0 lg:border-r-0',
          // Kapalıyken mobilde klavye odağı da almaması için invisible
          open ? 'visible translate-x-0' : 'invisible -translate-x-full',
        )}
        aria-label="Kenar çubuğu"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <CheckSquare className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">TaskFlow</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200/60 lg:hidden"
            aria-label="Menüyü kapat"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2" aria-label="Görev görünümleri">
          <div className="space-y-0.5">
            {VIEWS.map(({ value, label }) => {
              const Icon = VIEW_ICONS[value];
              return (
                <NavItem
                  key={value}
                  active={filters.view === value}
                  onClick={() => select({ view: value })}
                  count={viewCounts[value]}
                >
                  <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {label}
                </NavItem>
              );
            })}
          </div>

          <div>
            <p className="px-2.5 pb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Kategoriler
            </p>
            <div className="space-y-0.5">
              {CATEGORIES.map(({ value, label, color }) => (
                <NavItem
                  key={value}
                  active={filters.category === value}
                  onClick={() => select({ category: filters.category === value ? 'all' : value })}
                  count={categoryCounts[value] ?? 0}
                >
                  <span className={cn('ml-1 h-2 w-2 rounded-sm', color)} aria-hidden="true" />
                  <span className="ml-0.5">{label}</span>
                </NavItem>
              ))}
            </div>
          </div>
        </nav>

        <div className="m-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">İlerleme</span>
            <span className="font-semibold text-slate-900 tabular-nums">%{stats.completionRate}</span>
          </div>
          <div
            className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={stats.completionRate}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tamamlanma oranı"
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-[width] duration-500"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {stats.completed} / {stats.total} görev tamamlandı
          </p>
        </div>
      </aside>
    </>
  );
}
