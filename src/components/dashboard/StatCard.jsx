import { cn } from '../../utils/cn';

export default function StatCard({ label, value, icon: Icon, accent, footnote }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', accent)}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-3xl">
        {value}
      </p>
      {footnote && <p className="mt-1 text-xs text-slate-500">{footnote}</p>}
    </div>
  );
}
