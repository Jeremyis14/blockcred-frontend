"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationPreloader({ minDelayMs = 700 }: { minDelayMs?: number }) {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (lastPath.current === null) {
      lastPath.current = pathname;
      return;
    }
    // Only show for specific routes (blog and pricing)
    const shouldShow = !!pathname && (/^\/blog(\/|$)/.test(pathname) || /^\/pricing(\/|$)/.test(pathname));
    if (!shouldShow) {
      lastPath.current = pathname;
      return;
    }
    // Path changed and eligible: show overlay, then hide after delay
    setShow(true);
    setFade(false);
    const t = setTimeout(() => {
      setFade(true);
      const t2 = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(t2);
    }, minDelayMs);

    return () => clearTimeout(t);
  }, [pathname, minDelayMs]);

  if (!show) return null;

  return (
    <div className={`loader-overlay ${fade ? "fade-out-quick" : ""}`}>
      <div className="loader-inner">
        <div className="reveal-mask">
          <img
            src="darkicon.png"
            alt="Blockcred logo"
            style={{ width: 140, height: "auto", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
