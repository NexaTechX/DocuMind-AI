import { Suspense } from "react";
import DocumentPageClient from "./document-page-client";
import { supabase } from "@/lib/supabase";

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  // Pre-fetch document data on the server
  const { data: document } = await supabase
    .from("documents")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <Suspense
      fallback={
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
      }
      data-oid="5trnlfz"
    >
      <DocumentPageClient
        id={params.id}
        initialData={document}
        data-oid="xcd_o4-"
      />
    </Suspense>
  );
}
