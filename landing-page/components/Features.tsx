"use client"
import React from 'react';

const THEME = "#3E4095";

const features = [
  {
    title: "Credential Verification",
    description: "Verify the authenticity of credentials with blockchain-backed security and immutability",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M9 12L11 14L15 10M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Credential Issuance",
    description: "Issue tamper-proof digital credentials that can be instantly verified by any authorized party",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M9 3H4C3.44772 3 3 3.44772 3 4V9M15 3H20C20.5523 3 21 3.44772 21 4V9M21 15V20C21 20.5523 20.5523 21 20 21H15M9 21H4C3.44772 21 3 20.5523 3 20V15" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Credential Storage",
    description: "Store credential securely on the SUI blockchain with redundant backup and encryption",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden bg-white dark:bg-slate-950" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-[#3E4095]/5"/>
        <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-[#5a57d9]/5"/>
      </div>

      <div className="relative px-6 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-slate-100 sm:text-5xl">
            Our Features
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-gray-600 dark:text-slate-300">
            BlockCred provides a comprehensive suite of credential management
            services powered by the SUI blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3E4095] to-[#5a57d9] opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20"/>
              
              <div className="relative p-8 transition-all duration-500 bg-white dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 rounded-2xl hover:shadow-2xl hover:border-transparent group-hover:translate-y-[-4px]">
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 group-hover:opacity-100"/>
                
                <div className="relative">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 mb-8 text-white transition-all duration-500 transform rounded-xl group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${THEME} 0%, #5a57d9 100%)` }}
                  >
                    {feature.icon}
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-slate-100 group-hover:text-[#3E4095] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient orbs animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .absolute {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}