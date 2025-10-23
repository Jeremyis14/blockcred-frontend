"use client";
import React, { useId, useState } from "react";

export default function PasswordField({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
  showStrength = true,
}: {
  label?: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  showStrength?: boolean;
}) {
  const id = useId();
  const [show, setShow] = useState(false);

  const score = strength(value);
  const meter = [0, 1, 2, 3].map((i) => (
    <div
      key={i}
      className={`h-1 rounded ${i <= score ? "bg-[#5a57d9]" : "bg-gray-200 dark:bg-slate-800"}`}
    />
  ));

  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{label}</span>
      <div className="relative mt-2">
        <input
          id={id}
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 px-3 py-2 text-sm text-gray-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3E4095]"
          autoComplete={name}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {showStrength && (
        <div className="mt-2 space-y-1">
          <div className="grid grid-cols-4 gap-1">{meter}</div>
          <div className="text-xs text-gray-500 dark:text-slate-400">{strengthLabel(score)}</div>
        </div>
      )}
    </label>
  );
}

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 3);
}

function strengthLabel(s: number) {
  return ["Weak", "Fair", "Good", "Strong"][s];
}
