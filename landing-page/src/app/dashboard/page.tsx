"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const THEME = "#3E4095";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const kpis = [
    { label: "Issued", value: "1,248", delta: "+4.2%", trend: [6,8,7,9,11,10,12] },
    { label: "Verifications", value: "3,907", delta: "+2.3%", trend: [12,10,13,12,15,14,16] },
    { label: "Failures", value: "12", delta: "-0.4%", trend: [2,2,1,2,2,1,2] },
  ];

  return (
    <div className="min-h-[100dvh] bg-white dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-gray-100 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-slate-800 lg:hidden">
              <svg className="h-4 w-4 text-gray-700 dark:text-slate-300" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg">
              <Image src="/darkicon.png" alt="BlockCred" width={36} height={36} priority />
            </span>
            <span className="text-sm font-extrabold tracking-widest text-gray-900 dark:text-white">BLOCKCRED</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm text-gray-600 hover:underline dark:text-slate-300 sm:inline">Go to site</Link>
            <button className="rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-3 py-1.5 text-sm font-medium text-white shadow">New Credential</button>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((v)=>!v)} className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-gray-200 dark:border-slate-800">
                <span className="sr-only">Open user menu</span>
                <Image src="/darkicon.png" alt="Avatar" width={28} height={28} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                  <Link href="/dashboard/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800">Profile</Link>
                  <Link href="/dashboard/settings" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800">Settings</Link>
                  <div className="border-t border-gray-100 dark:border-slate-800" />
                  <button className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-slate-800">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-slate-800 p-4">
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar desktop */}
        <aside className="sticky top-[64px] hidden self-start lg:block">
          <div className="rounded-2xl border border-gray-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <Sidebar onNavigate={() => {}} />
          </div>
        </aside>

        {/* Main content */}
        <main>
          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Welcome back</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Here’s a quick snapshot of your credentials.</p>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Export</button>
              <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Share</button>
            </div>
          </div>

          {/* KPI cards with sparklines */}
          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {kpis.map((c) => (
              <div key={c.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <div className="text-sm text-gray-600 dark:text-slate-300">{c.label}</div>
                <div className="mt-2 flex items-end justify-between">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{c.value}</div>
                  <div className={`text-xs ${c.label === "Failures" ? "text-red-600" : "text-emerald-600"}`}>{c.delta}</div>
                </div>
                <Sparkline values={c.trend} />
              </div>
            ))}
          </section>

          {/* Main grid */}
          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Recent activity */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Recent Activity</h2>
                <Link className="text-sm text-[#3E4095] hover:underline" href="#">View all</Link>
              </div>
              <div className="mt-4 divide-y divide-gray-100 dark:divide-slate-800">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `linear-gradient(135deg, ${THEME}, #5a57d9)` }}>
                        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Credential verified</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">Today at 14:{10+i}</div>
                      </div>
                    </div>
                    <button className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Details</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Quick Actions</h2>
              <div className="mt-4 space-y-3">
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                  Issue new credential <span>→</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                  Import recipients CSV <span>→</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                  Manage API keys <span>→</span>
                </button>
              </div>

              <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-4 text-center dark:border-slate-800">
                <div className="mx-auto h-10 w-10">
                  <Image src="/darkicon.png" alt="logo" width={40} height={40} />
                </div>
                <div className="mt-2 text-xs text-gray-600 dark:text-slate-300">Need help? <Link className="text-[#3E4095] hover:underline" href="#contact">Contact us</Link></div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const items = [
    { label: "Overview", href: "/dashboard", icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M3 12h7V3H3v9Zm0 9h7v-7H3v7Zm11 0h7v-9h-7v9Zm0-18v7h7V3h-7Z" stroke="currentColor" strokeWidth="1.6"/></svg>
    )},
    { label: "Credentials", href: "/dashboard/credentials", icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
    )},
    { label: "Verifications", href: "/dashboard/verifications", icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    )},
    { label: "API Keys", href: "/dashboard/api-keys", icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M15 3a6 6 0 1 0 4.243 10.243L22 16v2h-2v2h-2v2h-2v-2h-2v-2h-2l2.757-2.757A6 6 0 0 0 15 3Z" stroke="currentColor" strokeWidth="1.6"/></svg>
    )},
    { label: "Settings", href: "/dashboard/settings", icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.94-3a7.94 7.94 0 0 1-.15 1.56l2.12 1.65-2 3.46-2.53-1a7.96 7.96 0 0 1-2.7 1.56l-.4 2.7H10.7l-.4-2.7A7.96 7.96 0 0 1 7.6 17.7l-2.53 1-2-3.46 2.12-1.65A7.94 7.94 0 0 1 5 12c0-.53.05-1.04.15-1.54L3 8.8 5 5.33l2.53 1A7.96 7.96 0 0 1 10.2 4.8l.5-2.8h2.6l.5 2.8a7.96 7.96 0 0 1 2.67 1.53l2.53-1L21 8.8l-2.09 1.66c.1.5.15 1.01.15 1.54Z" stroke="currentColor" strokeWidth="1.2"/></svg>
    )},
  ];

  return (
    <nav className="space-y-1 text-sm">
      {items.map((it) => (
        <Link key={it.label} href={it.href} onClick={onNavigate} className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-900">
          <span className="text-gray-500 dark:text-slate-400">{it.icon}</span>
          <span>{it.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const pts = values.map((v, i) => `${(i/(values.length-1))*100},${100 - (v/max)*100}`).join(" ");
  return (
    <svg className="mt-3 h-10 w-full text-[#5a57d9]" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={pts} />
    </svg>
  );
}
