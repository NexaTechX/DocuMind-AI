"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ShareDocumentProps {
  documentId: string;
}

export function ShareDocument({ documentId }: ShareDocumentProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    if (!email) return;
    setLoading(true);

    try {
      // Get the user by email
      const { data: users, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (userError) throw new Error("User not found");

      // Create a document share record
      const { error: shareError } = await supabase
        .from("document_shares")
        .insert([
          {
            document_id: documentId,
            shared_with: users.id,
          },
        ]);

      if (shareError) throw shareError;

      toast({
        title: "Success",
        description: "Document shared successfully",
      });

      setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            onClick={handleShare}
            disabled={loading || !email}
            className="w-full"
          >
            {loading ? "Sharing..." : "Share Document"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
