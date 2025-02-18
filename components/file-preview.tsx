"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, File, AlertCircle } from "lucide-react";

interface FilePreviewProps {
  file: File;
  preview: string;
  onRemove?: () => void;
}

export function FilePreview({ file, preview, onRemove }: FilePreviewProps) {
  const [error, setError] = useState<string | null>(null);

  const fileSize = (size: number) => {
    if (size < 1024) return size + " B";
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    else return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = () => {
    switch (file.type) {
      case "application/pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        return <FileText className="h-8 w-8 text-blue-500" />;

      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{getFileIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium truncate">{file.name}</h3>
            <span className="text-xs text-muted-foreground">
              {fileSize(file.size)}
            </span>
          </div>

          {error ? (
            <div className="mt-2 flex items-center text-sm text-red-500">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {preview}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
