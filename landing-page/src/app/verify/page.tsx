"use client";
import React, { useState } from "react";
import { ShieldCheck, Search, Copy, Download, Share, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function VerifyPage() {
  const [credentialId, setCredentialId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    details?: {
      name: string;
      issuer: string;
      issued: string;
      expires?: string;
      recipient: string;
      description: string;
    };
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const simulateVerification = async () => {
    if (!credentialId.trim()) return;
    setIsVerifying(true);
    setResult(null);
    // Simulate API call
    setTimeout(() => {
      if (credentialId.toLowerCase().includes("invalid")) {
        setResult({ valid: false });
      } else {
        setResult({
          valid: true,
          details: {
            name: "Blockchain 101 Certificate",
            issuer: "Blockcred Academy",
            issued: "2025-10-01",
            expires: "2028-10-01",
            recipient: "user@example.com",
            description: "Comprehensive course on blockchain fundamentals.",
          },
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const copyId = () => {
    navigator.clipboard.writeText(credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-r from-[#3E4095] to-[#5a57d9] text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">BlockCred Verify</h1>
              <p className="text-sm text-gray-600 dark:text-slate-300">Verify digital credentials instantly</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Verification form */}
        <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Verify a Credential</h2>
          <p className="mt-2 text-gray-600 dark:text-slate-300">Enter the credential ID or verification link to check its authenticity.</p>

          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="Enter credential ID or verification link..."
                className="w-full rounded-lg border border-gray-200 pl-10 pr-3 py-3 text-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3E4095]"
              />
            </div>
            <button
              onClick={simulateVerification}
              disabled={!credentialId.trim() || isVerifying}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3E4095] to-[#5a57d9] px-6 py-3 text-sm font-medium text-white shadow hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E4095] disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify Credential"}
            </button>
          </div>
        </section>

        {/* Verification result */}
        {result && (
          <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {result.valid ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Credential Verified</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-300">This credential is authentic and tamper-proof.</p>
                  </div>
                </div>

                {result.details && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Credential Name</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{result.details.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Issuer</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{result.details.issuer}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Issued Date</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{result.details.issued}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Recipient</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{result.details.recipient}</p>
                      </div>
                      {result.details.expires && (
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Expires</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{result.details.expires}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{result.details.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                        <Copy className="h-4 w-4" />
                        Copy Details
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                        <Share className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Verification Failed</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300">This credential could not be verified or does not exist.</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Help section */}
        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">How to Verify</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <p>1. Enter the credential ID or verification link provided by the issuer.</p>
            <p>2. Click "Verify Credential" to check authenticity on the SUI blockchain.</p>
            <p>3. If valid, view details and download or share the credential.</p>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-slate-400">All verifications are secure and tamper-proof using blockchain technology.</p>
        </section>
      </main>
    </div>
  );
}
