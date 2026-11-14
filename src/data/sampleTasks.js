import { generateId } from '../utils/id';
import { todayISO } from '../utils/date';

const SAMPLES = [
  {
    title: 'Proje yönergesini incele',
    description: 'TNC Group JavaScript proje yönergesindeki zorunlu maddeleri listele ve kontrol et.',
    priority: 'high',
    category: 'study',
    status: 'completed',
    due: -1,
  },
  {
    title: 'Dashboard arayüzünü tasarla',
    description: 'İstatistik kartları, görev listesi ve filtre alanını içeren ana ekranı oluştur.',
    priority: 'high',
    category: 'work',
    status: 'in-progress',
    due: 0,
  },
  {
    title: 'Netlify üzerinde yayınla',
    description: 'GitHub reposunu Netlify’a bağla, build komutunu ve publish klasörünü ayarla.',
    priority: 'medium',
    category: 'work',
    status: 'todo',
    due: 3,
  },
  {
    title: 'Haftalık market alışverişi',
    description: 'Meyve, sebze, kahve ve temizlik malzemeleri.',
    priority: 'low',
    category: 'shopping',
    status: 'todo',
    due: 2,
  },
  {
    title: 'Akşam koşusu – 5 km',
    description: 'Tempolu koşu, ardından 10 dakika esneme.',
    priority: 'medium',
    category: 'health',
    status: 'todo',
    due: 1,
  },
  {
    title: 'React hook’larını tekrar et',
    description: 'useState, useEffect, useMemo ve custom hook örneklerini gözden geçir.',
    priority: 'low',
    category: 'personal',
    status: 'in-progress',
    due: 6,
  },
];

/** İlk açılışta gösterilecek örnek görevler (tarihler bugüne göre üretilir). */
export function createSampleTasks() {
  const now = Date.now();
  return SAMPLES.map(({ due, ...task }, index) => {
    const timestamp = new Date(now - index * 60 * 60 * 1000).toISOString();
    return {
      id: generateId(),
      ...task,
      dueDate: todayISO(due),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  });
}
