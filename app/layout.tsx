import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Optimize font loading configuration
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Add display swap for better performance
  preload: true, // Ensure font preloading
  adjustFontFallback: true, // Improve font fallback handling
});

export const metadata: Metadata = {
  title: "DocuMind AI - Intelligent Document Analysis",
  description: "AI-powered document analysis and insights platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          {process.env.NEXT_PUBLIC_GA_ID && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}
