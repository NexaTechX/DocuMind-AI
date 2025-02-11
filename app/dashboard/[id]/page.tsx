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
      <div className="min-h-screen bg-background" data-oid="6b:c_z2">
        <div className="container mx-auto px-4 py-8" data-oid="yovm:kp">
          <div className="animate-pulse space-y-4" data-oid="_.uptyc">
            <div
              className="h-8 w-48 bg-muted rounded"
              data-oid=":xd9awl"
            ></div>
            <div className="h-64 bg-muted rounded" data-oid="de_0wy."></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background" data-oid="6b:c_z2">
        <div className="container mx-auto px-4 py-8" data-oid="yovm:kp">
          <div className="text-red-500" data-oid="_.uptyc">
            Error loading document: {error.message}
          </div>
        </div>
      </div>
    );
  }


  return (
    
      <DocumentPageClient
        id={params.id}
        initialData={document}
        data-oid="xcd_o4-"
      />
    
  );
}
