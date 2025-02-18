"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { PLANS, PRICING } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { ArrowUpCircle, CreditCard, FileBox, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BillingPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        if (mounted) {
          setProfile(data);
          setLoading(false);
        }
      } catch (error: any) {
        if (mounted) {
          toast({
            title: "Error",
            description: "Failed to load profile",
            variant: "destructive",
          });
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [router, toast]);

  const handleManageSubscription = async () => {
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });
      const { url, error } = await response.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  const currentPlan =
    PRICING[profile?.subscription_tier as keyof typeof PLANS] || PRICING.free;
  const documentsUsed = profile?.documents_used || 0;
  const documentQuota = profile?.document_quota || 5;
  const isUnlimited = documentQuota === -1;
  const usagePercentage = isUnlimited
    ? 0
    : (documentsUsed / documentQuota) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Billing & Usage</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Current Plan */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">Current Plan</h2>
                <p className="text-muted-foreground">
                  {currentPlan.description}
                </p>
              </div>
              <Package className="h-6 w-6 text-primary" />
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">
                {currentPlan.name}
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ${currentPlan.price}/month
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {profile?.subscription_status === "active"
                  ? `Renews on ${new Date(profile?.subscription_period_end).toLocaleDateString()}`
                  : "No active subscription"}
              </p>
            </div>

            {profile?.subscription_tier === PLANS.FREE ? (
              <Link href="/pricing">
                <Button className="w-full">
                  <ArrowUpCircle className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </Link>
            ) : (
              <Button onClick={handleManageSubscription} className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Subscription
              </Button>
            )}
          </Card>

          {/* Usage Stats */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">Document Usage</h2>
                <p className="text-muted-foreground">
                  Track your document analysis usage
                </p>
              </div>
              <FileBox className="h-6 w-6 text-primary" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Documents Used</span>
                  <span className="text-sm text-muted-foreground">
                    {documentsUsed} /{" "}
                    {isUnlimited ? "Unlimited" : documentQuota}
                  </span>
                </div>
                {!isUnlimited && (
                  <Progress value={usagePercentage} className="h-2" />
                )}
              </div>

              {!isUnlimited && usagePercentage > 80 && (
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-3 rounded-md text-sm">
                  <p>
                    You&apos;re approaching your document limit. Consider
                    upgrading your plan for unlimited documents.
                  </p>
                </div>
              )}

              {profile?.subscription_tier === PLANS.FREE && (
                <Link href="/pricing">
                  <Button variant="outline" className="w-full mt-4">
                    Upgrade for Unlimited Documents
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
