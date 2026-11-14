/** Sayfa iskeleti: solda sidebar, sağda header + içerik */
export default function AppLayout({ sidebar, header, children }) {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
      >
        İçeriğe geç
      </a>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col bg-white lg:border-l lg:border-slate-200">
        {header}
        <main id="main-content" className="flex-1 bg-slate-50/60">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
