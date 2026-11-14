# TaskFlow – Proje Dokümantasyonu

## 1. Projenin Amacı

TaskFlow, **TNC Group Web Geliştirme – JavaScript Proje Yönergesi** doğrultusunda geliştirilmiş bir görev yönetim uygulamasıdır. Yönergenin temel beklentisi; modern bir JavaScript kütüphanesi ile **oluşturma, listeleme, güncelleme ve silme** (CRUD) işlemlerini yapan bir TODO uygulaması geliştirmek, Tailwind CSS / Bootstrap / Pure CSS ile stillendirmek, projeyi GitHub'a yüklemek ve Netlify üzerinde yayınlamaktır.

Proje bu zorunlulukların yanı sıra; gerçek bir SaaS ürünü hissi veren sade bir arayüz, responsive tasarım, erişilebilirlik ve temiz bir klasör mimarisi hedefleriyle hazırlanmıştır.

### Yönerge karşılama tablosu

| Yönerge maddesi | Karşılandığı yer |
| --- | --- |
| Modern JS kütüphanesi | React 19 + Vite |
| Netlify'da yayınlanabilir yapı | `netlify.toml`, statik `dist/` çıktısı |
| CRUD: oluştur / listele / güncelle / sil | `src/hooks/useTasks.js`, `src/components/tasks/*` |
| Tailwind CSS | `@tailwindcss/vite`, `src/index.css` |
| En az bir ekran görüntüsü | `docs/screenshots/`, README |
| Components / Pages / Interfaces klasörleri | `src/components`, `src/pages`, `src/interfaces` |
| Public GitHub reposu | `.gitignore` hazır, `node_modules` hariç (kullanıcı tarafından yüklenecek) |

## 2. Kullanılan Teknolojiler

- **React 19** – Bileşen tabanlı UI, hook'lar (`useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`, `useId`, `useRef`)
- **Vite 8** – Hızlı geliştirme sunucusu ve optimize production build
- **JavaScript (ES6+)** – Modüller, arrow function, destructuring, spread, optional chaining
- **Tailwind CSS 4** – Utility-first stil, responsive kırılımlar (`sm`, `lg`)
- **Lucide React** – SVG ikon seti
- **LocalStorage API** – İstemci tarafında kalıcı veri
- **ESLint 10** – `eslint-plugin-react-hooks` ve `eslint-plugin-react-refresh` kurallarıyla kod kalitesi

## 3. Sistem Özellikleri

### Veri modeli (`src/interfaces/task.js`)

```js
{
  id: string,            // crypto.randomUUID()
  title: string,         // zorunlu, 3–80 karakter
  description: string,   // opsiyonel, en fazla 500 karakter
  priority: 'low' | 'medium' | 'high',
  category: 'work' | 'personal' | 'study' | 'health' | 'shopping',
  dueDate: 'YYYY-MM-DD', // zorunlu
  status: 'todo' | 'in-progress' | 'completed',
  createdAt: ISOString,
  updatedAt: ISOString
}
```

JavaScript'te TypeScript arayüzü bulunmadığından veri sözleşmesi **JSDoc `@typedef`** ile tanımlanmış, tüm seçenek listeleri (durum, öncelik, kategori, sıralama) aynı dosyada sabit olarak tutulmuştur. Böylece form, filtreler ve rozetler tek kaynaktan beslenir.

### Arayüz bölümleri

| Bölüm | Bileşen | Açıklama |
| --- | --- | --- |
| Sidebar | `layout/Sidebar.jsx` | Görünümler (Tümü, Bugün, Yaklaşan, Gecikmiş), kategoriler ve ilerleme çubuğu. Mobilde çekmece olarak açılır. |
| Header | `layout/Header.jsx` | Arama alanı, yeni görev butonu, mobil menü butonu |
| İstatistikler | `dashboard/StatsGrid.jsx` | Toplam / tamamlanan / devam eden / bekleyen sayıları |
| Filtre çubuğu | `tasks/TaskToolbar.jsx` | Durum, öncelik, kategori filtreleri ve sıralama |
| Görev listesi | `tasks/TaskList.jsx`, `TaskCard.jsx` | Kartlar, boş durum ve yükleme iskeleti |
| Form | `tasks/TaskForm.jsx`, `TaskFormModal.jsx` | Oluşturma ve düzenleme (aynı form) |
| Detay | `tasks/TaskDetailModal.jsx` | Görevin tüm bilgileri, oluşturma/güncelleme zamanı |
| Silme onayı | `tasks/DeleteConfirmDialog.jsx` | Geri alınamaz işlem uyarısı |
| Bildirimler | `ui/ToastProvider.jsx` | Başarı / bilgi / hata toast'ları |

### Mimari prensipler

- **Tek sorumluluk:** Her bileşen tek bir işi yapar; durum yönetimi `DashboardPage` ve `useTasks` hook'unda toplanır.
- **Saf yardımcı fonksiyonlar:** Filtreleme, sıralama, istatistik ve doğrulama `utils/` altında, React'tan bağımsız saf fonksiyonlardır.
- **Servis katmanı:** LocalStorage erişimi yalnızca `services/` altından yapılır.
- **Erişilebilirlik:** Etiketli form alanları, `aria-invalid` / `aria-describedby` ile hata bağlama, `role="dialog"` + odak tuzağı + Esc ile kapanan modallar, `aria-live` bildirimler.

