"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  X as CloseIcon,
  Clock,
  Code,
  Monitor,
  FileText,
  BarChart3,
  Upload,
  Search,
  ChevronDown,
} from "lucide-react";

const THEME = "#3E4095";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile overlay
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true); // desktop: icon-only rail by default
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // dynamic widths for grid based on collapsed state (desktop only)
  const sidebarWidth = collapsed ? 84 : 240;
  // Only compute a template string; apply it conditionally on lg via style below
  const gridTemplate = useMemo(() => `minmax(${collapsed ? "72px" : "220px"}, ${sidebarWidth}px) 1fr`, [collapsed, sidebarWidth]);

  return (
    <div className="relative min-h-[100dvh] bg-white dark:bg-slate-950">
      {/* Background vibe */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* soft radial blobs + faint aurora beams */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(closest-side, #3E4095, transparent)" }} />
        <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(closest-side, #5a57d9, transparent)" }} />
        <div className="absolute -bottom-24 left-1/3 h-80 w-[60rem] -rotate-12 blur-3xl opacity-[0.15]" style={{ background: "linear-gradient(90deg, rgba(62,64,149,0.3), rgba(90,87,217,0.2), transparent)" }} />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-gray-100 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 dark:border-slate-800 lg:hidden hover:bg-gray-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]"
            >
              <Menu className="h-6 w-6 text-gray-700 dark:text-slate-300" />
            </button>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
              <Image src="/darkicon.png" alt="BlockCred" width={36} height={36} priority />
            </span>
            <span className="hidden text-sm font-extrabold tracking-widest text-gray-900 dark:text-white sm:inline">BLOCKCRED</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="hidden text-sm text-gray-600 hover:underline dark:text-slate-300 sm:inline">Go to site</Link>
            <button className="hidden rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-3.5 py-2 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095] sm:inline-flex">
              New Credential
            </button>
            <div className="relative hidden sm:block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]"
              >
                <span className="sr-only">Open user menu</span>
                <Image src="/normalguy.jpg" alt="Avatar" width={30} height={30} />
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-80 overflow-y-auto bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-r border-gray-100/50 dark:border-slate-800/50 shadow-2xl transition-transform duration-300 ease-out">
            {/* Mobile sidebar header */}
            <div className="bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                    <Image src="/darkicon.png" alt="BlockCred" width={24} height={24} />
                  </span>
                  <span className="text-sm font-semibold tracking-wider">BLOCKCRED</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
                >
                  <CloseIcon className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
            </div>
            <div className="p-4">
              <Sidebar collapsed={false} onNavigate={() => setSidebarOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* On mobile: block layout. On desktop: grid with sidebar + content */}
        <div
          className="lg:grid lg:gap-6"
          // Only apply grid template on lg screens to avoid breaking mobile layout
          style={
            typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
              ? { gridTemplateColumns: gridTemplate }
              : undefined
          }
        >
          {/* Sidebar desktop */}
          <aside className="sticky top-[64px] hidden self-start lg:block">
            <div
              className={[
                "group relative overflow-hidden rounded-2xl border border-gray-100/50 bg-white/70 dark:bg-slate-900/70 shadow-lg backdrop-blur-md",
                "dark:border-slate-800/50",
                "transition-[width] duration-300 ease-out",
              ].join(" ")}
              // Width applies only because aside is hidden on mobile (lg:block)
              style={{ width: sidebarWidth }}
            >
              {/* Futuristic outer glow lines */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3E4095]/[0.03]" />

              {/* Sidebar header acts as toggle */}
              <button
                onClick={() => setCollapsed((v) => !v)}
                className={[
                  "mb-3 mx-3 mt-3 flex w-[calc(100%-1.5rem)] items-center justify-between rounded-xl p-3 text-white shadow-md ring-1 ring-white/10",
                  "bg-gradient-to-r from-[#3E4095] to-[#5a57d9]",
                  "hover:brightness-[1.05] transition",
                ].join(" ")}
                aria-expanded={!collapsed}
                aria-label="Toggle sidebar"
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/15">
                    <LayoutGrid className="h-4 w-4" />
                  </div>
                  <span
                    className={[
                      "text-sm font-semibold tracking-wider",
                      "transition-opacity duration-200",
                      collapsed ? "opacity-0 pointer-events-none select-none" : "opacity-100",
                    ].join(" ")}
                  >
                    Dashboard
                  </span>
                </div>
                <ChevronDown
                  className={[
                    "h-4 w-4 transition-transform duration-300",
                    collapsed ? "-rotate-90 opacity-80" : "opacity-80",
                  ].join(" ")}
                />
              </button>

              <div className="px-3 pb-3">
                <Sidebar collapsed={collapsed} onNavigate={() => {}} />
              </div>
            </div>
          </aside>

          {/* Main content slot */}
          <div className="mt-6 lg:mt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate, collapsed }: { onNavigate: () => void; collapsed: boolean }) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const items = [
    { label: "Overview", href: "/dashboard", icon: (<LayoutGrid className="h-5 w-5" />), group: "Main" },
    { label: "Credentials", href: "/dashboard/credentials", icon: (<IdCard className="h-5 w-5" />), group: "Main" },
    { label: "Verifications", href: "/dashboard/verifications", icon: (<ShieldCheck className="h-5 w-5" />), group: "Main" },
    { label: "Templates", href: "/dashboard/credential-templates", icon: (<FileText className="h-5 w-5" />), group: "Main" },
    { label: "Bulk Operations", href: "/dashboard/bulk-operations", icon: (<Upload className="h-5 w-5" />), group: "Tools" },
    { label: "Analytics", href: "/dashboard/analytics", icon: (<BarChart3 className="h-5 w-5" />), group: "Tools" },
    { label: "API Keys", href: "/dashboard/api-keys", icon: (<KeySquare className="h-5 w-5" />), group: "Tools" },
    { label: "Audit Log", href: "/dashboard/audit-log", icon: (<Clock className="h-5 w-5" />), group: "Tools" },
    { label: "API Playground", href: "/dashboard/api-playground", icon: (<Code className="h-5 w-5" />), group: "Tools" },
    { label: "Device Management", href: "/dashboard/device-management", icon: (<Monitor className="h-5 w-5" />), group: "Tools" },
    { label: "Settings", href: "/dashboard/settings", icon: (<SettingsIcon className="h-5 w-5" />), group: "Account" },
  ];

  const filteredItems = items.filter((it) => it.label.toLowerCase().includes(searchTerm.toLowerCase()));
  const groups = ["Main", "Tools", "Account"];

  return (
    <div className="space-y-4">
      {/* Search (hidden when collapsed) */}
      <div className={["relative transition-all", collapsed ? "h-0 opacity-0 pointer-events-none -mt-2" : "h-auto opacity-100"].join(" ")}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-slate-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search pages..."
          className="w-full rounded-lg border border-gray-200 bg-white/50 pl-10 pr-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]"
        />
      </div>

      <nav className="space-y-3 text-sm">
        {groups.map((group) => (
          <div key={group}>
            {/* Group label shows as a thin divider dot when collapsed */}
            <div className="mb-2 flex items-center gap-2 px-1">
              <h3
                className={[
                  "text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider transition-all",
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
                ].join(" ")}
              >
                {group}
              </h3>
              {collapsed && <div className="ml-1 h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent dark:via-slate-600/40" />}
            </div>

            <div className="space-y-1">
              {filteredItems
                .filter((it) => it.group === group)
                .map((it) => {
                  const active = pathname === it.href;
                  return (
                    <Link
                      key={it.label}
                      href={it.href}
                      onClick={onNavigate}
                      className={[
                        "relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]",
                        active
                          ? "bg-gradient-to-r from-[#3E4095]/20 to-[#5a57d9]/20 text-gray-900 dark:text-slate-100 shadow-sm border border-[#3E4095]/30"
                          : "text-gray-700 hover:bg-gray-50/50 dark:text-slate-300 dark:hover:bg-slate-900/50 hover:shadow-sm",
                        collapsed ? "justify-center px-0 mx-1" : "",
                      ].join(" ")}
                      title={collapsed ? it.label : undefined}
                    >
                      <span className={["transition-colors", active ? "text-[#3E4095]" : "text-gray-500 dark:text-slate-400"].join(" ")}>
                        {it.icon}
                      </span>

                      {/* Animated label reveal */}
                      <span
                        className={[
                          "text-base lg:text-sm font-medium whitespace-nowrap",
                          "transition-[opacity,transform,width] duration-200 origin-left",
                          collapsed ? "opacity-0 -translate-x-2 w-0 overflow-hidden" : "opacity-100 translate-x-0 w-auto",
                        ].join(" ")}
                      >
                        {it.label}
                      </span>

                      {/* Active glow accent line when collapsed */}
                      {collapsed && active && (
                        <span className="absolute right-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#3E4095] to-[#5a57d9]" />
                      )}
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}