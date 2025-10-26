"use client";
import React, { useState } from "react";
import { Clock, Search, Filter, ChevronDown, User, KeySquare, Shield, AlertCircle } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function AuditLogPage() {
  const [error, setError] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});

  const handleApplyFilters = (filters: Record<string, string>) => {
    setAppliedFilters(filters);
    alert(`Applying filters: ${JSON.stringify(filters)}`);
  };

  // Mock audit log data
  const auditEntries = [
    { id: "1", timestamp: "2025-10-26 14:23", action: "Credential Issued", details: "Blockchain 101 to user@example.com", user: "You", type: "success" },
    { id: "2", timestamp: "2025-10-26 13:45", action: "API Key Created", details: "Production key generated", user: "You", type: "info" },
    { id: "3", timestamp: "2025-10-26 12:10", action: "Verification Failed", details: "Invalid signature", user: "System", type: "error" },
    { id: "4", timestamp: "2025-10-26 11:30", action: "Profile Updated", details: "Email changed", user: "You", type: "info" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert open={!!error} title="Export failed" message="Unable to generate audit log export." variant="error" onClose={() => setError(null)} primaryAction={{ label: "Retry", onClick: () => { setError(null); alert("Exporting audit log..."); } }} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Audit Log</h1>
              <p className="text-xs/5 opacity-90">Track all actions and changes in your workspace.</p>
            </div>
          </div>
          <button onClick={() => setError("Export timeout. Network hiccup?")} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <Filter className="h-4 w-4" /> Export
          </button>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        {/* Search + filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]" placeholder="Search audit log..." />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"><Filter className="h-4 w-4" /> Type <ChevronDown className="h-4 w-4" /></button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Date <ChevronDown className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Audit log feed */}
        <div className="mt-4 space-y-3">
          {auditEntries.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
              <div className={`mt-0.5 grid h-8 w-8 place-items-center rounded-lg ${
                entry.type === "error" ? "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400" :
                entry.type === "success" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" :
                "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
              }`}>
                {entry.type === "error" ? <AlertCircle className="h-4 w-4" /> :
                 entry.type === "success" ? <Shield className="h-4 w-4" /> :
                 <Clock className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{entry.action}</span>
                  <span className="text-xs text-gray-500 dark:text-slate-400">{entry.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300">{entry.details}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                  <User className="h-3 w-3" />
                  {entry.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
