import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import PreloaderGate from "./PreloaderGate";
import NavigationPreloader from "./NavigationPreloader";
import ThemeProvider from "./ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});
const openSans = DM_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});
export const metadata: Metadata = {
  title: "Blockcred",
  icons:{
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={openSans.className}
      >
        <ThemeProvider>
          <NavigationPreloader minDelayMs={700} />
          <PreloaderGate minDelayMs={1200}>
            {children}
          </PreloaderGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
