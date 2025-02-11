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
  }, [content]); // Only re-run when content changes

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
    <div className="space-y-6" data-oid="nd6zu4.">
      {/* Analysis Section */}
      <Card className="p-6" data-oid="::a_75l">
        <div
          className="flex items-center justify-between mb-4"
          data-oid="-raxduc"
        >
          <div className="flex items-center gap-2" data-oid="j:0b-pq">
            <Brain className="h-5 w-5 text-primary" data-oid=":ja2jqs" />
            <h2 className="text-lg font-semibold" data-oid="soxmxi0">
              AI Analysis
            </h2>
          </div>
          {loading.analysis ? (
            <Button disabled data-oid="fr59s6m">
              Analyzing...
            </Button>
          ) : (
            <Button onClick={() => {}} data-oid="3z7fm_5">
              Analyze
            </Button>
          )}
        </div>
        {analysis && (
          <div className="space-y-4" data-oid="34crtx7">
            <div data-oid="0ht3747">
              <h3 className="font-medium mb-2" data-oid="b-q3fxk">
                Summary
              </h3>
              <p className="text-muted-foreground" data-oid="nz-knqn">
                {analysis.summary}
              </p>
            </div>
            <div data-oid="94uwgh2">
              <h3 className="font-medium mb-2" data-oid="8q10709">
                Key Topics
              </h3>
              <ul
                className="list-disc list-inside text-muted-foreground"
                data-oid="iaegoha"
              >
                {analysis.keyTopics.map((topic, index) => (
                  <li key={index} data-oid=":8wgh41">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <div data-oid="3mpdl32">
              <h3 className="font-medium mb-2" data-oid="si5m-sx">
                Important Insights
              </h3>
              <ul
                className="list-disc list-inside text-muted-foreground"
                data-oid="iroxe76"
              >
                {analysis.insights.map((insight, index) => (
                  <li key={index} data-oid="hc9zeu:">
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Summary Section */}
      <Card className="p-6" data-oid="oe09c1c">
        <div
          className="flex items-center justify-between mb-4"
          data-oid="wrq.zy."
        >
          <div className="flex items-center gap-2" data-oid="m494lwu">
            <FileText className="h-5 w-5 text-primary" data-oid="ic6ro95" />
            <h2 className="text-lg font-semibold" data-oid="01xx0:v">
              Summary
            </h2>
          </div>
          <div className="flex items-center gap-2" data-oid="..w0qek">
            <Select
              value={summaryLength}
              onValueChange={(value: "short" | "medium" | "long") =>
                setSummaryLength(value)
              }
              data-oid="6p82:ca"
            >
              <SelectTrigger className="w-32" data-oid="sj63j.v">
                <SelectValue placeholder="Length" data-oid="8uzadj4" />
              </SelectTrigger>
              <SelectContent data-oid="zjxhsek">
                <SelectItem value="short" data-oid="_nvf2e_">
                  Short
                </SelectItem>
                <SelectItem value="medium" data-oid="kkavdgz">
                  Medium
                </SelectItem>
                <SelectItem value="long" data-oid="nj7qg0g">
                  Long
                </SelectContent>
            </Select>
            <Button
              onClick={handleGenerateSummary}
              disabled={loading.summary}
              data-oid="_ah6m-7"
            >
              {loading.summary ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>
        {summary && (
          <p className="text-muted-foreground" data-oid="e0-ws9_">
            {summary}
          </p>
        )}
      </Card>

      {/* Key Points Section */}
      <Card className="p-6" data-oid="x3160un">
        <div
          className="flex items-center justify-between mb-4"
          data-oid="-toi4dv"
        >
          <div className="flex items-center gap-2" data-oid=":7pr_8v">
            <List className="h-5 w-5 text-primary" data-oid="9eia8ea" />
            <h2 className="text-lg font-semibold" data-oid="_utj9u3">
              Key Points
            </h2>
          </div>
          <Button
            onClick={handleExtractKeyPoints}
            disabled={loading.keyPoints}
            data-oid="tffpbtc"
          >
            {loading.keyPoints ? "Extracting..." : "Extract"}
          </Button>
        </div>
        {keyPoints.length > 0 && (
          <ul
            className="list-disc list-inside text-muted-foreground"
            data-oid="5f-quqy"
          >
            {keyPoints.map((point, index) => (
              <li key={index} data-oid="rxf_:e9">
                {point}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
