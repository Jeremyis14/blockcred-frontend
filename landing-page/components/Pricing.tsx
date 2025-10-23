
"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const THEME = "#3E4095";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    monthly: 9,
    yearly: 90,
    tag: "Popular",
    perks: ["100 credentials / mo", "Email support", "Basic analytics"],
  },
  {
    id: "business",
    name: "Business",
    monthly: 49,
    yearly: 490,
    tag: "Best for teams",
    perks: ["2,500 credentials / mo", "Priority support", "Team seats"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 249,
    yearly: 2490,
    tag: "Custom",
    perks: ["Unlimited credentials", "SLA & onboarding", "Dedicated support"],
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="pt-16 pb-8">
          <div className="px-6 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-medium text-gray-900 sm:text-5xl">
                Simple, predictable pricing
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Low-cost credential issuance and verification built on SUI — pick the plan that fits your team.
              </p>

              <div className="inline-flex items-center gap-3 p-1 mt-6 bg-gray-100 rounded-full shadow-sm">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    billing === "monthly" ? "bg-white text-gray-900 shadow" : "text-gray-600"
                  }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setBilling("yearly")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    billing === "yearly" ? "bg-white text-gray-900 shadow" : "text-gray-600"
                  }`}
                >
                  Yearly (save 2 months)
                </button>
              </div>
            </div>

            <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
              {tiers.map((t, i) => (
                <article
                  key={t.id}
                  className={`relative overflow-hidden p-6 bg-white border border-gray-100 rounded-2xl shadow-sm transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
                  style={{ animationDelay: `${i * 80}ms`, animationName: "fadeUp", animationDuration: "380ms", animationFillMode: "both" }}
                  aria-labelledby={`tier-${t.id}`}
                >
                  {t.tag && (
                    <div className="absolute px-2 py-1 text-xs font-semibold text-white rounded-full top-4 right-4" style={{ background: THEME }}>
                      {t.tag}
                    </div>
                  )}

                  <h3 id={`tier-${t.id}`} className="text-lg font-medium text-gray-900">
                    {t.name}
                  </h3>

                  <div className="flex items-baseline gap-3 mt-4">
                    <div className="text-3xl font-semibold text-gray-900">
                      ${billing === "monthly" ? t.monthly : t.yearly}
                    </div>
                    <div className="text-sm text-gray-500">/ {billing === "monthly" ? "month" : "year"}</div>
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-gray-600">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <svg className="w-5 h-5 mt-[3px] text-[#3E4095]" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center w-full rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 transition"
                      aria-label={`Choose ${t.name}`}
                    >
                      Choose {t.name}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-gray-600">
                Need a custom plan or more seats?{" "}
                <a href="#contact" className="text-[#3E4095] font-medium hover:underline">
                  Contact sales
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}