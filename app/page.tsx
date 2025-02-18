"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Brain,
  FileText,
  Lock,
  Search,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning for deep document understanding",
    badge: "New",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find exactly what you need with semantic search",
  },
  {
    icon: BookOpen,
    title: "Instant Summaries",
    description: "Get key insights in seconds",
    badge: "Popular",
  },
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Support for PDF, Word, and more",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              DocuMind AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium hover:text-blue-400 transition"
            >
              Features
            </a>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-blue-400 transition"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium hover:text-blue-400 transition"
            >
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hover:text-blue-400 transition"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-all transform hover:scale-105">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-500/10 text-blue-400"
              >
                ✨ Introducing AI-Powered Document Analysis
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transform Your Documents
                <br />
                Into Intelligent Insights
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Upload documents, extract insights, and get instant answers
                using advanced AI. Perfect for research, contracts, and
                technical documentation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg transition-all transform hover:scale-105"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-6 text-lg border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Try Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Enterprise-grade security
                </div>
                <div className="h-1 w-1 rounded-full bg-gray-700" />
                <div>No credit card required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="py-20 bg-gradient-to-b from-black to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to analyze and understand your documents
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl border border-gray-800 bg-black p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      {feature.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-400"
                        >
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of users who are already saving time and gaining
              deeper insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-6 text-lg border-blue-500 text-blue-400 hover:bg-blue-500/10"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
