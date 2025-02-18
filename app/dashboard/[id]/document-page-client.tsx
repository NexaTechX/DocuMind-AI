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

  if (!document) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold">{document.title}</h1>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={deleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your document and remove all of its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Document Content */}
          <div className="space-y-8">
            <div className="p-6 border rounded-lg bg-card">
              <h2 className="text-lg font-semibold mb-4">Document Content</h2>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{document.content}</p>
              </div>
            </div>

            {/* Document Chat */}
            <DocumentChat content={document.content} />
          </div>

          {/* Document Analysis */}
          <div>
            <DocumentAnalysis content={document.content} />
          </div>
        </div>
      </main>
    </div>
  );
}
