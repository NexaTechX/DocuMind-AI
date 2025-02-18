"use client";

import { FilePreview } from "@/components/file-preview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { uploadDocument } from "@/lib/document-parser";
import { ArrowLeft, Brain, FileText, FileUp } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DemoPage() {
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setSelectedFile(file);
      setAnalyzing(true);

      try {
        const { success, message, preview } = await uploadDocument(file);
        if (success) {
          setPreview(preview || "");
          toast({
            title: "Success",
            description: message,
          });
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
        setAnalyzing(false);
      }
    },
    [toast]
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

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              DocuMind AI Demo
            </span>
          </div>
          <Link href="/">
            <Button variant="ghost" className="hover:text-blue-400 transition">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Try DocuMind AI
            </h1>
            <p className="text-xl text-gray-400">
              Experience the power of AI-driven document analysis. Upload a
              document to see it in action.
            </p>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5"
            }`}
          >
            <input {...getInputProps()} />
            <FileUp className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <p className="text-lg text-gray-300 mb-2">
              {isDragActive
                ? "Drop your document here"
                : "Drag and drop your document, or click to select"}
            </p>
            <p className="text-sm text-gray-400">
              Supports PDF, Word, and TXT files (max 10MB)
            </p>
          </div>

          {selectedFile && preview && (
            <div className="mt-8 p-6 rounded-xl border border-gray-800 bg-gray-900/50">
              <FilePreview
                file={selectedFile}
                preview={preview}
                onRemove={() => {
                  setSelectedFile(null);
                  setPreview("");
                }}
              />
              <div className="mt-6 flex justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white transition-all transform hover:scale-105"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Sign Up to Analyze More Documents
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-500" />
              <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                DocuMind AI
              </span>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} DocuMind AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
