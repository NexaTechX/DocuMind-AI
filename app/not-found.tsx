"use client";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
          404
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="min-w-[200px]"
          >
            Go Back
          </Button>
          <Button onClick={() => router.push("/")} className="min-w-[200px]">
            Return Home
          </Button>
        </div>
      </main>
    </div>
  );
}
