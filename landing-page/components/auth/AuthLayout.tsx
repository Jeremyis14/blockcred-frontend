"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const THEME = "#3E4095";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-[100dvh] bg-white dark:bg-slate-950">
      <div className="relative grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
        {/* Left: aesthetic panel */}
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full" style={{ background: `${THEME}22`, filter: "blur(20px)" }} />
            <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full" style={{ background: `#5a57d944`, filter: "blur(28px)" }} />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center p-16">
            <div className="max-w-md text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/70 dark:bg-slate-900/70 shadow-sm">
                <Image src="/darkicon.png" alt="BlockCred" width={36} height={36} />
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-slate-100">Welcome</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Secure, fast, and privacy-first credentials on SUI.</p>
            </div>
          </div>
        </div>

        {/* Right: auth card */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-6 grid place-items-center lg:hidden">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/70 dark:bg-slate-900/70 shadow-sm">
                <Image src="/darkicon.png" alt="BlockCred" width={32} height={32} />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                  <Image src="/darkicon.png" alt="BlockCred" width={24} height={24} />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{title}</h1>
              </div>
              {subtitle && <div className="mt-1 text-sm text-gray-600 dark:text-slate-300">{subtitle}</div>}

              <div className="mt-6">{children}</div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500 dark:text-slate-400">
              By continuing you agree to our <Link className="underline" href="/terms">Terms</Link> and <Link className="underline" href="/privacy">Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