## 4. CRUD İşlemlerinin Açıklaması

Tüm CRUD işlemleri `src/hooks/useTasks.js` içindeki özel hook'ta toplanmıştır. Hook, görev dizisini React state'inde tutar; her değişiklik sonrası state otomatik olarak LocalStorage'a yazılır.

### Create – Görev ekleme
1. Kullanıcı **Yeni görev** butonuna tıklar → `TaskFormModal` açılır.
2. Form gönderildiğinde `validateTask()` (`utils/validation.js`) çalışır:
   - Başlık zorunlu, 3–80 karakter
   - Açıklama en fazla 500 karakter
   - Öncelik, kategori ve durum geçerli seçeneklerden biri olmalı
   - Son tarih zorunlu, yeni görevlerde geçmiş bir tarih olamaz
3. Hata varsa mesajlar ilgili alanların altında gösterilir ve ilk hatalı alana odaklanılır.
4. Geçerliyse `addTask()` görevi `id`, `createdAt`, `updatedAt` ile oluşturup listenin başına ekler; toast bildirimi gösterilir.

### Read – Listeleme ve detay
- `applyFilters()` görünüm, arama, filtre ve sıralamayı tek seferde uygular; sonuç `useMemo` ile önbelleğe alınır.
- Görev başlığına veya göz ikonuna tıklandığında `TaskDetailModal` tüm alanları gösterir.
- Liste boşsa “Henüz görev yok”, filtre sonucu boşsa “Eşleşen görev bulunamadı” ekranı gösterilir.

### Update – Güncelleme
- Kalem ikonu veya detaydaki **Düzenle** butonu aynı formu mevcut değerlerle açar. Başlık, açıklama, öncelik, kategori, tarih ve durumun tamamı değiştirilebilir.
- `updateTask(id, changes)` ilgili görevi değiştirir ve `updatedAt` alanını yeniler.
- Kart üzerindeki onay kutusu `toggleComplete()` ile görevi *Tamamlandı* ↔ *Bekliyor* arasında değiştirir.

### Delete – Silme
- Çöp kutusu ikonu `DeleteConfirmDialog` açar; odak varsayılan olarak güvenli seçenek olan **Vazgeç** butonundadır.
- **Evet, sil** onaylanınca `deleteTask(id)` görevi diziden çıkarır; değişiklik LocalStorage'a yazılır ve toast gösterilir.

## 5. LocalStorage Çalışma Mantığı

```
┌──────────────┐   loadTasks()    ┌────────────────┐   readJSON()    ┌──────────────┐
│  useTasks    │ ───────────────▶ │  taskService   │ ──────────────▶ │ storageService│ ──▶ localStorage
│ (React state)│ ◀─────────────── │                │ ◀────────────── │  (try/catch)  │
└──────────────┘   saveTasks()    └────────────────┘   writeJSON()   └──────────────┘
```

| Anahtar | İçerik |
| --- | --- |
| `taskflow:tasks` | Görev dizisinin JSON hali |
| `taskflow:seeded` | Örnek görevlerin daha önce yüklenip yüklenmediği |

1. **İlk açılış:** `loadTasks()` `taskflow:tasks` anahtarını okur. Kayıt yoksa `data/sampleTasks.js` içindeki örnek görevler (tarihleri bugüne göre hesaplanarak) oluşturulur, kaydedilir ve `taskflow:seeded` işaretlenir.
2. **Yükleme durumu:** Okuma, kısa bir gecikmeyle yapılır ve bu sürede iskelet (skeleton) gösterilir.
3. **Kalıcılık:** `useTasks` içindeki `useEffect`, `tasks` state'i her değiştiğinde `saveTasks()` ile tüm diziyi kaydeder. Bu sayede ekleme, güncelleme ve silme işlemleri sayfa yenilendiğinde korunur.
4. **Silinen görevler:** Kullanıcı tüm görevleri silse bile kayıt boş dizi (`[]`) olarak tutulduğu için örnek görevler tekrar yüklenmez.
5. **Hata toleransı:** `storageService` tüm `getItem` / `setItem` / `JSON.parse` çağrılarını `try/catch` ile sarar. Gizli pencere, kota aşımı veya bozuk veri durumunda uygulama çökmez; konsola uyarı yazılır ve varsayılan değer kullanılır.

> Not: LocalStorage tarayıcıya ve cihaza özeldir. Farklı bir tarayıcıda veya cihazda görevler görünmez; tarayıcı verileri temizlenirse görevler silinir.

## 6. Test Özeti

Geliştirme sırasında elle yapılan kontroller:

- `npm install`, `npm run lint` (0 hata / 0 uyarı), `npm run build` (başarılı)
- Boş form gönderimi → alan hata mesajları ve odak
- Görev oluşturma → listede ve LocalStorage'da görünme
- Tüm alanları güncelleme → sayfa yenilendikten sonra korunma
- Silme onayı → silinen görevin yenilemeden sonra geri gelmemesi
- Arama, durum / öncelik / kategori filtreleri ve tüm sıralama seçenekleri
- Tamamla / geri al, toast bildirimleri ve istatistiklerin güncellenmesi
- Tüm görevler silindiğinde boş durum ekranı
- 375 px (mobil), 768 px (tablet) ve 1440 px (masaüstü) genişliklerde düzen, mobil sidebar çekmecesi
