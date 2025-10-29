"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const THEME = "#3E4095";
const ACCENT = "#5a57d9";
const THEME_LIGHT_RGBA = "rgba(62,64,149,0.12)";
const THEME_BLOB = "rgba(62,64,149,0.20)";
const ACCENT_BLOB = "rgba(90,87,217,0.16)";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at TechCorp",
    image: "/testimonials/sarah.jpg",
    content: "BlockCred has revolutionized how we handle employee credentials. The SUI integration makes it incredibly fast and cost-effective.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "HR Director at StartupX",
    image: "/testimonials/michael.jpg",
    content: "The verification speed is unmatched. What used to take days now happens in seconds with complete trust.",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "University Administrator",
    image: "/testimonials/emily.jpg",
    content: "Perfect for academic credentials. Students love the instant verification and employers trust the blockchain proof.",
    rating: 5
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) {
    const card = (e.currentTarget as HTMLDivElement);
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -8; // tilt X
    const ry = ((x - r.width / 2) / r.width) * 8; // tilt Y
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${id === currentIndex ? "-2px" : "0"})`;
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) {
    const card = (e.currentTarget as HTMLDivElement);
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(${id === currentIndex ? "-2px" : "0"})`;
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden">
      <div className="px-6 mx-auto max-w-7xl">
        <div className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-slate-100">
            Loved by teams worldwide
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-300">
            What customers say about BlockCred
          </p>
        </div>

        <div className="relative mt-12">
          {/* Ambient floating decoration */}
          <div className="pointer-events-none absolute -top-6 left-1/4 h-20 w-20 rounded-full blur-2xl" style={{ background: THEME_BLOB }} aria-hidden />
          <div className="pointer-events-none absolute -bottom-8 right-1/4 h-24 w-24 rounded-full blur-2xl" style={{ background: ACCENT_BLOB }} aria-hidden />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                onMouseMove={(e) => handleMouseMove(e, t.id)}
                onMouseLeave={(e) => handleMouseLeave(e, t.id)}
                className={`group relative rounded-2xl border bg-white dark:bg-slate-800 p-6 shadow-lg transition-all duration-500 will-change-transform ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ zIndex: i === currentIndex ? 10 : 1, borderColor: i === currentIndex ? `${THEME}66` : undefined }}
              >
                {/* glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `radial-gradient(240px 120px at 20% 0%, ${THEME_LIGHT_RGBA}, transparent 60%)`}} />

                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/5">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-slate-100">{t.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{t.role}</p>
                  </div>
                  <div className="drop-shadow-sm animate-pulse-slow" style={{ color: THEME }} aria-label={`${t.rating} stars`}>{"★".repeat(t.rating)}</div>
                </div>

                <blockquote className="relative text-gray-700 dark:text-slate-300">
                  <span className="absolute -left-2 -top-3 text-2xl text-gray-300 dark:text-slate-500 select-none" aria-hidden>“</span>
                  <p className="pl-3 pr-1 italic">{t.content}</p>
                </blockquote>

                {/* sliding underline accent for active card */}
                <div className={`mt-5 h-0.5 transition-all duration-500 ${i === currentIndex ? "w-full" : "w-0"}`} style={{ background: `linear-gradient(90deg, ${THEME}, ${ACCENT})` }} />
              </div>
            ))}
          </div>

          {/* small auto-advance dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-emerald-500" : "w-2.5 bg-gray-300 dark:bg-slate-700"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-pulse-slow { animation: pulse-slow 2.6s ease-in-out infinite; }
        @keyframes pulse-slow { 0%,100%{opacity:1} 50%{opacity:.6} }
      `}</style>
    </section>
  );
}

