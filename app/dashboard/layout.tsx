"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  FileText,
  Settings,
  LogOut,
  Upload,
  Layout,
  History,
  Users,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: Layout, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background" data-oid="0gibdi2">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card" data-oid="26hm7nz">
        <div
          className="flex h-16 items-center gap-2 border-b px-4"
          data-oid="w28rtl9"
        >
          <Brain className="h-6 w-6 text-primary" data-oid="av6tvqr" />
          <span className="font-semibold" data-oid="i5icvrf">
            DocuMind AI
          </span>
        </div>
        <div className="p-4" data-oid="wi4hcba">
          <Link href="/dashboard/upload" data-oid="-6wf40o">
            <Button className="w-full gap-2" data-oid="m8112be">
              <Upload className="h-4 w-4" data-oid="2d2ipzo" />
              Upload Document
            </Button>
          </Link>
        </div>
        <nav className="space-y-1 p-2" data-oid="u3enn3q">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              data-oid="5e5..8m"
            >
              <item.icon className="h-4 w-4" data-oid="nurajag" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto" data-oid=".s6q2np">
        <header
          className="flex h-16 items-center justify-between border-b px-6"
          data-oid="doijcf8"
        >
          <h1 className="text-xl font-semibold" data-oid="8gmm8_0">
            Dashboard
          </h1>
          <div className="flex items-center gap-4" data-oid="bm8kw0k">
            <Button variant="ghost" size="sm" data-oid="fn676f5">
              <LogOut className="h-4 w-4 mr-2" data-oid="9t4cl9." />
              Sign Out
            </Button>
          </div>
        </header>
        <div className="p-6" data-oid="94o98ki">
          {children}
        </div>
      </main>
    </div>
  );
}
