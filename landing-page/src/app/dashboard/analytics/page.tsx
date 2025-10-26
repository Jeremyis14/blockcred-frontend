"use client";
import React, { useState } from "react";
import { BarChart3, TrendingUp, Users, Award, Clock, RefreshCw } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function AnalyticsPage() {
  const [error, setError] = useState<string | null>(null);

  const simulateRefresh = () => {
    setTimeout(() => setError("Refresh failed. Data source unavailable."), 600);
  };

  // Mock data
  const metrics = [
    { label: "Total Issued", value: "1,247", icon: <Award className="h-5 w-5" />, change: "+12%" },
    { label: "Verifications", value: "3,892", icon: <Users className="h-5 w-5" />, change: "+8%" },
    { label: "API Requests", value: "15,420", icon: <BarChart3 className="h-5 w-5" />, change: "+25%" },
    { label: "Avg. Response Time", value: "0.8s", icon: <Clock className="h-5 w-5" />, change: "-5%" },
  ];

  const chartData = [
    { month: "Jan", issued: 120, verified: 95 },
    { month: "Feb", issued: 150, verified: 120 },
    { month: "Mar", issued: 180, verified: 140 },
    { month: "Apr", issued: 200, verified: 160 },
    { month: "May", issued: 250, verified: 200 },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert open={!!error} title="Refresh failed" message="Unable to fetch latest analytics." variant="error" onClose={() => setError(null)} primaryAction={{ label: "Retry", onClick: () => { setError(null); alert("Refreshing analytics..."); } }} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Analytics & Insights</h1>
              <p className="text-xs/5 opacity-90">Track your credentialing performance.</p>
            </div>
          </div>
          <button onClick={simulateRefresh} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
      </header>

      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400">
                {metric.icon}
              </div>
              <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'} dark:text-emerald-400`}>
                {metric.change}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
              <div className="text-sm text-gray-600 dark:text-slate-300">{metric.label}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Issued vs Verified</h2>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-2">
              <span>Month</span>
              <span>Issued</span>
              <span>Verified</span>
            </div>
            {chartData.map((data, i) => (
              <div key={i} className="flex items-end gap-2 mb-2">
                <div className="w-8 text-xs text-gray-600 dark:text-slate-400">{data.month}</div>
                <div className="flex-1 flex gap-1 items-end">
                  <div className="bg-[#3E4095] rounded-sm" style={{ height: `${data.issued / 2.5}px`, width: '50%' }}></div>
                  <div className="bg-[#5a57d9] rounded-sm" style={{ height: `${data.verified / 2.5}px`, width: '50%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Top Credential Types</h2>
          <div className="mt-4 space-y-3">
            {[
              { name: "Course Certificates", count: 450, percentage: 36 },
              { name: "Skill Badges", count: 320, percentage: 26 },
              { name: "Employment Letters", count: 180, percentage: 15 },
              { name: "Other", count: 297, percentage: 23 },
            ].map((type, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3E4095]"></div>
                  <span className="text-sm text-gray-900 dark:text-slate-100">{type.name}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{type.count} ({type.percentage}%)</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
