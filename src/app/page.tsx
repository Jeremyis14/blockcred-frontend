 
export default function RootHome() {
  return (
    <main className="min-h-dvh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="px-6 mx-auto max-w-3xl py-24">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-slate-800 bg-gradient-to-r from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 p-10 shadow-sm">
          <div className="pointer-events-none absolute -z-10 inset-0 opacity-70" aria-hidden>
            <div className="absolute left-1/3 top-0 h-24 w-24 rounded-full blur-2xl" style={{background: "#3E409522"}} />
            <div className="absolute right-1/4 bottom-0 h-32 w-32 rounded-full blur-2xl" style={{background: "#5a57d944"}} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Frontend Workspace</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">
            This repository contains multiple front-end surfaces. Use the links below to navigate.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a href="/landing-page" className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-sm font-medium">Marketing Site</div>
              <div className="text-xs text-gray-600 dark:text-slate-400">Landing page experience</div>
            </a>
            <a href="/landing-page/dashboard" className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-sm font-medium">Dashboard</div>
              <div className="text-xs text-gray-600 dark:text-slate-400">Product dashboard preview</div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}