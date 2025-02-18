"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DocumentPage({ params }: { params: { id: string } }) {
  const [document, setDocument] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDocument = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching document:", error);
        return;
      }

      setDocument(data);
    };

    fetchDocument();
  }, [params.id]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">{document.title}</h1>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-8">
        <div className="bg-card p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">{document.title}</h2>
          <p className="text-muted-foreground">{document.content}</p>
        </div>
      </main>
    </div>
  );
}
