import { useState } from 'react';
import {
  CATEGORIES,
  DESCRIPTION_MAX,
  EMPTY_TASK_INPUT,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TITLE_MAX,
} from '../../interfaces/task';
import { todayISO } from '../../utils/date';
import { validateTask } from '../../utils/validation';
import { inputClass } from '../../utils/styles';
import FormField from '../ui/FormField';
import Select from '../ui/Select';
import Button from '../ui/Button';

const pickInput = (task) =>
  task
    ? {
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate,
        status: task.status,
      }
    : { ...EMPTY_TASK_INPUT, dueDate: todayISO() };

/**
 * Görev oluşturma ve düzenleme formu (CREATE + UPDATE).
 * @param {{ task?: import('../../interfaces/task').Task, onSubmit: Function, onCancel: Function }} props
 */
export default function TaskForm({ task, onSubmit, onCancel }) {
  const isNew = !task;
  const [values, setValues] = useState(() => pickInput(task));
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // İlk gönderim denemesinden sonra hataları canlı güncelle
    if (submitted) setErrors(validateTask(next, { isNew }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validateTask(values, { isNew });
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`task-${firstInvalid}`)?.focus();
      return;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
        <FormField id="task-title" label="Başlık" required error={errors.title} className="sm:col-span-2">
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="title"
              type="text"
              data-autofocus
              value={values.title}
              onChange={handleChange}
              maxLength={TITLE_MAX + 20}
              placeholder="Örn. Sunum taslağını hazırla"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              aria-required="true"
              className={inputClass(invalid)}
            />
          )}
        </FormField>

        <FormField
          id="task-description"
          label="Açıklama"
          error={errors.description}
          hint={`${values.description.length}/${DESCRIPTION_MAX} karakter`}
          className="sm:col-span-2"
        >
          {({ id, describedBy, invalid }) => (
            <textarea
              id={id}
              name="description"
              rows={3}
              value={values.description}
              onChange={handleChange}
              placeholder="Görevle ilgili kısa notlar…"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={`${inputClass(invalid)} resize-none`}
            />
          )}
        </FormField>

        <FormField id="task-priority" label="Öncelik" required error={errors.priority}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              name="priority"
              value={values.priority}
              onChange={handleChange}
              options={PRIORITY_OPTIONS}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              selectClassName="h-10"
            />
          )}
        </FormField>

        <FormField id="task-category" label="Kategori" required error={errors.category}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              name="category"
              value={values.category}
              onChange={handleChange}
              options={CATEGORIES}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              selectClassName="h-10"
            />
          )}
        </FormField>

        <FormField id="task-dueDate" label="Son tarih" required error={errors.dueDate}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="dueDate"
              type="date"
              value={values.dueDate}
              min={isNew ? todayISO() : undefined}
              onChange={handleChange}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              aria-required="true"
              className={`${inputClass(invalid)} h-10`}
            />
          )}
        </FormField>

        <FormField id="task-status" label="Durum" required error={errors.status}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              name="status"
              value={values.status}
              onChange={handleChange}
              options={STATUS_OPTIONS}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              selectClassName="h-10"
            />
          )}
        </FormField>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
        <Button variant="secondary" onClick={onCancel}>
          Vazgeç
        </Button>
        <Button type="submit">{isNew ? 'Görevi oluştur' : 'Değişiklikleri kaydet'}</Button>
      </div>
    </form>
  );
}
