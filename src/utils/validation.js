import {
  CATEGORIES,
  DESCRIPTION_MAX,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TITLE_MAX,
} from '../interfaces/task';
import { daysUntil } from './date';

const has = (options, value) => options.some((option) => option.value === value);

/**
 * Görev formunu doğrular.
 * @param {import('../interfaces/task').TaskInput} values
 * @param {{ isNew?: boolean }} [options]
 * @returns {Record<string, string>} alan -> hata mesajı (boş nesne = geçerli)
 */
export function validateTask(values, { isNew = true } = {}) {
  const errors = {};
  const title = values.title.trim();

  if (!title) errors.title = 'Görev başlığı zorunludur.';
  else if (title.length < 3) errors.title = 'Başlık en az 3 karakter olmalıdır.';
  else if (title.length > TITLE_MAX) errors.title = `Başlık en fazla ${TITLE_MAX} karakter olabilir.`;

  if (values.description.length > DESCRIPTION_MAX) {
    errors.description = `Açıklama en fazla ${DESCRIPTION_MAX} karakter olabilir.`;
  }

  if (!has(PRIORITY_OPTIONS, values.priority)) errors.priority = 'Lütfen bir öncelik seçin.';
  if (!has(CATEGORIES, values.category)) errors.category = 'Lütfen bir kategori seçin.';
  if (!has(STATUS_OPTIONS, values.status)) errors.status = 'Lütfen bir durum seçin.';

  const diff = daysUntil(values.dueDate);
  if (!values.dueDate) errors.dueDate = 'Son tarih zorunludur.';
  else if (diff === null) errors.dueDate = 'Geçerli bir tarih girin.';
  else if (isNew && diff < 0) errors.dueDate = 'Son tarih geçmiş bir gün olamaz.';

  return errors;
}
