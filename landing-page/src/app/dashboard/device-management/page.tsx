"use client";
import React, { useState } from "react";
import { Smartphone, Laptop, Globe, Shield, Trash2, AlertTriangle } from "lucide-react";
import GlassAlert from "../GlassAlert";

export default function DeviceManagementPage() {
  const [error, setError] = useState<string | null>(null);

  const simulateRevoke = (deviceName: string) => {
    setError(`Failed to revoke ${deviceName}. Try again.`);
  };

  // Mock device data
  const devices = [
    { id: "1", name: "Chrome on Windows", location: "Lagos, NG", lastSeen: "2 minutes ago", type: "desktop", current: true },
    { id: "2", name: "iPhone 14", location: "Abuja, NG", lastSeen: "1 hour ago", type: "mobile", current: false },
    { id: "3", name: "API token", location: "N/A", lastSeen: "Never", type: "api", current: false },
  ];

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "desktop": return <Laptop className="h-4 w-4" />;
      case "mobile": return <Smartphone className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GlassAlert open={!!error} title="Revoke failed" message="Unable to revoke device access." variant="error" onClose={() => setError(null)} primaryAction={{ label: "Retry", onClick: () => { setError(null); alert("Revoking device..."); } }} />
      <header className="rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] p-4 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Device Management</h1>
              <p className="text-xs/5 opacity-90">Manage and secure your connected devices.</p>
            </div>
          </div>
          <button onClick={() => setError("Revoke failed. Try again.")} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <AlertTriangle className="h-4 w-4" /> Revoke All
          </button>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-white dark:bg-slate-900">
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{device.name}</span>
                    {device.current && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <Shield className="h-3 w-3" /> Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">
                    {device.location} • {device.lastSeen}
                  </div>
                </div>
              </div>
              <button
                onClick={() => simulateRevoke(device.name)}
                className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-red-600 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-900"
                disabled={device.current}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Security Tip</h3>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">Regularly review and revoke old devices to keep your account secure.</p>
        </div>
      </section>
    </main>
  );
}
