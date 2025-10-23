"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: "features" | "pricing" | "about";
};

const THEME = "#3E4095";

const FAQ_DATA: FaqItem[] = [
  { id: "q1", category: "features", question: "What is BlockCred all about?", answer: "BlockCred provides immutable credential verification, issuance, and storage on the SUI blockchain—fast, private and cost-efficient solutions for organizations and individuals." },
  { id: "q2", category: "features", question: "How does verification work?", answer: "Credentials include tamper-proof proofs anchored on SUI. Verifiers can check a credential's proof quickly without contacting the issuer, enabling instant verification." },
  { id: "q3", category: "pricing", question: "How much does it cost to issue credentials?", answer: "We keep fees low by minimizing on-chain footprint and batching operations. Use the pricing table for common tiers or contact sales for enterprise plans." },
  { id: "q4", category: "about", question: "Why was BlockCred built?", answer: "We built BlockCred to replace slow, fragmented verification workflows with an auditable, privacy-preserving, and developer-friendly credential platform powered by SUI." },
  { id: "q5", category: "about", question: "Is user privacy protected?", answer: "Yes — BlockCred follows a minimal-on-chain approach: proofs are verifiable while personally-identifiable data remains private under the user's control." },
  { id: "q6", category: "pricing", question: "Do you offer enterprise support?", answer: "Yes — enterprise plans include SLAs, dedicated support, integrations and onboarding. Reach out for tailored quotes." },
];

