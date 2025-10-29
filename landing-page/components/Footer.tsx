"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlassAlert from "../src/app/dashboard/GlassAlert";

const THEME = "#3E4095";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sending" | "success" | "error">("idle");
  const [alert, setAlert] = useState<{open:boolean; title:string; message?:string; variant?:"error"|"success"|"info"|"warning"}>({open:false, title:""});

  function validateEmail(e: string) {
    return /^\S+@\S+\.\S+$/.test(e);
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      setAlert({ open: true, title: "Invalid email", message: "Please enter a valid email address.", variant: "error" });
      setTimeout(() => setStatus("idle"), 2200);
      return;
    }
    setStatus("sending");
    // client-only mock flow: show success animation
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setAlert({ open: true, title: "Subscribed!", message: "You've been added to our newsletter.", variant: "success" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 800);
  }

  const company = [
    { label: "About", href: "/about" },
    { label: "Team", href: "/#founders" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ];

  const resources = [
    { label: "Documentation", href: "/docs" },
    { label: "API", href: "/api" },
    { label: "Guides", href: "/guides" },
    { label: "FAQ", href: "/#faq" },
  ];

  const legal = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 dark:bg-slate-950 dark:border-slate-800">
      <GlassAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert(a=>({ ...a, open:false }))}
        autoClose={2600}
        position="bottom-right"
      />
      <div className="px-6 mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo + short */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/darkicon.png" alt="BlockCred" fill className="object-contain" priority />
              </div>
              <div>
                <div className="text-lg font-medium text-gray-900 dark:text-slate-100">BLOCKCRED</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Secure credential management on the SUI blockchain</div>
              </div>
            </div>

            <p className="max-w-sm text-sm text-gray-600 dark:text-slate-300">
              Build, issue and verify tamper-proof credentials with low fees and strong privacy. Trusted by teams worldwide.
            </p>

            <div className="flex items-center gap-3">
              <a aria-label="BlockCred on Facebook" href="#" className="inline-flex items-center justify-center transition-transform transform rounded w-9 h-9 hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-105">
                <svg className="w-5 h-5 text-gray-600 dark:text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v3h3v9h3v-9h2.5l.5-3H14V6a1 1 0 0 1 1-1h3V2z" fill="currentColor" />
                </svg>
              </a>

              <a aria-label="BlockCred on Twitter" href="#" className="inline-flex items-center justify-center transition-transform transform rounded w-9 h-9 hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-105">
                <svg className="w-5 h-5 text-gray-600 dark:text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M23 3c-.8.4-1.6.7-2.5.9A4.1 4.1 0 0 0 16.5 3a4.2 4.2 0 0 0-4.2 4.2c0 .3 0 .7.1 1A11.9 11.9 0 0 1 3 4s-4 9 5 13c-1 .2-2 .3-3 .1 1 3 4 5 7.5 5A12 12 0 0 0 23 6.2c0-.2 0-.4 0-.6A8.2 8.2 0 0 0 23 3z" fill="currentColor" />
                </svg>
              </a>

              <a aria-label="BlockCred on LinkedIn" href="#" className="inline-flex items-center justify-center transition-transform transform rounded w-9 h-9 hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-105">
                <svg className="w-5 h-5 text-gray-600 dark:text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.6 4.09 5.5 2.99 5.5 1.89 5.5 1 4.6 1 3.5 1 2.4 1.89 1.5 2.99 1.5 4.09 1.5 4.98 2.4 4.98 3.5zM1 8.75h4v14H1zM8.75 8.75h3.75v2.05c.6-.99 2.06-1.95 4.55-1.95C21.3 8.85 22 11.37 22 15.42V24h-4v-6.05c0-2.15-.55-3.95-2.95-3.95-2.15 0-2.75 1.52-2.75 3.71V24H8.75z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <nav aria-label="Company" className="text-sm">
            <h4 className="text-sm font-medium text-gray-900 dark:text-slate-100">Company</h4>
            <ul className="mt-4 space-y-2">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-gray-600 transition-colors dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources" className="text-sm">
            <h4 className="text-sm font-medium text-gray-900 dark:text-slate-100">Resources</h4>
            <ul className="mt-4 space-y-2">
              {resources.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-gray-600 transition-colors dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal + Newsletter */}
          <div className="text-sm">
            <h4 className="text-sm font-medium text-gray-900 dark:text-slate-100">Legal</h4>
            <ul className="mt-4 space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-600 transition-colors dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubscribe} className="mt-6">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <div className="flex items-center gap-2">
                <input
                  id="footer-email"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Your email"
                  className="flex-1 rounded-full border border-gray-200 dark:border-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E4095] transition dark:bg-slate-900/40 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-3 py-2 text-sm font-medium text-white shadow transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  ) : status === "success" ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    "Join"
                  )}
                </button>
              </div>

              <div className="h-5 mt-2">
                {status === "error" && <div className="text-xs text-red-600">Please enter a valid email.</div>}
                {status === "success" && <div className="text-xs text-green-600">Thanks — we’ll keep you updated.</div>}
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 mt-10 border-t border-gray-100 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600 dark:text-slate-300"> {new Date().getFullYear()} BlockCred. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600 dark:text-slate-300">Designed and developed by the BlockCred team</div>
            <div className="items-center hidden gap-4 md:flex">
              <Link href="/privacy" className="text-sm text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* small animations */}
      <style jsx>{`
        footer { will-change: transform; }
      `}</style>
    </footer>
  );
}