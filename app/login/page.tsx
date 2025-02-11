"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Brain } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });

      router.push("/dashboard");
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
    <div
      className="min-h-screen flex items-center justify-center bg-muted/50"
      data-oid="5:2ycn5"
    >
      <div className="w-full max-w-md" data-oid="w8q_br1">
        <div className="bg-card p-8 rounded-lg shadow-lg" data-oid="hywvxo.">
          <div
            className="flex items-center justify-center mb-8"
            data-oid="266d3f9"
          >
            <Brain className="h-8 w-8 mr-2" data-oid="xy-2_7u" />
            <h1 className="text-2xl font-bold" data-oid="pjv2cxb">
              DocuMind AI
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" data-oid="7_x-9-7">
            <div data-oid="to62wal">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-oid="0707du5"
              />
            </div>
            <div data-oid="lmwr954">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-oid="km5p0h-"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-oid="cqio81f"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm" data-oid="hx4gybc">
            <p className="text-muted-foreground" data-oid="eoz0a-5">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline"
                data-oid="eo5bo8b"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
