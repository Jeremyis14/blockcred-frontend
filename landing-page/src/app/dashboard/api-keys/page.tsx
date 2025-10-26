"use client";
import React, { useState } from "react";
import { KeySquare, Plus, Copy, Shield, Trash2 } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function ApiKeysPage() {
  const [overlay, setOverlay] = useState<{open:boolean; title:string; msg?:string; variant?:"error"|"success"}>({open:false, title:"", msg:"", variant:"success"});
  function showSuccess(title:string, msg?:string){ setOverlay({open:true, title, msg, variant:"success"}); }
  function showError(title:string, msg?:string){ setOverlay({open:true, title, msg, variant:"error"}); }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert open={overlay.open} title={overlay.title} message={overlay.msg} variant={overlay.variant} onClose={()=>setOverlay(o=>({...o,open:false}))} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <KeySquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">API Keys</h1>
              <p className="text-xs/5 opacity-90">Generate and manage your API keys.</p>
            </div>
          </div>
             {/* onClick={()=>showSuccess("New key created","Guard it like a dragon guards gold.")} */}
          <div className="mt-4">
            <button onClick={()=>showSuccess("New key created","Guard it like a dragon guards gold.")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e5e5e6] to-[#d7d7de] px-4 py-2 text-sm font-medium text-[#3E4095] shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">Save workspace</button>
          </div>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        {/* Keys table scaffold */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-slate-400">
                <th className="px-3 py-2 font-medium">Label</th>
                <th className="px-3 py-2 font-medium">Key</th>
                <th className="px-3 py-2 font-medium">Created</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {["Production", "Staging"].map((label, i) => (
                <tr key={label} className="text-gray-700 dark:text-slate-300">
                  <td className="px-3 py-2">{label}</td>
                  <td className="px-3 py-2 font-mono">bc_live_•••••••{i+1}A9Z</td>
                  <td className="px-3 py-2">2025-10-1{i}</td>
                  <td className="px-3 py-2 text-right">
                    <button onClick={()=>showSuccess("Key copied","Paste wisely. Logs have long memories.")} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"><Copy className="h-3.5 w-3.5" /> Copy</button>
                    <button onClick={()=>showError("Revoke failed","Demo mode refuses to burn the keys.")} className="ml-2 inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-red-600 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-900"><Trash2 className="h-3.5 w-3.5" /> Revoke</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-slate-400">
          Treat your API keys like passwords. Rotate regularly and scope access.
        </div>
      </section>
    </main>
  );
}
