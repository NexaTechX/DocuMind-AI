"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, X } from "lucide-react";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" data-oid="uvw9riy">
      <div className="text-center" data-oid="r86-tp8">
        <h1 className="text-2xl font-bold mb-2" data-oid="rie.d2m">
          Upload Documents
        </h1>
        <p className="text-muted-foreground" data-oid="3gf1xos">
          Drag and drop your documents or click to browse
        </p>
      </div>

      <Card data-oid="wk23d._">
        <CardContent className="p-6" data-oid="ybsrzyj">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? "border-primary bg-primary/5" : "border-muted"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            data-oid="s394_w6"
          >
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              data-oid="v4pio1n"
            />

            <label
              htmlFor="file-upload"
              className="flex flex-col items-center gap-4 cursor-pointer"
              data-oid="ye8j5vq"
            >
              <Upload
                className="h-12 w-12 text-muted-foreground"
                data-oid="msevvb1"
              />

              <div data-oid="nmfspzh">
                <p className="text-lg font-medium" data-oid="_l-62nq">
                  Drop your files here or click to upload
                </p>
                <p className="text-sm text-muted-foreground" data-oid="mt29zlu">
                  Supports PDF, Word, and TXT files
                </p>
              </div>
              <Button data-oid="t-7denx">Select Files</Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card data-oid="wgxqruy">
          <CardContent className="p-6" data-oid="hr5qa06">
            <h2 className="font-semibold mb-4" data-oid="-mctiv0">
              Selected Files
            </h2>
            <div className="space-y-3" data-oid="cpvnarc">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                  data-oid="5sjhl.l"
                >
                  <div className="flex items-center gap-3" data-oid="ca1rw5r">
                    <File className="h-5 w-5 text-primary" data-oid="s9q9x1d" />
                    <div data-oid="252ubn5">
                      <p className="font-medium" data-oid="hhhekq4">
                        {file.name}
                      </p>
                      <p
                        className="text-sm text-muted-foreground"
                        data-oid=".q52vmi"
                      >
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    data-oid="yiba1ae"
                  >
                    <X className="h-4 w-4" data-oid="a5rkqtb" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3" data-oid="_9ik0uf">
              <Button
                variant="outline"
                onClick={() => setFiles([])}
                data-oid="k382lwx"
              >
                Clear All
              </Button>
              <Button data-oid="a_xhxga">Process Documents</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
