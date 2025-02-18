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
  { icon: History, label: "History", href: "/dashboard/analysis" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/billing" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-256 border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold">DocuMind AI</span>
        </div>
        {/* <div className="p-4">
          <Link href="/dashboard/upload">
            <Button className="w-full gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </Link>
        </div> */}
        <nav className="space-y-1 p-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="default" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
