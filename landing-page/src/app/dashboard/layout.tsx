"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  LayoutGrid,
  IdCard,
  ShieldCheck,
  KeySquare,
  Settings as SettingsIcon,
  User,
  LogOut,
  Plus,
  X as CloseIcon,
} from "lucide-react";

const THEME = "#3E4095";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="relative min-h-[100dvh] bg-white dark:bg-slate-950">
      {/* Background vibe */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* soft radial blobs */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30" style={{background:"radial-gradient(closest-side, #3E4095, transparent)"}} />
        <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25" style={{background:"radial-gradient(closest-side, #5a57d9, transparent)"}} />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05]" style={{backgroundImage:"linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)", backgroundSize:"28px 28px"}} />
      </div>
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-gray-100 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 dark:border-slate-800 lg:hidden hover:bg-gray-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">
              <Menu className="h-6 w-6 text-gray-700 dark:text-slate-300" />
            </button>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg">
              <Image src="/darkicon.png" alt="BlockCred" width={36} height={36} priority />
            </span>
            <span className="hidden text-sm font-extrabold tracking-widest text-gray-900 dark:text-white sm:inline">BLOCKCRED</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="hidden text-sm text-gray-600 hover:underline dark:text-slate-300 sm:inline">Go to site</Link>
            <button className="hidden rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-3.5 py-2 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095] sm:inline-flex">New Credential</button>
            <div className="relative hidden sm:block" ref={menuRef}>
              <button onClick={() => setMenuOpen((v)=>!v)} className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">
                <span className="sr-only">Open user menu</span>
                <Image src="/darkicon.png" alt="Avatar" width={30} height={30} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                  <Link href="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"><User className="h-4 w-4" /> Profile</Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"><SettingsIcon className="h-4 w-4" /> Settings</Link>
                  <div className="border-t border-gray-100 dark:border-slate-800" />
                  <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-slate-800"><LogOut className="h-4 w-4" /> Logout</button>
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
          <aside className="absolute inset-y-0 left-0 w-80 overflow-y-auto bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-slate-800">
            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                  <Image src="/darkicon.png" alt="BlockCred" width={24} height={24} />
                </span>
                <span className="text-sm font-semibold tracking-wider">BLOCKCRED</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                <CloseIcon className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="p-4">
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar desktop */}
        <aside className="sticky top-[64px] hidden self-start lg:block">
          <div className="rounded-2xl border border-gray-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <Sidebar onNavigate={() => {}} />
          </div>
        </aside>

        {/* Main content slot */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const items = [
    { label: "Overview", href: "/dashboard", icon: (<LayoutGrid className="h-5 w-5 lg:h-4 lg:w-4" />)},
    { label: "Credentials", href: "/dashboard/credentials", icon: (<IdCard className="h-5 w-5 lg:h-4 lg:w-4" />)},
    { label: "Verifications", href: "/dashboard/verifications", icon: (<ShieldCheck className="h-5 w-5 lg:h-4 lg:w-4" />)},
    { label: "API Keys", href: "/dashboard/api-keys", icon: (<KeySquare className="h-5 w-5 lg:h-4 lg:w-4" />)},
    { label: "Settings", href: "/dashboard/settings", icon: (<SettingsIcon className="h-5 w-5 lg:h-4 lg:w-4" />)},
  ];

  return (
    <nav className="space-y-1 text-sm">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link
            key={it.label}
            href={it.href}
            onClick={onNavigate}
            className={
              `flex items-center gap-2 rounded-lg px-3 py-3 lg:px-2 lg:py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095] ` +
              (active
                ? `bg-[#3E4095]/10 text-gray-900 dark:text-slate-100`
                : `text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-900`)
            }
          >
            <span className={`text-gray-500 dark:text-slate-400 ${active ? `text-[#3E4095]` : ""}`}>{it.icon}</span>
            <span className="text-base lg:text-sm">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
