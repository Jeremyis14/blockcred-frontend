"use client";
import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "../../../../components/auth/AuthLayout";
import PasswordField from "../../../../components/auth/PasswordField";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Enter your name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    if (!agree) return setError("You must accept the Terms and Privacy Policy");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Sign up failed");
      }
      window.location.href = "/onboarding";
    } catch (_e) {
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account? <Link className="font-medium text-[#3E4095] hover:underline" href="/sign-in">Sign in</Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Full name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="mt-2 block w-full rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 px-3 py-2 text-sm text-gray-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3E4095]"
            autoComplete="name"
          />
        </label>

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

        <label className="mt-2 inline-flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 rounded border-gray-300 dark:border-slate-800 text-[#3E4095] focus:ring-[#3E4095]"
          />
          <span className="text-gray-700 dark:text-slate-300">
            I agree to the <Link className="underline" href="/terms">Terms of Service</Link> and <Link className="underline" href="/privacy">Privacy Policy</Link>.
          </span>
        </label>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <div className="relative py-2 text-center">
          <span className="relative z-10 bg-white dark:bg-slate-900/70 px-2 text-xs text-gray-500 dark:text-slate-400">or sign up with</span>
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
