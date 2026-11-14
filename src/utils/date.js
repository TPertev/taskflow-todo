const DAY = 24 * 60 * 60 * 1000;

/** Bugünün (veya bugünden offset gün sonrasının) tarihini YYYY-MM-DD olarak döndürür. */
export function todayISO(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** YYYY-MM-DD -> yerel gece yarısı Date */
function parseDate(value) {
  if (!value || typeof value !== 'string') return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

/** Bugüne göre gün farkı (negatif = geçmiş), geçersizse null */
export function daysUntil(value) {
  const date = parseDate(value);
  if (!date) return null;
  const today = parseDate(todayISO());
  return Math.round((date - today) / DAY);
}

export function formatDate(value, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  const date = parseDate(value);
  return date ? date.toLocaleDateString('tr-TR', options) : '—';
}

export function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Son tarih için kısa, okunabilir etiket ve ton bilgisi.
 * @returns {{ label: string, tone: 'overdue' | 'soon' | 'normal' | 'done' }}
 */
export function describeDueDate(value, isCompleted = false) {
  const diff = daysUntil(value);
  if (diff === null) return { label: 'Tarih yok', tone: 'normal' };
  if (isCompleted) return { label: formatDate(value, { day: 'numeric', month: 'short' }), tone: 'done' };
  if (diff < 0) return { label: `${Math.abs(diff)} gün gecikti`, tone: 'overdue' };
  if (diff === 0) return { label: 'Bugün', tone: 'soon' };
  if (diff === 1) return { label: 'Yarın', tone: 'soon' };
  if (diff <= 7) return { label: `${diff} gün kaldı`, tone: 'normal' };
  return { label: formatDate(value, { day: 'numeric', month: 'short' }), tone: 'normal' };
}
