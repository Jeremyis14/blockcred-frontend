"use client"

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const POSTS = [
  {
    slug: "how-sui-blockchain-powers-scalable-identity-systems",
    title: "How SUI Blockchain Powers Scalable Identity Systems",
    excerpt: "A practical look at how SUI improves credential verification and privacy at scale.",
    date: "2025-06-12",
    image: "/Frame 2147208123.png",
  },
  {
    slug: "the-evolution-of-digital-credentials-from-web2-to-web3",
    title: "The Evolution of Digital Credentials — Web2 to Web3",
    excerpt: "Why verifiable credentials are the next step for trustworthy digital identities.",
    date: "2025-04-08",
    image: "/Frame 2147207750 (1).png",
  },
  {
    slug: "why-on-chain-credentials-are-the-future-of-trust",
    title: "Why On-Chain Credentials Are the Future of Trust",
    excerpt: "A guide for product teams considering verifiable credentials and blockchain anchoring.",
    date: "2025-02-23",
    image: "/Homepage.png",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Navbar />
      <main className="mt-10 bg-white dark:bg-slate-950 dark:text-slate-100">
        <section className="pt-16 pb-8">
          <div className="px-6 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-medium text-gray-900 dark:text-slate-100 sm:text-5xl">Insights & Articles</h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-slate-300">
                Stories, guides and deep dives from the BlockCred team.
              </p>
            </div>

            <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
              {POSTS.map((p) => (
                <article key={p.slug} className="overflow-hidden transition transform bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 shadow-sm rounded-2xl hover:-translate-y-2">
                  <div className="relative w-full h-40 bg-gray-50 dark:bg-slate-800">
                    <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                  </div>

                  <div className="p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(p.date).toLocaleDateString()}</div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-slate-100">{p.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">{p.excerpt}</p>

                    <div className="mt-4">
                      <Link href={`/blog/${p.slug}`} className="text-sm font-medium text-[#3E4095] hover:underline">
                        Read article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}