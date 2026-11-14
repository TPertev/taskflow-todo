export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
