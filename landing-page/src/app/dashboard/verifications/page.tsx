"use client";
import React, { useState } from "react";
import { ShieldCheck, RefreshCw, Search, Filter, ChevronDown, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function VerificationsPage() {
  const [error, setError] = useState<string | null>(null);
  function simulateRefreshError() {
    setTimeout(() => setError("Our verifier took a coffee break. It promises to return stronger."), 350);
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert open={!!error} title="Refresh failed" message={error ?? undefined} onClose={() => setError(null)} variant="error" />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Verifications</h1>
              <p className="text-xs/5 opacity-90">Track verification attempts and outcomes.</p>
            </div>
          </div>
          <button onClick={simulateRefreshError} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        {/* Search + filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]" placeholder="Search verifications..." />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"><Filter className="h-4 w-4" /> Status <ChevronDown className="h-4 w-4" /></button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Method <ChevronDown className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Table scaffold */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-slate-400">
                <th className="px-3 py-2 font-medium">Credential</th>
                <th className="hidden px-3 py-2 font-medium sm:table-cell">Verifier</th>
                <th className="hidden px-3 py-2 font-medium sm:table-cell">Time</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {["Blockchain 101", "AI Fundamentals", "Web3 Advanced"].map((name, i) => (
                <tr key={name} className="text-gray-700 dark:text-slate-300">
                  <td className="px-3 py-2">{name}</td>
                  <td className="hidden px-3 py-2 sm:table-cell">verifier{i+1}@org.com</td>
                  <td className="hidden px-3 py-2 sm:table-cell">2025-10-0{i+1} 14:2{i}</td>
                  <td className="px-3 py-2">
                    {i === 0 && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" /> Passed</span>}
                    {i === 1 && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"><Clock className="h-3.5 w-3.5" /> Pending</span>}
                    {i === 2 && <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300"><AlertTriangle className="h-3.5 w-3.5" /> Failed</span>}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button className="text-[#3E4095] hover:underline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
