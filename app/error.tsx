"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-muted-foreground mb-8">
              {error?.message || "An unexpected error occurred"}
            </p>
            <div className="space-x-4">
              <Button onClick={() => reset()}>Try again</Button>
              <Link href="/">
                <Button variant="outline">Return Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
