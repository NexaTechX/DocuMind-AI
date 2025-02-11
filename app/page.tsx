"use client";
import { Chat } from "@/components/Chat";
import { KeyPoints } from "@/components/KeyPoints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookMarked,
  Brain,
  Cloud,
  FileText,
  History,
  Languages,
  MessageSquare,
  Search,
  Share2,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [document, setDocument] = useState(null);

  return (
    <div className="flex min-h-screen flex-col" data-oid="clgo0.6">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        data-oid="i71f.z6"
      >
        <div
          className="container mx-auto flex h-16 items-center justify-between px-4"
          data-oid="-.jzhrv"
        >
          <div className="flex items-center space-x-2" data-oid="6mhw6ql">
            <Brain className="h-8 w-8 text-primary" data-oid="xl6ic4d" />
            <span className="text-2xl font-bold" data-oid="4hpx:g8">
              DocuMind AI
            </span>
          </div>
          <div
            className="w-[30px] h-[30px] bg-[#E3F3FF]"
            data-oid="j0bw589"
            key="olk-JNXt"
          ></div>
          <nav
            className="hidden md:flex items-center space-x-6"
            data-oid="y.07yl_"
          >
            <Link
              href="/features"
              className="text-sm font-medium hover:text-primary"
              data-oid="y8i8e_4"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-primary"
              data-oid="tgwo914"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium hover:text-primary"
              data-oid="5_kkhrw"
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary"
              data-oid="vcfp6:t"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center space-x-4" data-oid="3dsuokx">
            <Link href="/login" data-oid="y_.x:yv">
              <Button variant="ghost" data-oid="mqxkwfe">
                Login
              </Button>
            </Link>
            <Link href="/signup" data-oid="p6-vmsk">
              <Button
                className="shadow-lg hover:shadow-xl transition-shadow"
                data-oid="w1ty216"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative" data-oid="3gjf_zd">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"
          data-oid="cvj3vh6"
        />

        <div
          className="container mx-auto px-4 py-32 relative"
          data-oid="f51zt8l"
        >
          <div className="text-center" data-oid="17sfgdh">
            <Badge variant="secondary" className="mb-4" data-oid="tu7iy4h">
              ✨ New: Multi-Document Analysis Now Available
            </Badge>
            <h1
              className="mb-6 text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              data-oid="o8pegm1"
            >
              Transform Documents into
              <br data-oid=".9bdfag" />
              Intelligent Insights
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground"
              data-oid="4.ui1f4"
            >
              Upload documents, extract insights, and get instant answers using
              advanced AI. Perfect for research papers, contracts, and technical
              documentation.
            </p>
            <div className="flex justify-center space-x-4" data-oid="hex8am2">
              <Link href="/signup" data-oid="2438-p2">
                <Button
                  size="lg"
                  className="gap-2 h-12 px-6 shadow-lg hover:shadow-xl transition-all"
                  data-oid="nnule-g"
                >
                  <Zap className="h-5 w-5" data-oid="aetibnx" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/demo" data-oid="uji4mss">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 h-12 px-6"
                  data-oid="b56ndpd"
                >
                  <FileText className="h-5 w-5" data-oid="rnublp4" />
                  Watch Demo
                </Button>
              </Link>
            </div>
            <div
              className="mt-8 flex justify-center items-center space-x-4 text-sm text-muted-foreground"
              data-oid="m9noceq"
            >
              <div className="flex items-center" data-oid="urqrglf">
                <Shield className="h-4 w-4 mr-2" data-oid="r0x56u3" />
                Enterprise-grade security
              </div>
              <div
                className="h-1 w-1 rounded-full bg-muted-foreground"
                data-oid="q88e3.7"
              />

              <div data-oid=":9bpgpu">No credit card required</div>
              <div
                className="h-1 w-1 rounded-full bg-muted-foreground"
                data-oid="10_4ll."
              />

              <div data-oid="tipsvn4">Cancel anytime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t bg-muted/50 py-24" data-oid=":ar.9wz">
        <div className="container mx-auto px-4" data-oid="ha59h:7">
          <div className="text-center mb-16" data-oid=":hqpe_v">
            <h2 className="text-3xl font-bold mb-4" data-oid="mzw.kpa">
              Powerful Features
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              data-oid="0irl.:m"
            >
              Everything you need to analyze, understand, and extract value from
              your documents.
            </p>
          </div>
          <div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            data-oid="5uhnrcy"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02]"
                data-oid="hx7vcbu"
              >
                <div
                  className="flex justify-between items-start mb-4"
                  data-oid="namk8rk"
                >
                  <div
                    className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                    data-oid="m_95yfj"
                  >
                    <feature.icon
                      className="h-6 w-6 text-primary"
                      data-oid="vu04.5:"
                    />
                  </div>
                  {feature.badge && (
                    <Badge
                      variant={
                        feature.badge === "New" ? "default" : "secondary"
                      }
                      data-oid=":4dhdrc"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="mb-2 text-xl font-semibold" data-oid="2ap6d3e">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-oid="33b1si9">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Functionality */}
      <section className="border-t py-24" data-oid="chat-section">
        <div className="container mx-auto px-4" data-oid="chat-container">
          <div className="text-center mb-16" data-oid="chat-header">
            <h2 className="text-3xl font-bold mb-4" data-oid="chat-title">
              Interactive Chat
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              data-oid="chat-description"
            >
              Ask questions and receive answers with key points from your
              documents.
            </p>
          </div>
          <Chat document={document} />
        </div>
      </section>

      {/* Key Points Extraction */}
      <section className="border-t py-24" data-oid="key-points-section">
        <div className="container mx-auto px-4" data-oid="key-points-container">
          <div className="text-center mb-16" data-oid="key-points-header">
            <h2 className="text-3xl font-bold mb-4" data-oid="key-points-title">
              Key Points Extraction
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              data-oid="key-points-description"
            >
              Identify and extract main insights from your documents.
            </p>
          </div>
          <KeyPoints document={document} />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-t py-24" data-oid="839_767">
        <div className="container mx-auto px-4" data-oid=".r573nd">
          <div className="text-center" data-oid="_5hbmfp">
            <h2 className="text-3xl font-bold mb-4" data-oid="d-sghgu">
              Trusted by Teams Worldwide
            </h2>
            <p
              className="text-xl text-muted-foreground mb-12"
              data-oid="zp416zz"
            >
              Join thousands of researchers, professionals, and teams who trust
              DocuMind AI
            </p>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50"
              data-oid="vmkl7s5"
            >
              {/* Add company logos here */}
              <div className="h-12 bg-muted rounded" data-oid="rxnje90"></div>
              <div className="h-12 bg-muted rounded" data-oid="k2r7qsa"></div>
              <div className="h-12 bg-muted rounded" data-oid="9nh.sga"></div>
              <div className="h-12 bg-muted rounded" data-oid="arqa2ot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="border-t bg-primary-foreground py-24"
        data-oid="aksyarm"
      >
        <div className="container mx-auto px-4 text-center" data-oid="_bq9_r1">
          <h2 className="text-4xl font-bold mb-4" data-oid="3d_2u:i">
            Ready to Get Started?
          </h2>
          <p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            data-oid="8q-8.f4"
          >
            Join thousands of users who are already saving time and gaining
            deeper insights with DocuMind AI.
          </p>
          <div className="flex justify-center space-x-4" data-oid="vfkdcrr">
            <Link href="/signup" data-oid=":fr12_1">
              <Button size="lg" className="gap-2 h-12 px-6" data-oid=".cfa7vx">
                <Zap className="h-5 w-5" data-oid="h6z5sgb" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing" data-oid="ptfq0g0">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 h-12 px-6"
                data-oid="pf_iq78"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms analyze and understand your documents like a human would.",
  },
  {
    icon: MessageSquare,
    title: "Interactive Chat",
    description:
      "Ask questions and get instant, context-aware answers from your documents.",
    badge: "Popular",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Find exactly what you need with context-aware keyword searching and highlighting.",
    badge: "New",
  },
  {
    icon: BookMarked,
    title: "Smart Summaries",
    description:
      "Get instant summaries of entire documents or specific sections.",
  },
  {
    icon: Share2,
    title: "Collaboration Tools",
    description:
      "Share documents and insights with team members, with granular access controls.",
  },
  {
    icon: History,
    title: "Version History",
    description:
      "Track changes and access previous versions of your documents.",
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamlessly connect with Google Drive, Dropbox, and OneDrive.",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Analyze documents and get insights in multiple languages.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Visualize document insights with powerful analytics tools.",
  },
];
