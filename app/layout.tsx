import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning data-oid="z.9ba51">
      <body className={inter.className} data-oid="-o-68og">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          data-oid="v77cf36"
        >
          {children}
          <Toaster data-oid="tzs9u6u" />
        </ThemeProvider>
      </body>
    </html>
  );
}
