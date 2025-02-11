"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Trash2 } from "lucide-react";
import { DocumentAnalysis } from "@/components/document-analysis";
import { DocumentChat } from "@/components/document-chat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DocumentPageClientProps {
  id: string;
  initialData?: any;
}

export default function DocumentPageClient({
  id,
  initialData,
}: DocumentPageClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [document, setDocument] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [deleting, setDeleting] = useState(false);

  const fetchDocument = useCallback(async () => {
    if (initialData) return; // Skip fetching if we have initial data

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setDocument(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch document",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [id, toast, router, initialData]);

  useEffect(() => {
    let mounted = true;

    const initializeComponent = async () => {
      if (mounted) {
        await fetchDocument();
      }
    };

    initializeComponent();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`document_${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "documents",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          if (mounted) {
            if (payload.eventType === "DELETE") {
              router.push("/dashboard");
            } else {
              setDocument(payload.new);
            }
          }
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchDocument, id, router]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { error } = await supabase.from("documents").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Document deleted successfully",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background" data-oid="ow.ma4e">
        <div className="container mx-auto px-4 py-8" data-oid="9.2tqx-">
          <div className="animate-pulse space-y-4" data-oid="2qohk59">
            <div className="h-8 w-48 bg-muted rounded" data-oid="yy0:nkd"></div>
            <div className="h-64 bg-muted rounded" data-oid=":_32pui"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-background" data-oid="vhwwkqh">
        <div className="container mx-auto px-4 py-8" data-oid="c26wmwk">
          <div className="text-center" data-oid=":1td166">
            <h1 className="text-2xl font-bold mb-4" data-oid="-hfdviv">
              Document Not Found
            </h1>
            <Button onClick={() => router.back()} data-oid="7p4utq.">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-oid="pk1--7g">
      <header className="border-b" data-oid="eb5_70z">
        <div
          className="container mx-auto px-4 h-16 flex items-center justify-between"
          data-oid="xmm1sd2"
        >
          <div className="flex items-center space-x-4" data-oid="7v2kpw8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              data-oid="lbttmzn"
            >
              <ArrowLeft className="h-4 w-4 mr-2" data-oid="b_hcy18" />
              Back
            </Button>
            <h1 className="text-xl font-bold" data-oid="6jggf16">
              {document.title}
            </h1>
          </div>
          <AlertDialog data-oid="h2:k71i">
            <AlertDialogTrigger asChild data-oid="iw58wc0">
              <Button
                variant="destructive"
                disabled={deleting}
                data-oid="-td2e2m"
              >
                <Trash2 className="h-4 w-4 mr-2" data-oid="r2jovv:" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-oid="hw9v8lm">
              <AlertDialogHeader data-oid="yixw.:.">
                <AlertDialogTitle data-oid="kob9w:y">
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription data-oid="cur1wbe">
                  This action cannot be undone. This will permanently delete
                  your document and remove all of its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter data-oid="0h8ctjp">
                <AlertDialogCancel data-oid="i7j0huf">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  data-oid="oouxxhx"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" data-oid=".apuhla">
        <div className="grid gap-8 lg:grid-cols-2" data-oid="5eowl4u">
          {/* Document Content */}
          <div className="space-y-8" data-oid="wfpttfj">
            <div className="p-6 border rounded-lg bg-card" data-oid="tnx-8g-">
              <h2 className="text-lg font-semibold mb-4" data-oid=".0kjavo">
                Document Content
              </h2>
              <div className="prose prose-sm max-w-none" data-oid="w690tl.">
                <p className="whitespace-pre-wrap" data-oid="mqj.aqb">
                  {document.content}
                </p>
              </div>
            </div>

            {/* Document Chat */}
            <DocumentChat content={document.content} data-oid="04na5zi" />
          </div>

          {/* Document Analysis */}
          <div data-oid="qpfgfy-">
            <DocumentAnalysis content={document.content} data-oid="ti6dn0_" />
          </div>
        </div>
      </main>
    </div>
  );
}
