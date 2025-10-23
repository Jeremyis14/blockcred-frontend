"use client";
import React from "react";
import Image from "next/image";

type Founder = {
  name: string;
  role: string;
  blurb: string;
  linkedin?: string;
  image?: string; // optional: put files under public/founders/ e.g. /founders/raphael.png
};

const THEME = "#3E4095";

const founders: Founder[] = [
  {
    name: "Raphael Tomiwa",
    role: "CEO & Founder",
    blurb: "Blockchain expert with extensive experience in web3 systems and distributed ledger technologies.",
    linkedin: "#",
    // image: "/founders/raphael.png",
  },
  {
    name: "Robinson Honour",
    role: "Co-Founder",
    blurb: "Specialized in cryptography and secure systems with a passion for building trustless verification solutions.",
    linkedin: "#",
    // image: "/founders/robinson.png",
  },
  {
    name: "Emmanuel Aina",
    role: "Co-Founder",
    blurb: "Lead Software Designer focusing on intuitive and elegant interfaces for complex blockchain applications.",
    linkedin: "#",
    // image: "/founders/emmanuel.png",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Founders() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950" id="founders" aria-labelledby="founders-heading">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="founders-heading" className="text-3xl font-medium text-gray-900 dark:text-slate-100 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-slate-300">
            The minds behind BlockCred — building secure, fast, and private credential solutions on SUI.
          </p>
        </div>

        {/* founders grid */}
        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((f) => (
            <article
              key={f.name}
              className="group flex flex-col justify-between min-h-[200px] gap-4 p-5 bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition transform will-change-transform duration-200 ease-out"
            >
              <div className="flex items-start gap-4">
                {/* avatar */}
                {f.image ? (
                  <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={f.image}
                      alt={`${f.name} photo`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white rounded-lg"
                    style={{ background: `linear-gradient(135deg, ${THEME}, #5a57d9)` }}
                    aria-hidden
                  >
                    <span className="text-lg font-semibold">{getInitials(f.name)}</span>
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{f.name}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-slate-400">{f.role}</div>
                    </div>

                    <div className="ml-2">
                      <a
                        href={f.linkedin ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${f.name} LinkedIn`}
                        className="inline-flex items-center justify-center w-8 h-8 text-gray-600 dark:text-slate-300 transition rounded hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M4.983 3.5C4.983 4.604 4.09 5.5 2.984 5.5C1.879 5.5 0.985 4.604 0.985 3.5C0.985 2.395 1.879 1.5 2.984 1.5C4.09 1.5 4.983 2.395 4.983 3.5Z" fill="currentColor" />
                          <path d="M.5 8.75H4.5V24H.5z" fill="currentColor" />
                          <path d="M8.75 8.75H12.5V10.8C13.1 9.76 14.56 8.5 17.05 8.5C21.3 8.5 22 11.02 22 15.07V24H17V15.95C17 13.8 16.45 12 14.05 12C11.9 12 11.3 13.52 11.3 15.71V24H6.75V8.75H8.75Z" fill="currentColor" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">{f.blurb}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Why BlockCred was made */}
        <div className="max-w-4xl mx-auto mt-14">
          <h3 className="text-2xl font-medium text-center text-gray-900 dark:text-slate-100">Why BlockCred was made</h3>
          <p className="max-w-2xl mx-auto mt-3 text-center text-gray-600 dark:text-slate-300">
            Verification workflows are slow, fragmented and often unverifiable. By combining verifiable credentials with the
            SUI blockchain we make credential issuance, verification, and storage:
          </p>

          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 p-4 text-center bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: `linear-gradient(135deg, ${THEME}, #5a57d9)` }}>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-lg font-medium text-gray-900 dark:text-slate-100">Instant</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-slate-300">Fast verification across organizations</div>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 text-center bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: `linear-gradient(135deg, ${THEME}, #5a57d9)` }}>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 6l-8 8-8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-lg font-medium text-gray-900 dark:text-slate-100">Reliable</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-slate-300">Tamper-proof proofs you can trust</div>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 text-center bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: `linear-gradient(135deg, ${THEME}, #5a57d9)` }}>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-lg font-medium text-gray-900 dark:text-slate-100">Private</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-slate-300">User-first privacy and minimal on-chain footprint</div>
            </div>
          </div>
        </div>

      </div>

      {/* small entrance animation for smoother feel */}
      <style jsx>{`
        article {
          will-change: transform, box-shadow;
        }
      `}</style>
    </section>
  );
}