import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RouteDefense Group | Premium Legal Network",
  description: "Institutional traffic defense network connecting drivers with specialized counsel across all 50 states.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfairDisplay.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#111111] font-[family-name:var(--font-geist-sans)] selection:bg-[#E63946] selection:text-white">
        {children}
      </body>
    </html>
  );
}
