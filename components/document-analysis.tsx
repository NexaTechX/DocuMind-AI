"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, FileText, List } from "lucide-react";
import {
  analyzeDocument,
  generateSummary,
  extractKeyPoints,
} from "@/lib/document-analysis";
import type { AnalysisResult } from "@/lib/document-analysis";
import { useToast } from "@/hooks/use-toast";

interface DocumentAnalysisProps {
  content: string;
}

export function DocumentAnalysis({ content }: DocumentAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [summaryLength, setSummaryLength] = useState<
    "short" | "medium" | "long"
  >("medium");
  const [loading, setLoading] = useState({
    analysis: false,
    summary: false,
    keyPoints: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const analyze = async () => {
      if (content) {
        setLoading((prev) => ({ ...prev, analysis: true }));
        try {
          const result = await analyzeDocument(content);
          setAnalysis(result);
        } catch (error) {
          toast({
            title: "Analysis Failed",
            description:
              error instanceof Error
                ? error.message
                : "Failed to analyze document",
            variant: "destructive",
          });
        } finally {
          setLoading((prev) => ({ ...prev, analysis: false }));
        }
      }
    };
    analyze(); // Call the analyze function asynchronously
  }, [content, toast]); // Only re-run when content changes

  const handleGenerateSummary = async () => {
    if (!content) {
      toast({
        title: "Error",
        description: "No document content to summarize",
        variant: "destructive",
      });
      return;
    }

    setLoading((prev) => ({ ...prev, summary: true }));
    try {
      const result = await generateSummary(content, summaryLength);
      setSummary(result);
    } catch (error) {
      toast({
        title: "Summary Failed",
        description:
          error instanceof Error ? error.message : "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setLoading((prev) => ({ ...prev, summary: false }));
    }
  };

  const handleExtractKeyPoints = async () => {
    if (!content) {
      toast({
        title: "Error",
        description: "No document content to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading((prev) => ({ ...prev, keyPoints: true }));
    try {
      const result = await extractKeyPoints(content);
      setKeyPoints(result);
    } catch (error) {
      toast({
        title: "Key Points Extraction Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to extract key points",
        variant: "destructive",
      });
    } finally {
      setLoading((prev) => ({ ...prev, keyPoints: false }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Analysis Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">AI Analysis</h2>
          </div>
          {loading.analysis ? (
            <Button disabled>Analyzing...</Button>
          ) : (
            <Button onClick={() => {}}>Analyze</Button>
          )}
        </div>
        {analysis && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Summary</h3>
              <p className="text-muted-foreground">{analysis.summary}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Key Topics</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {analysis.keyTopics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Important Insights</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {analysis.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Summary Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Summary</h2>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={summaryLength}
              onValueChange={(value: "short" | "medium" | "long") =>
                setSummaryLength(value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateSummary} disabled={loading.summary}>
              {loading.summary ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>
        {summary && <p className="text-muted-foreground">{summary}</p>}
      </Card>

      {/* Key Points Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <List className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Key Points</h2>
          </div>
          <Button onClick={handleExtractKeyPoints} disabled={loading.keyPoints}>
            {loading.keyPoints ? "Extracting..." : "Extract"}
          </Button>
        </div>
        {keyPoints.length > 0 && (
          <ul className="list-disc list-inside text-muted-foreground">
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
