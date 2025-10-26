"use client";
import React, { useState } from "react";
import { Tag, Plus, Star, X } from "lucide-react";

type SavedView = {
  id: string;
  name: string;
  filters: Record<string, string>;
};

export default function SavedViews({ onApply }: { onApply: (filters: Record<string, string>) => void }) {
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    { id: "1", name: "Recent Issued", filters: { status: "issued" } },
    { id: "2", name: "Pending Reviews", filters: { status: "pending" } },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newViewName, setNewViewName] = useState("");

  const saveView = () => {
    if (newViewName.trim()) {
      const newView: SavedView = {
        id: Date.now().toString(),
        name: newViewName,
        filters: { status: "issued" }, // Placeholder
      };
      setSavedViews([...savedViews, newView]);
      setNewViewName("");
      setIsEditing(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h2 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-slate-100"><Tag className="h-4 w-4 text-[#3E4095]" /> Saved Views</h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Quick filters for your credentials.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {savedViews.map((view) => (
          <button
            key={view.id}
            onClick={() => onApply(view.filters)}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Star className="h-3 w-3" />
            {view.name}
          </button>
        ))}
        {isEditing ? (
          <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs dark:border-slate-700">
            <input
              value={newViewName}
              onChange={(e) => setNewViewName(e.target.value)}
              placeholder="View name"
              className="bg-transparent outline-none"
              onKeyDown={(e) => e.key === "Enter" && saveView()}
            />
            <button onClick={saveView} className="text-[#3E4095]">Save</button>
            <button onClick={() => setIsEditing(false)}><X className="h-3 w-3" /></button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Plus className="h-3 w-3" />
            Save View
          </button>
        )}
      </div>
    </div>
  );
}
