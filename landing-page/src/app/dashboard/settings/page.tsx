"use client";
import React from "react";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Settings</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Configure your workspace and preferences.</p>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Appearance</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Toggle light/dark mode and theme color.</p>
          <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">Controlled globally for now.</div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Notifications</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Email and in-app notifications.</p>
          <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">Coming soon.</div>
        </div>
      </section>
    </main>
  );
}
