"use client";
import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Play, X } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function BulkOperationsPage() {
  const [error, setError] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<{open:boolean; title:string; msg?:string; variant?:"error"|"success"}>({open:false, title:"", msg:"", variant:"success"});
  const [csvData, setCsvData] = useState<{ name: string; email: string; credential: string; valid: boolean }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate CSV parsing
      setTimeout(() => {
        const mockData = [
          { name: "John Doe", email: "john@example.com", credential: "Blockchain 101", valid: true },
          { name: "Jane Smith", email: "jane@example.com", credential: "AI Fundamentals", valid: true },
          { name: "Invalid User", email: "invalid", credential: "Web3 Advanced", valid: false },
        ];
        setCsvData(mockData);
      }, 1000);
    }
  };

  const simulateIssue = () => {
    setIsProcessing(true);
    setOverlay({open:false, title:"", msg:""});
    setTimeout(() => {
      const validCount = csvData.filter(d => d.valid).length;
      setIsProcessing(false);
      if (validCount > 0) {
        setOverlay({open:true, title:"Bulk issue successful", msg:`Issued ${validCount} credentials successfully.`, variant:"success"});
      } else {
        setError("No valid credentials to issue. Check your CSV.");
      }
    }, 2000);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert
        open={!!error}
        title="Issue failed"
        message={error ?? undefined}
        variant="error"
        onClose={() => setError(null)}
        primaryAction={{ label: "Retry", onClick: () => { setError(null); simulateIssue(); } }}
      />
      <GlassAlert open={overlay.open} title={overlay.title} message={overlay.msg} variant={overlay.variant} onClose={()=>setOverlay(o=>({...o,open:false}))} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Bulk Operations</h1>
              <p className="text-xs/5 opacity-90">Issue multiple credentials from a CSV file.</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <FileText className="h-4 w-4" /> Download Template
          </button>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        {/* Upload section */}
        <div className="mb-6">
          <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Upload CSV</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Upload a CSV file with columns: name, email, credential.</p>
          <div className="mt-3">
            <label className="flex items-center gap-3 rounded-lg border-2 border-dashed border-gray-200 p-6 text-center hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-slate-300">Click to upload or drag and drop</span>
              <input type="file" accept=".csv" onChange={simulateUpload} className="sr-only" />
            </label>
          </div>
        </div>

        {/* Preview section */}
        {csvData.length > 0 && (
          <div>
            <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Preview & Validate</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-slate-400">
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">Email</th>
                    <th className="px-3 py-2 font-medium">Credential</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {csvData.map((row, i) => (
                    <tr key={i} className="text-gray-700 dark:text-slate-300">
                      <td className="px-3 py-2">{row.name}</td>
                      <td className="px-3 py-2">{row.email}</td>
                      <td className="px-3 py-2">{row.credential}</td>
                      <td className="px-3 py-2">
                        {row.valid ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300">
                            <AlertCircle className="h-3.5 w-3.5" /> Invalid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
              <span>Valid: {csvData.filter(d => d.valid).length}</span>
              <span>•</span>
              <span>Invalid: {csvData.filter(d => !d.valid).length}</span>
            </div>
            <button
              onClick={simulateIssue}
              disabled={isProcessing}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095] disabled:opacity-50"
            >
              {isProcessing ? <X className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isProcessing ? "Processing..." : "Issue Credentials"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
