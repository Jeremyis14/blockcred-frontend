"use client";
import React, { useState } from "react";
import { Play, Code, Globe, Settings as SettingsIcon, Copy, Check } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function ApiPlaygroundPage() {
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [overlay, setOverlay] = useState<{open:boolean; title:string; msg?:string; variant?:"error"|"success"}>({open:false, title:"", msg:"", variant:"success"});
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("/api/v1/credentials");
  const [body, setBody] = useState('{}');
  const [env, setEnv] = useState("staging");

  const simulateRequest = () => {
    setOverlay({open:true, title:"Request sent", msg:`${method} ${url} executed successfully.`, variant:"success"});
    setTimeout(() => {
      setResponse(JSON.stringify({ message: "Mock API response", data: [] }, null, 2));
    }, 800);
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const envOptions = [
    { value: "staging", label: "Staging", key: "bc_staging_•••••••A9Z" },
    { value: "production", label: "Production", key: "bc_live_•••••••1A9Z" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert open={!!error} title="Request failed" message="API request timed out." variant="error" onClose={() => setError(null)} primaryAction={{ label: "Retry", onClick: () => { setError(null); simulateRequest(); } }} />
      <GlassAlert open={overlay.open} title={overlay.title} message={overlay.msg} variant={overlay.variant} onClose={()=>setOverlay(o=>({...o,open:false}))} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">API Playground</h1>
              <p className="text-xs/5 opacity-90">Test your API endpoints with ease.</p>
            </div>
          </div>
          <button onClick={() => setError("Timeout after 5s.")} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <SettingsIcon className="h-4 w-4" /> Settings
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Request builder */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Globe className="h-4 w-4 text-[#3E4095]" /> Request Builder</h2>
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3">
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <input value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100" placeholder="API endpoint" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600 dark:text-slate-300">Environment</label>
              <select value={env} onChange={(e) => setEnv(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100">
                {envOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} ({opt.key})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600 dark:text-slate-300">Request Body (JSON)</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100" placeholder="{}" />
            </div>
            <button onClick={simulateRequest} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095]">
              <Play className="h-4 w-4" /> Send Request
            </button>
          </div>
        </section>

        {/* Response viewer */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Code className="h-4 w-4 text-[#3E4095]" /> Response</h2>
          <div className="mt-3">
            {response ? (
              <div className="relative">
                <pre className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-slate-900/50 dark:text-slate-100 overflow-x-auto">
                  {response}
                </pre>
                <button onClick={copyResponse} className="absolute top-2 right-2 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center text-sm text-gray-500 dark:border-slate-800 dark:text-slate-400">
                Send a request to see the response here.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
