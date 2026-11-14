/** Görevler yüklenirken gösterilen iskelet (loading state) */
export default function TaskListSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-3" role="status" aria-label="Görevler yükleniyor">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex gap-3">
            <div className="h-5 w-5 rounded-md bg-slate-200" />
            <div className="flex-1 space-y-2.5">
              <div className="h-3.5 w-1/3 rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-100" />
              <div className="flex gap-2 pt-1">
                <div className="h-5 w-20 rounded-md bg-slate-100" />
                <div className="h-5 w-16 rounded-md bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}
