"use client";
import React from "react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <Image src="/darkicon.png" alt="avatar" width={28} height={28} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Your Profile</h1>
          <p className="text-sm text-gray-600 dark:text-slate-300">Manage your personal information and preferences.</p>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Profile details</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="text-gray-600 dark:text-slate-300">Name: <span className="text-gray-900 dark:text-slate-100">Jane Doe</span></div>
            <div className="text-gray-600 dark:text-slate-300">Email: <span className="text-gray-900 dark:text-slate-100">jane@example.com</span></div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-base font-medium text-gray-900 dark:text-slate-100">Security</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Update your password and manage sessions.</p>
          <button className="mt-4 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow">Change password</button>
        </div>
      </section>
    </main>
  );
}
