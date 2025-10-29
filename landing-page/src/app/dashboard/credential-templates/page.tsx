"use client";
import React, { useState } from "react";
import { FileText, Plus, Edit, Trash2, Eye, Copy } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function CredentialTemplatesPage() {
  const [error, setError] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<{open:boolean; title:string; msg?:string; variant?:"error"|"success"}>({open:false, title:"", msg:"", variant:"success"});

  // Mock templates
  const templates = [
    { id: "1", name: "Course Certificate", description: "For educational courses", design: "Classic", usage: 45 },
    { id: "2", name: "Skill Badge", description: "For skill endorsements", design: "Modern", usage: 23 },
    { id: "3", name: "Employment Letter", description: "For job offers", design: "Professional", usage: 12 },
  ];

  const simulateDelete = (templateName: string) => {
    if (Math.random() > 0.5) {
      setError(`Delete failed: ${templateName} is in use.`);
    } else {
      setOverlay({open:true, title:"Template deleted", msg:`Deleted ${templateName} template.`, variant:"success"});
    }
  };

  const handleEdit = (templateName: string) => {
    setOverlay({open:true, title:"Template edited", msg:`Editing ${templateName} template.`, variant:"success"});
  };

  const handlePreview = (templateName: string) => {
    setOverlay({open:true, title:"Template previewed", msg:`Previewing ${templateName} design.`, variant:"success"});
  };

  const simulateCreate = () => {
    setOverlay({open:true, title:"Template created", msg:"New credential template saved successfully.", variant:"success"});
  };

  function handleDuplicate(name: string) {
    
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert
        open={!!error}
        title="Delete failed"
        message={error ?? undefined}
        variant="error"
        onClose={() => setError(null)}
        primaryAction={{ label: "Retry", onClick: () => { setError(null); alert("Retrying delete..."); } }}
      />
      <GlassAlert open={overlay.open} title={overlay.title} message={overlay.msg} variant={overlay.variant} onClose={()=>setOverlay(o=>({...o,open:false}))} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Credential Templates</h1>
              <p className="text-xs/5 opacity-90">Design reusable templates for your credentials.</p>
            </div>
          </div>
          <button onClick={simulateCreate} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#3E4095] shadow hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <Plus className="h-4 w-4" /> New Template
          </button>
        </div>
      </header>

      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div key={template.id} className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center dark:from-slate-800 dark:to-slate-900">
              <FileText className="mx-auto h-12 w-12 text-gray-500 dark:text-slate-400" />
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-slate-300">{template.name}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">{template.design}</p>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-slate-100">{template.name}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">{template.description}</p>
              <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">Used {template.usage} times</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => handlePreview(template.name)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                <Eye className="h-3.5 w-3.5" /> Preview
              </button>
              <button onClick={() => handleDuplicate(template.name)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                <Copy className="h-3.5 w-3.5" /> Duplicate
              </button>
              <button onClick={() => handleEdit(template.name)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                <Edit className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => simulateDelete(template.name)}
                className="ml-auto rounded-lg border border-gray-200 px-2 py-1 text-xs text-red-600 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty state for new template */}
        <div className="group rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center hover:border-gray-300 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-slate-600">
          <Plus className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" />
          <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-slate-100">Create New Template</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Design a custom credential template from scratch.</p>
          <button onClick={simulateCreate} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105">
            <Plus className="h-4 w-4" /> Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
