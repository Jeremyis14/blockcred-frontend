"use client";
import React from "react";

export default function CredentialsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Credentials</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Browse, search, and manage issued credentials.</p>
      </header>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="text-sm text-gray-600 dark:text-slate-300">No credentials yet.</div>
        <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">When you issue credentials, theyll appear here with filters and actions.</div>
      </section>
    </main>
  );
}
