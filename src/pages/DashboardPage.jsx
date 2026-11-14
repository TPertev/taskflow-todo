import { useCallback, useMemo, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatsGrid from '../components/dashboard/StatsGrid';
import TaskToolbar from '../components/tasks/TaskToolbar';
import TaskList from '../components/tasks/TaskList';
import TaskFormModal from '../components/tasks/TaskFormModal';
import TaskDetailModal from '../components/tasks/TaskDetailModal';
import DeleteConfirmDialog from '../components/tasks/DeleteConfirmDialog';
import { useTasks } from '../hooks/useTasks';
import { useToast } from '../hooks/useToast';
import { CATEGORIES, STATUS, labelOf } from '../interfaces/task';
import {
  DEFAULT_FILTERS,
  VIEWS,
  applyFilters,
  computeStats,
  countByView,
  hasActiveFilters,
} from '../utils/taskFilters';

export default function DashboardPage() {
  const { tasks, isLoading, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const toast = useToast();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({ open: false, taskId: null });
  const [detailId, setDetailId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const stats = useMemo(() => computeStats(tasks), [tasks]);
  const viewCounts = useMemo(() => countByView(tasks), [tasks]);
  const categoryCounts = useMemo(
    () => tasks.reduce((acc, task) => ({ ...acc, [task.category]: (acc[task.category] ?? 0) + 1 }), {}),
    [tasks],
  );
  const visibleTasks = useMemo(() => applyFilters(tasks, filters), [tasks, filters]);
  const filtersActive = hasActiveFilters(filters);

  const findTask = (id) => tasks.find((task) => task.id === id) ?? null;
  const editingTask = form.taskId ? findTask(form.taskId) : null;
  const detailTask = detailId ? findTask(detailId) : null;

  const changeFilters = useCallback((changes) => setFilters((prev) => ({ ...prev, ...changes })), []);
  const clearFilters = useCallback(
    () => setFilters((prev) => ({ ...DEFAULT_FILTERS, sort: prev.sort })),
    [],
  );
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // --- CRUD akışları ---
  const openCreate = () => setForm({ open: true, taskId: null });
  const openEdit = (task) => {
    setDetailId(null);
    setForm({ open: true, taskId: task.id });
  };
  const closeForm = () => setForm({ open: false, taskId: null });

  const handleSubmit = (values) => {
    if (editingTask) {
      updateTask(editingTask.id, values);
      toast.success('Görev güncellendi.');
    } else {
      addTask(values);
      toast.success('Yeni görev oluşturuldu.');
    }
    closeForm();
  };

  const handleToggle = (task) => {
    const status = toggleComplete(task);
    if (status === STATUS.COMPLETED) toast.success(`“${task.title}” tamamlandı.`);
    else toast.info(`“${task.title}” tekrar bekleyen görevlere alındı.`);
  };

  const requestDelete = (task) => {
    setDetailId(null);
    setPendingDelete(task);
  };

  const confirmDelete = (task) => {
    deleteTask(task.id);
    setPendingDelete(null);
    toast.success('Görev silindi.');
  };

  const viewLabel = VIEWS.find((view) => view.value === filters.view)?.label ?? 'Tüm görevler';
  const heading =
    filters.category !== 'all' ? `${viewLabel} · ${labelOf(CATEGORIES, filters.category)}` : viewLabel;
  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <AppLayout
      sidebar={
        <Sidebar
          open={sidebarOpen}
          onClose={closeSidebar}
          filters={filters}
          onChange={changeFilters}
          viewCounts={viewCounts}
          categoryCounts={categoryCounts}
          stats={stats}
        />
      }
      header={
        <Header
          search={filters.search}
          onSearchChange={(search) => changeFilters({ search })}
          onCreate={openCreate}
          onMenuClick={() => setSidebarOpen(true)}
          menuOpen={sidebarOpen}
        />
      }
    >
      <div className="mb-6">
        <p className="text-sm text-slate-500 first-letter:uppercase">{today}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
      </div>

      <StatsGrid stats={stats} isLoading={isLoading} />

      <section className="mt-8" aria-labelledby="task-section-title">
        <h2 id="task-section-title" className="mb-4 text-base font-semibold text-slate-900">
          {heading}
        </h2>
        <TaskToolbar
          filters={filters}
          onChange={changeFilters}
          onClear={clearFilters}
          filtersActive={filtersActive}
          resultCount={visibleTasks.length}
        />
        <div className="mt-4">
          <TaskList
            tasks={visibleTasks}
            isLoading={isLoading}
            hasAnyTask={tasks.length > 0}
            filtersActive={filtersActive}
            onCreate={openCreate}
            onClearFilters={clearFilters}
            onToggle={handleToggle}
            onView={(task) => setDetailId(task.id)}
            onEdit={openEdit}
            onDelete={requestDelete}
          />
        </div>
      </section>

      <TaskFormModal open={form.open} task={editingTask} onClose={closeForm} onSubmit={handleSubmit} />
      <TaskDetailModal
        task={detailTask}
        onClose={() => setDetailId(null)}
        onEdit={openEdit}
        onDelete={requestDelete}
      />
      <DeleteConfirmDialog
        task={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </AppLayout>
  );
}
