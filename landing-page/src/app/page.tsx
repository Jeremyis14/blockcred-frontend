"use client"
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import ProblemSolve from "../../components/ProblemSolve";
import Founders from "../../components/Founders";
import Contact from "../../components/Contact";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Reviews from "../../components/Reviews";

export default function Home() {
  return (
      <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar/>
        <Hero/>
        {/* Animated metrics band */}
        <section className="py-10 border-y border-gray-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
          <div className="px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <div className="rounded-xl bg-gray-50 dark:bg-slate-900 p-4 shadow-sm transition-transform will-change-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold">120k+</div>
                <div className="text-xs text-gray-600 dark:text-slate-400">Credentials Verified</div>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-slate-900 p-4 shadow-sm transition-transform will-change-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold"><span className="align-baseline">99.99%</span></div>
                <div className="text-xs text-gray-600 dark:text-slate-400">Uptime</div>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-slate-900 p-4 shadow-sm transition-transform will-change-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold"><span className="align-baseline">200ms</span></div>
                <div className="text-xs text-gray-600 dark:text-slate-400">Avg Verification</div>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-slate-900 p-4 shadow-sm transition-transform will-change-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold">$0.001</div>
                <div className="text-xs text-gray-600 dark:text-slate-400">Avg Cost</div>
              </div>
            </div>
          </div>
        </section>
        <Features/>
        <ProblemSolve/>
        {/* Logo marquee */}
        <section className="py-12 bg-gray-50 dark:bg-slate-900">
          <div className="overflow-hidden">
            <div className="flex items-center gap-16 animate-[marquee_25s_linear_infinite] opacity-80 hover:opacity-100">
              <img src="/brands/samsung.png" alt="Samsung" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              <img src="/brands/harvard.png" alt="Harvard" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              <img src="/brands/uber.png" alt="Uber" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              <img src="/brands/mckesson.png" alt="McKesson" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              <img src="/brands/samsung.png" alt="Samsung" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              <img src="/brands/harvard.png" alt="Harvard" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              <img src="/brands/uber.png" alt="Uber" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              <img src="/brands/mckesson.png" alt="McKesson" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
            </div>
          </div>
          <style jsx>{`
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          `}</style>
        </section>
        {/* How it works (reveal on scroll) */}
        <section id="learn" className="py-20 bg-white dark:bg-slate-950">
          <div className="px-6 mx-auto max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-slate-100">How it works</h2>
              <p className="mt-3 text-gray-600 dark:text-slate-300">From issuance to verification in three smooth steps.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
              <div className="group relative rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute -z-10 inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: "radial-gradient(200px 120px at 20% 10%, #3E409522, transparent 60%)"}} />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800">1</div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-slate-100">Issue</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Create a verifiable credential anchored on SUI with a cryptographic proof.</p>
              </div>
              <div className="group relative rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute -z-10 inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: "radial-gradient(200px 120px at 20% 10%, #5a57d922, transparent 60%)"}} />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800">2</div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-slate-100">Share</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Recipients store it privately and share only what’s required with verifiers.</p>
              </div>
              <div className="group relative rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute -z-10 inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: "radial-gradient(200px 120px at 20% 10%, #3E409522, transparent 60%)"}} />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800">3</div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-slate-100">Verify</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Instantly validate authenticity using the on-chain proof — no PII exposure.</p>
              </div>
            </div>
          </div>
        </section>
        <Founders/>
        <Reviews/>
        {/* Gradient CTA with ambient glow */}
        <section className="relative py-20">
          <div className="absolute inset-0 -z-10 opacity-70" aria-hidden>
            <div className="absolute left-1/3 top-10 h-40 w-40 rounded-full blur-3xl" style={{background: "#3E409522"}} />
            <div className="absolute right-1/4 bottom-10 h-56 w-56 rounded-full blur-3xl" style={{background: "#5a57d944"}} />
          </div>
          <div className="px-6 mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-3xl border border-gray-100 dark:border-slate-800 bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-8 sm:p-12 shadow-xl">
              <div className="flex flex-col items-center gap-6 text-center text-white">
                <h3 className="text-2xl font-semibold">Ready to issue verifiable credentials?</h3>
                <p className="max-w-2xl text-white/80">Start with our free tier and upgrade as you grow. Instant verification, low fees, privacy-first.</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a href="/sign-up" className="inline-flex items-center justify-center rounded-full bg-white/15 px-5 py-2 text-sm font-medium hover:bg-white/20 transition">Get started</a>
                  <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-sm font-medium hover:bg-white/10 transition">Talk to sales</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Contact/>
        <Faq/>
        <Footer/>
      </div>
  );
}
