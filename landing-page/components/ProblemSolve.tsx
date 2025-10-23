"use client"
import React from "react";
import Image from "next/image";

const THEME = "#3E4095";

const problems = [
  {
    title: "Fragmented verification",
    desc: "Credentials are scattered across systems, making validation slow and error-prone.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Manual & slow checks",
    desc: "Manual processes increase turnaround times and introduce human error.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "No tamper-proof record",
    desc: "Organizations lack immutable proofs that credentials haven't been altered.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l3 6 6 .5-4.5 4 1.5 6L12 15l-6 4 1.5-6L2 8.5 8 8 12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ProblemSolve() {
  return (
    <section className="relative py-16 bg-white dark:bg-slate-950" id="problems">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: heading + cards */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl font-medium tracking-tight text-center text-gray-900 dark:text-slate-100 sm:text-4xl lg:text-left">
              The Problem we are Solving
            </h2>

            <p className="max-w-xl mx-auto mt-3 text-base text-center text-gray-600 dark:text-slate-300 lg:text-left lg:mx-0">
              BlockCred provides a comprehensive suite of credential management services powered by the SUI blockchain — making verification instant, reliable and auditable.
            </p>

            <div className="max-w-xl mx-auto mt-8 space-y-4 lg:mx-0">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 transition-shadow duration-200 bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-sm rounded-xl hover:shadow-md"
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11"
                    style={{ background: `linear-gradient(135deg, ${THEME}, #5a57d9)` }}
                    aria-hidden
                  >
                    <div className="text-white">{p.icon}</div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-slate-100">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image/illustration */}
          <div className="lg:col-span-6">
            <div className="max-w-md mx-auto lg:ml-auto">
              <div className="relative">
                {/* decorative orbs */}
                <div
                  className="absolute w-32 h-32 rounded-full -left-8 -top-8"
                  style={{ background: `${THEME}10`, filter: "blur(12px)" }}
                />
                <div
                  className="absolute rounded-full -right-8 -bottom-8 w-44 h-44"
                  style={{ background: `#5a57d922`, filter: "blur(14px)" }}
                />

                <div className="relative z-10 w-full overflow-hidden transition-all duration-500 transform shadow-2xl rounded-2xl hover:-translate-y-2">
                  <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[420px]">
                    <Image
                      src="/ProblemSolveImage.png"
                      alt="Problem solve illustration"
                      fill
                      className="object-contain rounded-2xl"
                      priority
                    />
                  </div>
                </div>

                {/* subtle floating animation on large screens only */}
                <style jsx>{`
                  @media (min-width: 1024px) {
                    @keyframes float-tilt {
                      0% { transform: translateY(0) rotate(0deg); }
                      50% { transform: translateY(-8px) rotate(-0.5deg); }
                      100% { transform: translateY(0) rotate(0deg); }
                    }
                    .relative.z-10 { animation: float-tilt 7s ease-in-out infinite; }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}