"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User, Shield, Lock, Laptop, Smartphone, Globe, ShieldCheck, XCircle } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function ProfilePage() {
  const sessions: { icon: React.ReactNode; label: string; where: string }[] = [
    { icon: <Laptop className="h-4 w-4" />, label: "Chrome on Windows", where: "Lagos, NG" },
    { icon: <Smartphone className="h-4 w-4" />, label: "iPhone 14", where: "Abuja, NG" },
    { icon: <Globe className="h-4 w-4" />, label: "API token", where: "N/A" },
  ];
  const [form, setForm] = useState({ name: "Jane Doe", email: "jane@example.com", org: "Blockcred" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setTimeout(() => {
      setSaving(false);
      setError("Even blockchains need a database. Our hamster-powered backend tripped over a cable.");
    }, 900);
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert
        open={!!error}
        title="Save failed"
        message={error ?? undefined}
        onClose={() => setError(null)}
        variant="error"
      />
      {/* Header banner */}
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Your Profile</h1>
            <p className="text-xs/5 opacity-90">Manage your personal information, security and sessions.</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Editable details */}
        <div className={`${error ? "ring-1 ring-red-500/40" : ""} lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70`}>
          {error && (
            <div role="alert" className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-700 shadow-lg backdrop-blur dark:text-red-300">
              <div className="text-sm font-medium">Save failed</div>
              <div className="text-xs opacity-90">{error}</div>
            </div>
          )}
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><User className="h-4 w-4 text-[#3E4095]" /> Profile details</h2>
          <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-gray-600 dark:text-slate-300">Full name</span>
              <input value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-gray-600 dark:text-slate-300">Email</span>
              <input type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]" />
            </label>
            <label className="text-sm md:col-span-2">
              <span className="mb-1 block text-gray-600 dark:text-slate-300">Organization</span>
              <input value={form.org} onChange={(e)=>setForm(f=>({...f,org:e.target.value}))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]" />
            </label>
            <div className="md:col-span-2 flex flex-wrap items-center gap-2">
              <button type="submit" disabled={saving} className={`w-full sm:w-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095] ${saving ? "opacity-70" : "hover:brightness-105"}`}>{saving ? "Saving..." : "Save changes"}</button>
              <button type="button" onClick={()=>setError(null)} className="w-full sm:w-auto inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Cancel</button>
            </div>
          </form>
        </div>

        {/* Security quick actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Shield className="h-4 w-4 text-[#3E4095]" /> Security</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Update your password and manage two-factor auth.</p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]"><Lock className="h-4 w-4" /> Change password</button>
          <div className="mt-4 rounded-lg border border-dashed border-gray-200 p-3 text-sm dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-gray-700 dark:text-slate-300">Two-Factor Auth: <span className="font-medium text-emerald-600 dark:text-emerald-400">Enabled</span></span>
            </div>
            <button className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"><XCircle className="h-3.5 w-3.5" /> Disable</button>
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Active sessions</h2>
        <div className="mt-3 divide-y divide-gray-100 text-sm dark:divide-slate-800">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
                <span className="text-gray-500 dark:text-slate-400">{s.icon}</span>
                <span>{s.label}</span>
                <span className="text-xs text-gray-500 dark:text-slate-400">• {s.where}</span>
              </div>
              <button className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Revoke</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
