"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Brain } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: data.user?.id, email, full_name: fullName }]);

      if (profileError) throw profileError;

      toast({
        title: "Account created!",
        description: "Welcome to DocuMind AI.",
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
      data-oid="0mfsm8j"
    >
      <div className="w-full max-w-md" data-oid="euwl6jb">
        <div className="bg-card p-8 rounded-lg shadow-lg" data-oid="h:9:aej">
          <div
            className="flex items-center justify-center mb-8"
            data-oid="rrgee3p"
          >
            <Brain className="h-8 w-8 mr-2" data-oid=":dfyjg." />
            <h1 className="text-2xl font-bold" data-oid=".h5k8l:">
              DocuMind AI
            </h1>
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-4"
            data-oid="9aa-s6x"
          >
            <div data-oid="nlrlvf0">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                data-oid="0h9zcbq"
              />
            </div>
            <div data-oid="kc9.beb">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-oid=".yqk7yb"
              />
            </div>
            <div data-oid="vuxz0xg">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-oid="omr20o1"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-oid="zz:qgxm"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm" data-oid="_a.evua">
            <p className="text-muted-foreground" data-oid=":vqjoe7">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline"
                data-oid="y4pp80t"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
