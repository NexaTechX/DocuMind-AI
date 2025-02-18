"use client";

import { Suspense, useEffect, useState, use } from "react";
import DocumentPageClient from "./document-page-client";
import { supabase } from "@/lib/supabase";

export default function DocumentPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>; // Explicitly define paramsPromise type as Promise
}) {
  const params = use(paramsPromise) as { id: string }; // Explicitly cast params type
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const { data, error } = await supabase
          .from("documents")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          setError(error as Error);
        } else {
          setDocument(data);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchDocument();
  }, [params.id]); // Add params.id to the dependency array

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-500">
            Error loading document: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return <DocumentPageClient id={params.id} initialData={document} />;
}
