import { Menu, Plus, Search, X } from 'lucide-react';
import Button from '../ui/Button';

/** Üst bar: mobil menü butonu, arama alanı ve yeni görev butonu */
export default function Header({ search, onSearchChange, onCreate, onMenuClick, menuOpen }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="-ml-1 rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-slate-900/10 focus-visible:outline-none lg:hidden"
          aria-label="Menüyü aç"
          aria-controls="app-sidebar"
          aria-expanded={menuOpen}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div role="search" className="relative max-w-md flex-1">
          <label htmlFor="task-search" className="sr-only">
            Görevlerde ara
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="task-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Görev ara…"
            autoComplete="off"
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pr-9 pl-9 text-sm text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <Button onClick={onCreate} className="ml-auto" aria-label="Yeni görev oluştur">
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Yeni görev</span>
        </Button>
      </div>
    </header>
  );
}
