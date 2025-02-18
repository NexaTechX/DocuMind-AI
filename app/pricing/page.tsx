"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Check, Sparkles, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out DocuMind AI",
    price: { monthly: 0, annual: 0 },
    features: [
      "5 documents per month",
      "Basic AI analysis",
      "Standard support",
      "1GB storage",
      "Export to PDF",
    ],
    badge: "",
    ctaText: "Get Started",
    icon: Brain,
  },
  {
    name: "Pro",
    description: "Best for professionals and small teams",
    price: { monthly: 29, annual: 290 },
    features: [
      "Unlimited documents",
      "Advanced AI analysis",
      "Priority support",
      "10GB storage",
      "Export to multiple formats",
      "Team collaboration",
      "API access",
      "Custom branding",
    ],
    badge: "Most Popular",
    ctaText: "Start Free Trial",
    icon: Star,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    price: { monthly: 99, annual: 990 },
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 priority support",
      "Advanced security",
      "Custom AI models",
      "Dedicated account manager",
      "SSO integration",
      "Custom API limits",
    ],
    badge: "Ultimate",
    ctaText: "Contact Sales",
    icon: Sparkles,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              DocuMind AI
            </span>
          </Link>
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Choose the perfect plan for your needs
              </p>
              <div className="flex justify-center items-center gap-4">
                <span className={annual ? "text-gray-400" : "text-white"}>
                  Monthly
                </span>
                <button
                  onClick={() => setAnnual(!annual)}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    annual ? "bg-blue-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform transform ${
                      annual ? "translate-x-8" : ""
                    }`}
                  />
                </button>
                <span className={annual ? "text-white" : "text-gray-400"}>
                  Annual{" "}
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-blue-500/10 text-blue-400"
                  >
                    Save 20%
                  </Badge>
                </span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="relative group rounded-xl border border-gray-800 bg-black p-8 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <plan.icon className="h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="text-gray-400 mt-2">{plan.description}</p>
                      </div>
                      {plan.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-400"
                        >
                          {plan.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">
                          ${annual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-gray-400 ml-2">
                          /{annual ? "year" : "month"}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mb-8 bg-blue-500 hover:bg-blue-600 text-white transition-all transform hover:scale-105">
                      {plan.name === "Pro" && <Zap className="mr-2 h-4 w-4" />}
                      {plan.ctaText}
                    </Button>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-blue-500" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            {/* Add FAQ content here */}
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