function useDebounce<T>(value: T, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return (
    <>
      {before}
      <mark className="bg-yellow-100 text-yellow-900 px-0.5 rounded-sm">{match}</mark>
      {after}
    </>
  );
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Faq() {
  const [tab, setTab] = useState<"all" | "features" | "pricing" | "about">("all");
  const [query, setQuery] = useState("");
  const debouncedQ = useDebounce(query, 220);
  const [openId, setOpenId] = useState<string | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // deep link support: if the hash matches a question id, open it and scroll
    const id = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (id) {
      const found = FAQ_DATA.find((f) => f.id === id);
      if (found) {
        setTab(found.category ?? "all");
        setOpenId(id);
        setTimeout(() => {
          const el = document.getElementById(`button-${id}`);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
    }
  }, []);

  const filtered = useMemo(() => {
    const q = debouncedQ.trim().toLowerCase();
    return FAQ_DATA.filter((f) => {
      if (tab !== "all" && f.category !== tab) return false;
      if (!q) return true;
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    });
  }, [debouncedQ, tab]);

  // keyboard nav
  function focusNext(delta: number, currentId?: string) {
    const nodes = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("button.faq-toggle") ?? []);
    if (!nodes.length) return;
    const idx = nodes.findIndex((n) => n.dataset.id === currentId);
    let next = 0;
    if (idx === -1) next = 0;
    else next = (idx + delta + nodes.length) % nodes.length;
    nodes[next].focus();
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-950" id="faq" aria-labelledby="faq-heading">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="faq-heading" className="text-3xl font-medium text-gray-900 dark:text-slate-100 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-3 text-base text-gray-600 dark:text-slate-300">Search or browse common questions — pricing, features, and more.</p>
        </div>

        <div className="max-w-5xl mx-auto mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-3 overflow-auto">
              {(["all", "features", "pricing", "about"] as const).map((t) => {
                const active = t === tab;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-full transition inline-flex items-center gap-2 ${
                      active ? "bg-gradient-to-r from-[#3E4095] to-[#5a57d9] text-white shadow-md" : "bg-white dark:bg-slate-900/40 text-gray-700 dark:text-slate-100 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900/40"
                    }`}
                    aria-pressed={active}
                  >
                    {t === "all" ? "All" : t[0].toUpperCase() + t.slice(1)}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
              <div className="relative">
                <input
                  id="faq-search"
                  type="search"
                  placeholder="Search questions..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-64 max-w-[20rem] rounded-full border border-gray-200 dark:border-slate-800 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3E4095] transition dark:bg-slate-900/40 dark:text-slate-100"
                />
                <svg className="absolute w-4 h-4 text-gray-400 dark:text-slate-400 -translate-y-1/2 right-3 top-1/2" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Result count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-slate-300">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>

          {/* Panels: FAQ / Pricing / About */}
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
            {/* left: accordion or pricing depending on layout width */}
            <div className="order-2 md:col-span-2 md:order-1">
              <div ref={listRef} className="space-y-3">
                {tab === "pricing" ? (
                  // Pricing: show pricing cards + CTA
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="p-6 transition transform bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-sm rounded-xl hover:-translate-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-slate-100">Starter</h4>
                          <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">For small teams</p>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-slate-400">{billing === "monthly" ? "Monthly" : "Yearly"}</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-baseline gap-2">
                          <div className="text-3xl font-semibold text-gray-900 dark:text-slate-100">
                            {billing === "monthly" ? "$9" : "$90"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-slate-400">/ {billing === "monthly" ? "month" : "year"}</div>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
                          <li>100 credentials / month</li>
                          <li>Email support</li>
                        </ul>

                        <div className="mt-6">
                          <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow">Start Free</button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 transition transform bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-sm rounded-xl hover:-translate-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-slate-100">Business</h4>
                          <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">For growing organizations</p>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-slate-400">{billing === "monthly" ? "Monthly" : "Yearly"}</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-baseline gap-2">
                          <div className="text-3xl font-semibold text-gray-900 dark:text-slate-100">
                            {billing === "monthly" ? "$49" : "$490"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-slate-400">/ {billing === "monthly" ? "month" : "year"}</div>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
                          <li>2,500 credentials / month</li>
                          <li>Priority email support</li>
                        </ul>

                        <div className="mt-6">
                          <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow">Contact Sales</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : tab === "about" ? (
                  <div className="p-6 bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-sm rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">About BlockCred</h3>
                    <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">BlockCred was created to make verification fast, auditable and privacy-preserving. Built by engineers and designers who faced slow verification flows in education and hiring, we wanted a developer-first, low-cost platform for credentials.</p>
                    <div className="mt-4">
                      <a href="#founders" className="text-sm font-medium text-[#3E4095] dark:text-slate-100 hover:underline">Meet the founders →</a>
                    </div>
                  </div>
                ) : (
                  // Features (default): accordion list with animations
                  <>
                    {filtered.map((item, index) => (
                      <AccordionCard
                        key={item.id}
                        item={item}
                        isOpen={openId === item.id}
                        onToggle={(id) => setOpenId((prev) => (prev === id ? null : id))}
                        query={debouncedQ}
                        index={index}
                        onKeyNav={(dir, id) => focusNext(dir, id)}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* right column: pricing controls / helpful panel */}
            <aside className="order-1 md:col-span-1 md:order-2">
              <div className="p-6 bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-sm rounded-xl">
                {tab === "pricing" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Billing</div>
                      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-gray-50 dark:bg-slate-800">
                        <button
                          onClick={() => setBilling("monthly")}
                          className={`px-3 py-1 rounded-full text-sm ${billing === "monthly" ? "bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-slate-100" : "text-gray-600 dark:text-slate-300"}`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setBilling("yearly")}
                          className={`px-3 py-1 rounded-full text-sm ${billing === "yearly" ? "bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-slate-100" : "text-gray-600 dark:text-slate-300"}`}
                        >
                          Yearly
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600 dark:text-slate-300">Save when you choose yearly billing. Contact us for large volume pricing and enterprise SLAs.</div>
                    <div className="mt-6">
                      <a href="#contact" className="inline-flex items-center justify-center w-full rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-4 py-2 text-sm font-medium text-white shadow">Contact Sales</a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Need help?</div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">If you can't find an answer here, contact our team and we'll assist with custom questions.</p>
                    <div className="mt-4">
                      <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#3E4095] dark:text-slate-100 hover:underline">Contact support →</a>
                    </div>
                  </>
                )}
              </div>

              {/* decorative block */}
              <div className="mt-4 p-4 text-sm bg-gradient-to-r from-[#f4f6ff] to-[#f8f7ff] dark:from-slate-900 dark:to-slate-900 rounded-lg border border-gray-50 dark:border-slate-800">
                <div className="font-medium text-gray-900 dark:text-slate-100">Still unsure?</div>
                <div className="mt-2 text-gray-600 dark:text-slate-300">Schedule a demo to see BlockCred integrated with your workflow.</div>
                <div className="mt-3">
                  <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-3 py-1.5 text-sm text-gray-900 dark:text-slate-100 shadow-sm">Request demo</a>
                </div>
              </div>
            </aside>
          </div>

          {/* small CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Still need help? <a href="#contact" className="font-medium text-[#3E4095] dark:text-slate-100 hover:underline">Contact our team</a>.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Animated highlight underline under active tab (decorative) */
        /* Accordion height transition handled inline via style attribute */
        mark { background: rgba(250, 208, 79, 0.25); padding: 0 3px; border-radius: 3px; }

        /* small entrance animation for cards */
        @keyframes popIn {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .animate-pop { animation: popIn 360ms ease forwards; }
      `}</style>
    </section>
  );
}

/* Accordion card - extracted to keep markup clean */
function AccordionCard({
  item,
  isOpen,
  onToggle,
  query,
  index,
  onKeyNav,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
  query: string;
  index: number;
  onKeyNav: (dir: number, id?: string) => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // set height when open/resize
    const h = contentRef.current?.scrollHeight ?? 0;
    setHeight(h);
  }, [isOpen, contentRef.current?.scrollHeight, query]);

  // keyboard handlers
  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onKeyNav(1, item.id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onKeyNav(-1, item.id);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(item.id);
    }
  }

  return (
    <div className={`overflow-hidden bg-white border border-gray-100 rounded-lg ${mounted ? "animate-pop" : ""}`}>
      <h3>
        <button
          type="button"
          className="flex items-center justify-between w-full gap-4 p-4 text-left faq-toggle"
          onClick={() => onToggle(item.id)}
          aria-controls={`panel-${item.id}`}
          aria-expanded={isOpen}
          id={`button-${item.id}`}
          data-id={item.id}
          onKeyDown={onKey}
        >
          <span className="text-sm font-medium text-gray-900">{highlight(item.question, query)}</span>
          <span className="flex items-center text-gray-500"><Chevron open={isOpen} /></span>
        </button>
      </h3>

      <div
        id={`panel-${item.id}`}
        role="region"
        aria-labelledby={`button-${item.id}`}
        className="transition-[height] duration-300 ease-in-out overflow-hidden px-4"
        style={{ height: isOpen ? `${height}px` : "0px" }}
      >
        <div ref={contentRef} className="py-3 text-sm text-gray-600">
          {highlight(item.answer, query)}
        </div>
      </div>
    </div>
  );
}