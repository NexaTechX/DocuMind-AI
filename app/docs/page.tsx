"use client";

import { Header } from "@/components/layout/header";
import { Alert } from "@/components/ui/alert";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <h1 className="text-3xl font-bold mb-4">Documentation</h1>
        <Alert>
          Third-party API integration is coming soon!
        </Alert>
        {/* Add your documentation content here */}
      </main>
    </div>
  );
}
