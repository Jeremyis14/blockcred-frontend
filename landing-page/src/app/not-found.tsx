"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const THEME = "#3E4095";

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] place-items-center bg-white px-6 dark:bg-slate-950">
      <div className="w-full max-w-2xl text-center">
        <div className="relative mx-auto mb-6 h-14 w-14">
          <span className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#3E4095]/20 to-[#5a57d9]/25 blur-md" />
          <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <Image src="/darkicon.png" alt="BlockCred" width={28} height={28} />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs text-gray-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: THEME }} />
          This page pulled a Houdini
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">
          Not 404. Just… dramatically unavailable
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 dark:text-slate-300">
          Either the link is outdated, you blinked too fast, or the page decided to live on-chain and never told us.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-5 py-2 text-sm font-medium text-white shadow transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Take me home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Open dashboard
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Check the URL</div>
            <div className="mt-1 text-xs text-gray-600 dark:text-slate-300">A sneaky typo can throw even the best of us.</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Use the nav</div>
            <div className="mt-1 text-xs text-gray-600 dark:text-slate-300">The menu up there knows where everything lives.</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Still lost?</div>
            <div className="mt-1 text-xs text-gray-600 dark:text-slate-300">
              <Link href="#contact" className="text-[#3E4095] hover:underline">Ping us</Link> and we’ll point you in the right direction.
            </div>
          </div>
        </div>

        <style jsx>{`
          /* subtle float for the logo */
          @media (prefers-reduced-motion: no-preference) {
            main > div > div:first-child > div { animation: bob 6s ease-in-out infinite; }
            @keyframes bob { 0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)} }
          }
        `}</style>
      </div>
    </main>
  );
}
