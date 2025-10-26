"use client";
import React, { useState } from "react";
import { Settings as SettingsIcon, Bell, Palette, Upload, Shield, Lock, Timer } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function SettingsPage() {
  const [overlay, setOverlay] = useState<{open:boolean; title:string; msg?:string; variant?:"error"|"success"}>({open:false, title:"", msg:"", variant:"success"});
  const showSuccess = (title:string, msg?:string) => setOverlay({open:true, title, msg, variant:"success"});
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert open={overlay.open} title={overlay.title} message={overlay.msg} variant={overlay.variant} onClose={()=>setOverlay(o=>({...o,open:false}))} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
            <SettingsIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Settings</h1>
            <p className="text-xs/5 opacity-90">Configure your workspace, branding, notifications and security.</p>
          </div>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Workspace & Branding */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Palette className="h-4 w-4 text-[#3E4095]" /> Workspace & Branding</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-gray-600 dark:text-slate-300">Organization name</span>
              <input placeholder="Blockcred" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-gray-600 dark:text-slate-300">Primary color</span>
              <div className="flex items-center gap-2">
                <span className="inline-block h-6 w-6 rounded-full border border-white/50" style={{background:'#3E4095'}} />
                <input value="#3E4095" readOnly className="w-[110px] rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100" />
              </div>
            </label>
            <div className="md:col-span-2">
              <span className="mb-1 block text-sm text-gray-600 dark:text-slate-300">Logo</span>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg border border-dashed border-gray-200 text-xs text-gray-500 dark:border-slate-800 dark:text-slate-400">PNG</div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"><Upload className="h-4 w-4" /> Upload logo</button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={()=>showSuccess("Workspace saved","Branding safely tucked into the chain of command.")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">Save workspace</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Bell className="h-4 w-4 text-[#3E4095]" /> Notifications</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Email and in-app notifications.</p>
          <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">Coming soon.</div>
        </div>
      </section>

      {/* Security */}
      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Shield className="h-4 w-4 text-[#3E4095]" /> Security controls</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
            <label>
              <span className="mb-1 block text-gray-600 dark:text-slate-300">Password policy</span>
              <select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]">
                <option>Standard</option>
                <option>Strong (8+ chars, symbol)</option>
                <option>Very strong (12+, 2 symbols)</option>
              </select>
            </label>
            <label>
              <span className="mb-1 block text-gray-600 dark:text-slate-300">Session timeout (mins)</span>
              <input type="number" defaultValue={30} className="w-full rounded-lg border border-gray-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]" />
            </label>
          </div>
          <div className="mt-4">
            <button onClick={()=>showSuccess("Security saved","Policies locked in tighter than a multisig.")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]"><Lock className="h-4 w-4" /> Save security</button>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Timer className="h-4 w-4 text-[#3E4095]" /> Advanced</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Additional platform-level controls.</p>
          <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">Coming soon.</div>
        </div>
      </section>
    </main>
  );
}
