"use client";
import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "../../../../components/auth/AuthLayout";
import PasswordField from "../../../../components/auth/PasswordField";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Sign in failed");
      }
      window.location.href = "/dashboard";
    } catch (_e) {
      setError("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        <>
          New here? <Link className="font-medium text-[#3E4095] hover:underline" href="/sign-up">Create an account</Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 block w-full rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 px-3 py-2 text-sm text-gray-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3E4095]"
            autoComplete="email"
          />
        </label>

        <PasswordField value={password} onChange={setPassword} />

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 dark:border-slate-800 text-[#3E4095] focus:ring-[#3E4095]" />
            <span className="text-gray-700 dark:text-slate-300">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-[#3E4095] hover:underline">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="relative py-2 text-center">
          <span className="relative z-10 bg-white dark:bg-slate-900/70 px-2 text-xs text-gray-500 dark:text-slate-400">or continue with</span>
          <div className="absolute inset-x-0 top-1/2 -z-0 h-px -translate-y-1/2 bg-gray-200 dark:bg-slate-800" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button type="button" className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">Google</button>
          <button type="button" className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">GitHub</button>
          <button type="button" className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">Twitter</button>
        </div>
      </form>
    </AuthLayout>
  );
}
