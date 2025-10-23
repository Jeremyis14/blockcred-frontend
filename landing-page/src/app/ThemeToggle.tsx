"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ inline = false }: { inline?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const baseButton: React.CSSProperties = inline
    ? {
        width: 36,
        height: 36,
        borderRadius: 999,
        background: isDark ? "transparent" : "transparent",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)"}`,
        color: isDark ? "#f5f5f5" : "#0b0d14",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        transition: "background 180ms ease, border-color 180ms ease, color 180ms ease, transform 120ms ease",
      }
    : {
        position: "fixed",
        right: 16,
        top: 16,
        zIndex: 10000,
        width: 42,
        height: 42,
        borderRadius: 999,
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)"}`,
        color: isDark ? "#f5f5f5" : "#0b0d14",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        cursor: "pointer",
        transition: "background 180ms ease, border-color 180ms ease, color 180ms ease, transform 120ms ease",
      };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={baseButton}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      {isDark ? (
        <svg width={inline ? 16 : 18} height={inline ? 16 : 18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V2M12 22v-2M4.93 4.93L3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2M22 12h-2M4.93 19.07l-1.42 1.42M20.49 3.51l-1.42 1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ) : (
        <svg width={inline ? 16 : 18} height={inline ? 16 : 18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      )}
    </button>
  );
}
