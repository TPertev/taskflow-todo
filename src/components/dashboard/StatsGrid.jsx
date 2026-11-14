import { CircleCheck, CircleDashed, Circle, ListTodo } from 'lucide-react';
import StatCard from './StatCard';

/** Toplam / tamamlanan / devam eden / bekleyen görev sayıları */
export default function StatsGrid({ stats, isLoading }) {
  const show = (value) => (isLoading ? '–' : value);
  const percent = (value) => {
    if (isLoading) return 'Yükleniyor…';
    return stats.total ? `Toplam içinde %${Math.round((value / stats.total) * 100)}` : 'Henüz görev yok';
  };

  return (
    <section aria-label="Görev istatistikleri" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <StatCard
        label="Toplam görev"
        value={show(stats.total)}
        icon={ListTodo}
        accent="bg-slate-100 text-slate-700"
        footnote={
          isLoading ? 'Yükleniyor…' : stats.overdue ? `${stats.overdue} görev gecikmiş` : 'Gecikmiş görev yok'
        }
      />
      <StatCard
        label="Tamamlanan"
        value={show(stats.completed)}
        icon={CircleCheck}
        accent="bg-emerald-50 text-emerald-600"
        footnote={percent(stats.completed)}
      />
      <StatCard
        label="Devam eden"
        value={show(stats.inProgress)}
        icon={CircleDashed}
        accent="bg-sky-50 text-sky-600"
        footnote={percent(stats.inProgress)}
      />
      <StatCard
        label="Bekleyen"
        value={show(stats.todo)}
        icon={Circle}
        accent="bg-amber-50 text-amber-600"
        footnote={percent(stats.todo)}
      />
    </section>
  );
}
