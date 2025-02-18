"use client";

import { FilePreview } from "@/components/file-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { uploadDocument } from "@/lib/document-parser";
import { supabase } from "@/lib/supabase";
import { FileUp, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function DashboardPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const { toast } = useToast();
  const router = useRouter();

  // Memoize the fetch documents function
  const fetchDocuments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session && mounted) {
        router.push("/login");
        return;
      }

      if (mounted) {
        await fetchDocuments();
      }
    }

    initialize();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [router, fetchDocuments]);

  const handleFileDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setSelectedFile(file);
      setUploading(true);

      try {
        const { success, message, content, preview } = await uploadDocument(
          file
        );
        if (success) {
          setPreview(preview || "");
          toast({
            title: "Success",
            description: message,
          });
          await fetchDocuments();
        } else {
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    },
    [toast, fetchDocuments]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    onDrop: handleFileDrop,
    maxSize: 10 * 1024 * 1024,
  });

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }, [router]);

  const filteredDocuments = documents.filter((doc: any) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDocuments = [...filteredDocuments].sort((a: any, b: any) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "size":
        return b.file_size - a.file_size;
      default:
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">My Documents</h1>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-8">
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-border hover:border-primary bg-card"
        >
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {isDragActive
              ? "Drop the files here"
              : "Drag and drop a document, or click to select"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Supports PDF, Word, and TXT files (max 10MB)
          </p>
        </div>

        {selectedFile && preview && (
          <div className="mt-4">
            <FilePreview
              file={selectedFile}
              preview={preview}
              onRemove={() => {
                setSelectedFile(null);
                setPreview("");
              }}
            />
          </div>
        )}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-8 h-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={sortBy}
                onValueChange={(value: "date" | "name" | "size") =>
                  setSortBy(value)
                }
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="rounded-md border bg-secondary text-secondary-foreground shadow-sm"
              >
                <div className="p-4">
                  <h3 className="font-bold truncate">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(doc.created_at).toLocaleDateString()} -{" "}
                    {formatFileSize(doc.file_size)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-md"
                  onClick={() => router.push(`/document/${doc.id}`)}
                >
                  View Document
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
