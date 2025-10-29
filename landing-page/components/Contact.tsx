"use client";
import React, { useEffect, useRef, useState } from "react";
import GlassAlert from "../src/app/dashboard/GlassAlert";

const THEME = "#3E4095";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [alert, setAlert] = useState<{open:boolean; title:string; message?:string; variant?:"error"|"success"|"info"|"warning"}>({open:false, title:""});

  // reveal-on-scroll refs
  const formRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === formRef.current && entry.isIntersecting) setFormVisible(true);
          if (entry.target === infoRef.current && entry.isIntersecting) setInfoVisible(true);
        });
      },
      { threshold: 0.18 }
    );

    if (formRef.current) io.observe(formRef.current);
    if (infoRef.current) io.observe(infoRef.current);

    return () => io.disconnect();
  }, []);

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.subject.trim()) e.subject = "Please enter a subject";
    if (!form.message.trim()) e.message = "Please enter a message";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setAlert({ open: true, title: "Message sent", message: "Thanks — we'll get back to you soon.", variant: "success" });
      } else {
        throw new Error("API unavailable");
      }
    } catch (_err) {
      // fallback to mailto if API unavailable
      const subject = encodeURIComponent(form.subject || "Contact from BlockCred site");
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.location.href = `mailto:info@blockcred.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setAlert({ open: true, title: "Opening mail app", message: "We couldn't reach the API, so we opened your mail app as a fallback.", variant: "info" });
    } finally {
      setSubmitting(false);
      // clear success message after a few seconds so user can submit again
      if (status !== "error") {
        setTimeout(() => setStatus(null), 4000);
      }
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-950" id="contact" aria-labelledby="contact-heading">
      <GlassAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert(a=>({ ...a, open:false }))}
        position="bottom-right"
      />
      <div className="px-6 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="contact-heading" className="text-3xl font-medium text-gray-900 dark:text-slate-100 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-slate-300">
            Have questions about BlockCred? Our team is here to help. Send us a message and we'll get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-12">
          {/* Form */}
          <div
            ref={formRef}
            className={`lg:col-span-7 transition-all duration-700 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3E4095] dark:bg-slate-900/40 dark:text-slate-100 ${
                      errors.name ? "border-red-300" : "border-gray-200 dark:border-slate-800"
                    }`}
                    placeholder="Your full name"
                    
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && <span id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</span>}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3E4095] dark:bg-slate-900/40 dark:text-slate-100 ${
                      errors.email ? "border-red-300" : "border-gray-200 dark:border-slate-800"
                    }`}
                    placeholder="you@example.com"
                    
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <span id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</span>}
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3E4095] dark:bg-slate-900/40 dark:text-slate-100 ${
                    errors.subject ? "border-red-300" : "border-gray-200 dark:border-slate-800"
                  }`}
                  placeholder="What is this about?"
                  
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && <span id="subject-error" className="mt-1 text-xs text-red-600">{errors.subject}</span>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3E4095] dark:bg-slate-900/40 dark:text-slate-100 ${
                    errors.message ? "border-red-300" : "border-gray-200 dark:border-slate-800"
                  }`}
                  placeholder="How can we help?"
                  
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <span id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</span>}
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-5 py-2 text-sm font-medium text-white shadow transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
                >
                  {/* spinner */}
                  {submitting && (
                    <svg className="w-4 h-4 mr-2 -ml-1 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  )}

                  {/* success check */}
                  {!submitting && status === "success" ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 checkmark" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Sent
                    </span>
                  ) : (
                    <span>{submitting ? "Sending..." : "Send message"}</span>
                  )}
                </button>

                <div className="text-sm text-gray-600 dark:text-slate-300" aria-live="polite">
                  {status === "success" && <span className="text-green-600">Message sent — thank you!</span>}
                  {status === "error" && <span className="text-red-600">Something went wrong. Try again or email info@blockcred.com</span>}
                </div>
              </div>
            </form>
          </div>

          {/* Contact info */}
          <div
            ref={infoRef}
            className={`lg:col-span-5 transition-all duration-700 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="p-6 bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-sm rounded-2xl">
              <h4 className="text-lg font-medium text-gray-900 dark:text-slate-100">Contact Information</h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Prefer direct contact? Use the details below or send a message using the form.</p>

              <dl className="mt-6 space-y-4 text-sm text-gray-700 dark:text-slate-300">
                <div className="flex gap-3">
                  <dt aria-label="Email icon">
                    <svg className="w-5 h-5 text-gray-400 dark:text-slate-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M2 7a2 2 0 0 1 2-2h3l2 3h6l2-3h3a2 2 0 0 1 2 2v2a14 14 0 0 1-14 14A14 14 0 0 1 2 9V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </dt>
                  <dd>
                    <div className="font-medium text-gray-900 dark:text-slate-100">Email</div>
                    <a href="mailto:info@blockcred.com" className="text-gray-600 dark:text-slate-300 hover:underline">info@blockcred.com</a>
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt aria-label="Calendar icon">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M2 8.5v7A3.5 3.5 0 0 0 5.5 19h13A3.5 3.5 0 0 0 22 15.5v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3v4M8 3v4M3 9h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </dt>
                  <dd>
                    <div className="font-medium text-gray-900 dark:text-slate-100">Phone</div>
                    <a href="tel:+2349191495536" className="text-gray-600 dark:text-slate-300 hover:underline">+234 91 9149 5536</a>
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt aria-label="Location icon">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </dt>
                  <dd>
                    <div className="font-medium text-gray-900 dark:text-slate-100">Address</div>
                    <div className="text-gray-600 dark:text-slate-300">Port Harcourt, Rivers State, Nigeria</div>
                  </dd>
                </div>
              </dl>

              <div className="pt-4 mt-6 border-t border-gray-100 dark:border-slate-800">
                <div className="text-xs font-medium text-gray-500 dark:text-slate-400">Office Hours</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-slate-300">Mon - Fri: 9:00 AM - 6:00 PM WAT</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-slate-300">Sat: 10:00 AM - 2:00 PM WAT · Sun: Closed</div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="inline-flex items-center justify-center transition rounded w-9 h-9 hover:bg-gray-100 dark:hover:bg-slate-800">
                  {/* facebook */}
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v3h3v9h3v-9h2.5l.5-3H14V6a1 1 0 0 1 1-1h3V2z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="inline-flex items-center justify-center transition rounded w-9 h-9 hover:bg-gray-100 dark:hover:bg-slate-800">
                  {/* twitter */}
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M23 3c-.8.4-1.6.7-2.5.9A4.1 4.1 0 0 0 16.5 3a4.2 4.2 0 0 0-4.2 4.2c0 .3 0 .7.1 1A11.9 11.9 0 0 1 3 4s-4 9 5 13c-1 .2-2 .3-3 .1 1 3 4 5 7.5 5A12 12 0 0 0 23 6.2c0-.2 0-.4 0-.6A8.2 8.2 0 0 0 23 3z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="inline-flex items-center justify-center transition rounded w-9 h-9 hover:bg-gray-100 dark:hover:bg-slate-800">
                  {/* linkedin */}
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.6 4.09 5.5 2.99 5.5 1.89 5.5 1 4.6 1 3.5 1 2.4 1.89 1.5 2.99 1.5 4.09 1.5 4.98 2.4 4.98 3.5zM1 8.75h4v14H1zM8.75 8.75h3.75v2.05c.6-.99 2.06-1.95 4.55-1.95C21.3 8.85 22 11.37 22 15.42V22h-4v-6.05c0-2.15-.55-3.95-2.95-3.95-2.15 0-2.75 1.52-2.75 3.71V22H8.75z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations and small styles */}
      <style jsx>{`
        .checkmark {
          transform-origin: center;
          animation: pop 400ms ease forwards;
        }

        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Make sure the focus ring color is visible on dark mode too */
        input:focus, textarea:focus {
          outline: none;
        }
      `}</style>
    </section>
  );
}