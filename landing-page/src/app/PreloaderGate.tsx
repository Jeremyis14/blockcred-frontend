"use client";

import { useEffect, useState } from "react";

export default function PreloaderGate({
  children,
  minDelayMs = 1200,
}: {
  children: React.ReactNode;
  minDelayMs?: number;
}) {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFade(true);
      const t2 = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(t2);
    }, minDelayMs);
    return () => clearTimeout(t);
  }, [minDelayMs]);

  if (show) {
    return (
      <div className={`loader-overlay ${fade ? "fade-out-quick" : ""}`}>
        <div className="loader-inner">
          <div className="reveal-mask">
            <img
              src="/darkicon.png"
              alt="Blockcred dark logo"
              style={{ width: 140, height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
