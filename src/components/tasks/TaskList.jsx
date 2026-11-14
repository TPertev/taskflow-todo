import { ClipboardList, Plus, SearchX } from 'lucide-react';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import TaskCard from './TaskCard';
import TaskListSkeleton from './TaskListSkeleton';

export default function TaskList({
  tasks,
  isLoading,
  hasAnyTask,
  filtersActive,
  onCreate,
  onClearFilters,
  ...handlers
}) {
  if (isLoading) return <TaskListSkeleton />;

  if (!hasAnyTask) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="Henüz görev yok"
        description="İlk görevini oluşturarak planlamaya başla. Görevlerin bu tarayıcıda saklanır."
        action={
          <Button onClick={onCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Yeni görev
          </Button>
        }
      />
    );
  }

  if (!tasks.length) {
    return (
      <EmptyState
        icon={SearchX}
        title="Eşleşen görev bulunamadı"
        description="Arama terimini veya filtreleri değiştirerek tekrar dene."
        action={
          filtersActive && (
            <Button variant="secondary" onClick={onClearFilters}>
              Filtreleri temizle
            </Button>
          )
        }
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3" aria-label="Görev listesi">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} {...handlers} />
      ))}
    </ul>
  );
}
