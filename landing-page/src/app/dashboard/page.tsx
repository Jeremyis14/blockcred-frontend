"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  IdCard,
  ShieldCheck,
  KeySquare,
  CheckCircle2,
  FileDown,
  Share2,
  Megaphone,
  Sparkles,
  BookOpen,
} from "lucide-react";

const THEME = "#3E4095";

import dynamic from "next/dynamic";

export default function DashboardPage() {
  // const WidgetGrid = dynamic(() => import("./widgets/WidgetGrid").then(m => m.WidgetGrid), { ssr: false });

  const kpis = [
    { label: "Issued", value: "1,248", delta: "+4.2%", trend: [6,8,7,9,11,10,12] },
    { label: "Verifications", value: "3,907", delta: "+2.3%", trend: [12,10,13,12,15,14,16] },
    { label: "Failures", value: "12", delta: "-0.4%", trend: [2,2,1,2,2,1,2] },
  ];

  return (
    <div>
        {/* Main content - rendered inside shared dashboard layout */}
        <div>
          {/* Greeting */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="pointer-events-none absolute -z-10 inset-0 opacity-70" aria-hidden>
              <div className="absolute left-1/3 top-0 h-24 w-24 rounded-full blur-2xl" style={{background: "#3E409522"}} />
              <div className="absolute right-1/4 bottom-0 h-32 w-32 rounded-full blur-2xl" style={{background: "#5a57d944"}} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Welcome back</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Here’s a quick snapshot of your credentials.</p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]"><FileDown className="h-4 w-4" /> Export</button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]"><Share2 className="h-4 w-4" /> Share</button>
              </div>
            </div>
          </div>

          {/* Customizable Widgets */}
          {/*<div className="mt-6">*/}
          {/*  <WidgetGrid />*/}
          {/*</div>*/}

          {/* KPI cards with sparklines */}
          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {kpis.map((c) => (
              <div key={c.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
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
                        <CheckCircle2 className="h-5 w-5 text-white" />
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
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">
                  <span className="flex items-center gap-2"><IdCard className="h-4 w-4 text-[#3E4095]" /> Issue new credential</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">
                  <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#3E4095]" /> Verify credential</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">
                  <span className="flex items-center gap-2"><KeySquare className="h-4 w-4 text-[#3E4095]" /> Manage API keys</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
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

          {/* Extra content for liveliness */}
          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Megaphone className="h-4 w-4 text-[#3E4095]" /> Announcements</h2>
              <ul className="mt-3 space-y-3 text-sm text-gray-700 dark:text-slate-300">
                <li>• New verification API endpoint is live.</li>
                <li>• Bulk issuance supports CSV with headers.</li>
                <li>• Dashboard UI refresh in progress.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:col-span-2">
              <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Sparkles className="h-4 w-4 text-[#3E4095]" /> Getting Started</h2>
              <ol className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3 text-sm">
                <li className="rounded-lg border border-gray-100 p-3 dark:border-slate-800">1. Create your first credential</li>
                <li className="rounded-lg border border-gray-100 p-3 dark:border-slate-800">2. Import recipients CSV</li>
                <li className="rounded-lg border border-gray-100 p-3 dark:border-slate-800">3. Share verification link</li>
              </ol>
              <div className="mt-4">
                <Link href="#docs" className="inline-flex items-center gap-2 text-sm text-[#3E4095] hover:underline"><BookOpen className="h-4 w-4" /> Read the docs</Link>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}

// Sidebar removed — provided by shared dashboard layout

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const pts = values.map((v, i) => `${(i/(values.length-1))*100},${100 - (v/max)*100}`).join(" ");
  return (
    <svg className="mt-3 h-10 w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3E4095" />
          <stop offset="100%" stopColor="#5a57d9" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="url(#spark)" strokeWidth="2.5" strokeLinecap="round" points={pts} />
    </svg>
  );
}
