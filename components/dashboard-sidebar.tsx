import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
  BarChart3,
  Brain,
  Clock,
  FileText,
  FileUp,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function DashboardSidebar() {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }, [router]);

  return (
    <div className="w-64 bg-black h-full p-4 flex flex-col">
      {" "}
      {/* Changed bg-gray-100 to bg-black */}
      <Link href="/" className="flex items-center space-x-2 mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">DocuMind AI</span>
      </Link>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/upload"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <FileUp className="h-4 w-4" />
              <span>Upload Document</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/documents"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/history"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <Clock className="h-4 w-4" />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/team"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <Users className="h-4 w-4" />
              <span>Team</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/analytics"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Button
        variant="ghost"
        className="mt-auto justify-start"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
