"use client";
import React from "react";
import { XCircle, AlertTriangle } from "lucide-react";

type GlassAlertProps = {
  open: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
  variant?: "error" | "info" | "success";
  primaryAction?: { label: string; onClick: () => void };
};

export default function GlassAlert({ open, title = "Something went wrong", message, onClose, variant = "error", primaryAction }: GlassAlertProps) {
  if (!open) return null;
  const color = variant === "error" ? "#dc2626" : variant === "success" ? "#16a34a" : "#3E4095";
  const vignette = variant === "error" ? "rgba(220,38,38,0.3)" : variant === "success" ? "rgba(22,163,74,0.28)" : "rgba(62,64,149,0.25)";
  const borderTint = variant === "error" ? "border-red-400/30" : variant === "success" ? "border-emerald-400/30" : "border-white/20";
  const bgTint = variant === "error" ? "bg-red-500/15" : variant === "success" ? "bg-emerald-500/15" : "bg-white/10";
  const tip = variant === "error"
    ? "If it bleeds, we can debug it."
    : variant === "success"
    ? "Achievement unlocked: It actually worked."
    : "Tip: Try again later. Or bribe the server with fresh electrons.";
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
      {/* dim + vignette */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(1200px 600px at 50% -10%, ${vignette}, transparent 60%)`
      }} />
      {/* card */}
      <div className={`relative mx-4 w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl border ${borderTint} ${bgTint} p-5 text-white shadow-2xl backdrop-blur-md`}
        style={{boxShadow: `0 10px 40px -10px ${color}55`}}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg" style={{background: `linear-gradient(135deg, ${color}, #5a57d9)`}}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold" style={{color}}>{title}</h3>
            {message && <p className="mt-1 text-sm/5 text-white/80">{message}</p>}
            <p className="mt-2 text-xs text-white/70">{tip}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button onClick={onClose} className="w-full rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto">Dismiss</button>
          {primaryAction ? (
            <button onClick={primaryAction.onClick} className="w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-[#3E4095] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto">{primaryAction.label}</button>
          ) : (
            <button onClick={onClose} className="w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-[#3E4095] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto">Okay</button>
          )}
        </div>
      </div>
    </div>
  );
}
