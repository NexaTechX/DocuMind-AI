"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, FileText, Search } from "lucide-react";
import Link from "next/link";
import { analyzeDocument, generateSummary, queryDocument } from "@/lib/ai";

const DEMO_TEXT = `Artificial Intelligence (AI) has emerged as one of the most transformative technologies of our time. It encompasses the development of computer systems capable of performing tasks that typically require human intelligence. These tasks include visual perception, speech recognition, decision-making, and language translation.

Machine Learning, a subset of AI, enables systems to learn and improve from experience without being explicitly programmed. Deep Learning, a more specialized form of Machine Learning, uses neural networks with many layers to analyze various factors of data.

The applications of AI are vast and growing. In healthcare, AI assists in diagnosis and drug discovery. In finance, it powers fraud detection and algorithmic trading. In transportation, it enables autonomous vehicles and optimizes traffic flow. The technology also transforms customer service through chatbots and virtual assistants.

However, the rise of AI also raises important ethical considerations. Issues of privacy, bias in AI systems, job displacement, and the need for transparent and accountable AI decision-making processes are at the forefront of public discourse. As AI continues to evolve, balancing innovation with responsible development becomes increasingly crucial.`;

export default function DemoPage() {
  const [analysis, setAnalysis] = useState("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    try {
      const result = await analyzeDocument(DEMO_TEXT);
      setAnalysis(result);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateSummary() {
    setLoading(true);
    try {
      const result = await generateSummary(DEMO_TEXT, "medium");
      setSummary(result);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAskQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const result = await queryDocument(question, DEMO_TEXT);
      setAnswer(result);
    } catch (error) {
      console.error("Error processing question:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background" data-oid="n2r7_66">
      <header className="border-b" data-oid="sryg_bp">
        <div
          className="container mx-auto px-4 h-16 flex items-center justify-between"
          data-oid="voo827l"
        >
          <div className="flex items-center space-x-2" data-oid="p5ii8x1">
            <Brain className="h-6 w-6" data-oid="mibk9:7" />
            <span className="text-xl font-bold" data-oid="v8c75m2">
              DocuMind AI
            </span>
          </div>
          <Link href="/signup" data-oid="hfe5gv:">
            <Button data-oid="vte1cb-">Try It Free</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" data-oid="r949a5z">
        <div className="max-w-4xl mx-auto" data-oid="ybzr1wj">
          <div className="mb-8 text-center" data-oid="u-yfe8b">
            <h1 className="text-3xl font-bold mb-4" data-oid="2sofrsq">
              Try DocuMind AI
            </h1>
            <p className="text-muted-foreground" data-oid="g25lga3">
              Experience the power of AI-driven document analysis with this
              interactive demo.
            </p>
          </div>

          <div className="grid gap-8" data-oid="j-4zoog">
            {/* Sample Document */}
            <div className="p-6 border rounded-lg bg-card" data-oid="c3s58or">
              <div
                className="flex items-center justify-between mb-4"
                data-oid="mf0-htv"
              >
                <h2 className="text-xl font-semibold" data-oid="edu-vbx">
                  Sample Document
                </h2>
                <FileText
                  className="h-5 w-5 text-muted-foreground"
                  data-oid="ft5uec4"
                />
              </div>
              <div className="prose prose-sm max-w-none" data-oid=".ynfnjs">
                <p className="whitespace-pre-wrap" data-oid=":b_azu0">
                  {DEMO_TEXT}
                </p>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="p-6 border rounded-lg bg-card" data-oid="dgfmity">
              <div
                className="flex items-center justify-between mb-4"
                data-oid="4a.g2wb"
              >
                <h2 className="text-xl font-semibold" data-oid="raq0gw7">
                  AI Analysis
                </h2>
                <Button
                  onClick={handleAnalyze}
                  disabled={loading}
                  data-oid="_jz9.m3"
                >
                  <Brain className="h-4 w-4 mr-2" data-oid="5bt3hui" />
                  {loading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
              {analysis && (
                <div className="prose prose-sm max-w-none" data-oid="tr62fan">
                  <div className="whitespace-pre-wrap" data-oid="kq2s:-4">
                    {analysis}
                  </div>
                </div>
              )}
            </div>

            {/* Summary Section */}
            <div className="p-6 border rounded-lg bg-card" data-oid="p.z:.ld">
              <div
                className="flex items-center justify-between mb-4"
                data-oid="u.f5wyb"
              >
                <h2 className="text-xl font-semibold" data-oid="itj8lbn">
                  Summary
                </h2>
                <Button
                  onClick={handleGenerateSummary}
                  disabled={loading}
                  data-oid="0by5o8m"
                >
                  Generate Summary
                </Button>
              </div>
              {summary && (
                <p className="whitespace-pre-wrap" data-oid="-hbq0le">
                  {summary}
                </p>
              )}
            </div>

            {/* Q&A Section */}
            <div className="p-6 border rounded-lg bg-card" data-oid="sny_z3e">
              <h2 className="text-xl font-semibold mb-4" data-oid=":_nej2d">
                Ask Questions
              </h2>
              <form
                onSubmit={handleAskQuestion}
                className="space-y-4"
                data-oid="gnnlbsr"
              >
                <div className="flex space-x-2" data-oid="7c3t6gr">
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question about the document..."
                    disabled={loading}
                    data-oid="qvph.qx"
                  />

                  <Button type="submit" disabled={loading} data-oid="-t8_09h">
                    <Search className="h-4 w-4 mr-2" data-oid=":ku8ihm" />
                    Ask
                  </Button>
                </div>
                {answer && (
                  <div className="p-4 bg-muted rounded-lg" data-oid="n._bzw9">
                    <p className="font-medium mb-2" data-oid="ovgi:ag">
                      Answer:
                    </p>
                    <p className="whitespace-pre-wrap" data-oid="piak6z1">
                      {answer}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="mt-8 text-center" data-oid="iy_-jfb">
            <p className="text-muted-foreground mb-4" data-oid="c5_71m_">
              Ready to analyze your own documents?
            </p>
            <Link href="/signup" data-oid="9cg7poz">
              <Button size="lg" data-oid="siis2d1">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
