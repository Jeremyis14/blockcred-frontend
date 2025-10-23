"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const THEME = "#3E4095";

const TRUST_LOGOS = [
  "/brands/samsung.png",
  "/brands/harvard.png",
  "/brands/uber.png",
  "/brands/mckesson.png",
];

export default function Hero(): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // small delay so animations feel natural on page load
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 max-md:mt-10">
      <div className="px-6 py-16 mx-auto max-w-7xl lg:py-28">
        <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: text */}
          <div className="lg:col-span-6">
            <div
              className={`max-w-2xl mx-auto transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
            >
              {/* badge */}
              <div className="flex justify-center sm:justify-start">
                <div className="inline-flex items-center gap-3 px-3 py-1 text-sm font-medium border-b rounded-full shadow-sm border-neutral-200 bg-white/50 dark:bg-slate-900/50 dark:border-slate-800">
                  <span
                    className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-white rounded-full"
                    style={{ background: THEME }}
                  >
                    New
                  </span>
                  <span className="text-gray-700 dark:text-slate-300">Powered by SUI Blockchain</span>
                </div>
              </div>

              <h1 className="mt-6 text-4xl leading-tight tracking-tight text-center text-gray-900 dark:text-slate-100 sm:text-left sm:text-5xl">
                Secure{" "}
                <span
                  className="ml-1 text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(90deg, ${THEME}, #5a57d9)` }}
                >
                  Credentials
                </span>
                <div className="inline-block text-4xl sm:text-5xl">Management — simplified.</div>
              </h1>

              <p className="mt-6 text-lg text-center text-gray-600 dark:text-slate-300 sm:text-left">
                Issue, verify and store digital credentials with tamper-proof proofs on SUI — fast, private and cost efficient.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-8 sm:justify-start">
                <Link
                  href="/signup"
                  className="inline-flex items-center rounded-full px-5 py-3 text-sm text-white shadow-sm transform-gpu transition hover:scale-[1.02]  sm:w-auto justify-center"
                  style={{ background: `linear-gradient(135deg, ${THEME} 0%, #5a57d9 100%)` }}
                >
                  Get Started
                </Link>

                <Link
                  href="#learn"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 transition border border-gray-200 dark:border-slate-800 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 sm:w-auto"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-8">
                <p className="text-xs font-medium tracking-wide text-center text-gray-500 dark:text-slate-400 uppercase sm:text-left">
                  Trusted by teams worldwide
                </p>

                <div className="flex items-center justify-center max-w-2xl mx-auto mt-4 space-x-4 sm:justify-between sm:mx-0 sm:space-x-6">
                  {TRUST_LOGOS.map((src) => (
                    <div
                      key={src}
                      className="relative w-16 h-8 transition-all duration-300 opacity-75 sm:w-24 sm:h-10 grayscale hover:grayscale-0 hover:opacity-100"
                      aria-hidden
                    >
                      <Image
                        src={src}
                        alt="Trusted company logo"
                        fill
                        sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 128px"
                        className="object-contain filter drop-shadow-sm"
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="lg:col-span-6">
            <div className={`mx-auto max-w-lg transition-all duration-900 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="relative overflow-hidden bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-xl rounded-2xl">
                {/* soft glowing background */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(500px 160px at 10% 30%, ${THEME}12, transparent 20%), radial-gradient(360px 120px at 90% 80%, #5a57d922, transparent 20%)`,
                  }}
                />

                <div className="p-8 md:p-12">
                  <div className="relative w-full h-56 mx-auto sm:h-72 md:h-80 lg:h-96">
                    {/* Illustration file (put /hero-illustration.png in public). If missing, this will be empty — you can swap for an inline SVG */}
                    <Image
                      src="/hero.png"
                      alt="Illustration showing secure credentials"
                      fill={false}
                      width={720}
                      height={520}
                      className="object-contain"
                      priority
                    />

                    {/* floating badges for subtle motion */}
                    <div className="pointer-events-none">
                      <div className="absolute -left-6 -top-6 animate-float-slow">
                        <div className="px-3 py-2 text-xs font-semibold border border-gray-100 dark:border-slate-800 rounded-lg shadow-sm bg-white/90 dark:bg-slate-900/80 dark:text-slate-200">
                          Verified • 120k+
                        </div>
                      </div>

                      <div className="absolute -right-6 -bottom-6 animate-float">
                        <div className="px-3 py-2 text-xs font-semibold border border-gray-100 dark:border-slate-800 rounded-lg shadow-sm bg-white/90 dark:bg-slate-900/80 dark:text-slate-200">
                          Instant checks
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-3">
                    <div className="px-4 py-3 text-center rounded-lg bg-gray-50 dark:bg-slate-800">
                      <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">99.99%</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-slate-400">Uptime</div>
                    </div>

                    <div className="px-4 py-3 text-center rounded-lg bg-gray-50 dark:bg-slate-800">
                      <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">Instant</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-slate-400">Verification</div>
                    </div>

                    <div className="px-4 py-3 text-center rounded-lg bg-gray-50 dark:bg-slate-800">
                      <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">End-to-end</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-slate-400">Encryption</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300 border-t border-gray-100 dark:border-slate-800">Built on SUI • Tamper-proof • Low fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scoped animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}