"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { PRICING, PLANS } from "@/lib/stripe";
import { CreditCard, Package, FileBox, ArrowUpCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      <div className="min-h-screen bg-background p-8" data-oid="fp_lh6h">
        <div className="container mx-auto" data-oid=".j9r-iv">
          <h1 className="text-2xl font-bold mb-8" data-oid="1d1pjbo">
            Loading...
          </h1>
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
    <div className="min-h-screen bg-background" data-oid="dueg-i.">
      <div className="container mx-auto px-4 py-8" data-oid="v3mdhxu">
        <h1 className="text-2xl font-bold mb-8" data-oid="x.o63c4">
          Billing & Usage
        </h1>

        <div className="grid gap-8 md:grid-cols-2" data-oid="6t9za:9">
          {/* Current Plan */}
          <Card className="p-6" data-oid="twmn:58">
            <div
              className="flex items-start justify-between mb-4"
              data-oid="ribsqdi"
            >
              <div data-oid="idwd4n9">
                <h2 className="text-lg font-semibold mb-1" data-oid="4zdfgds">
                  Current Plan
                </h2>
                <p className="text-muted-foreground" data-oid="u5rs14q">
                  {currentPlan.description}
                </p>
              </div>
              <Package className="h-6 w-6 text-primary" data-oid="oik1dcx" />
            </div>

            <div className="mb-6" data-oid="-57897q">
              <div className="text-3xl font-bold mb-2" data-oid="2zhz.lo">
                {currentPlan.name}
                <span
                  className="text-base font-normal text-muted-foreground ml-2"
                  data-oid="elnk-vq"
                >
                  ${currentPlan.price}/month
                </span>
              </div>
              <p className="text-sm text-muted-foreground" data-oid="kh6_lnr">
                {profile?.subscription_status === "active"
                  ? `Renews on ${new Date(profile?.subscription_period_end).toLocaleDateString()}`
                  : "No active subscription"}
              </p>
            </div>

            {profile?.subscription_tier === PLANS.FREE ? (
              <Link href="/pricing" data-oid="jfgtibr">
                <Button className="w-full" data-oid="rgxeafd">
                  <ArrowUpCircle className="h-4 w-4 mr-2" data-oid="8egoz9k" />
                  Upgrade Plan
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleManageSubscription}
                className="w-full"
                data-oid="53supqr"
              >
                <CreditCard className="h-4 w-4 mr-2" data-oid="wxgm519" />
                Manage Subscription
              </Button>
            )}
          </Card>

          {/* Usage Stats */}
          <Card className="p-6" data-oid="fw49e6m">
            <div
              className="flex items-start justify-between mb-4"
              data-oid="fye6q-5"
            >
              <div data-oid="ea-z2nv">
                <h2 className="text-lg font-semibold mb-1" data-oid="fbp1of.">
                  Document Usage
                </h2>
                <p className="text-muted-foreground" data-oid="2x6k:wy">
                  Track your document analysis usage
                </p>
              </div>
              <FileBox className="h-6 w-6 text-primary" data-oid="bzazh0k" />
            </div>

            <div className="space-y-4" data-oid="se6ajk_">
              <div data-oid="m_j9ypg">
                <div className="flex justify-between mb-2" data-oid="655d324">
                  <span className="text-sm font-medium" data-oid="6nldv64">
                    Documents Used
                  </span>
                  <span
                    className="text-sm text-muted-foreground"
                    data-oid="c0waiy9"
                  >
                    {documentsUsed} /{" "}
                    {isUnlimited ? "Unlimited" : documentQuota}
                  </span>
                </div>
                {!isUnlimited && (
                  <Progress
                    value={usagePercentage}
                    className="h-2"
                    data-oid="r6tepbc"
                  />
                )}
              </div>

              {!isUnlimited && usagePercentage > 80 && (
                <div
                  className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-3 rounded-md text-sm"
                  data-oid="vm0:_y0"
                >
                  You're approaching your document limit. Consider upgrading
                  your plan for unlimited documents.
                </div>
              )}

              {profile?.subscription_tier === PLANS.FREE && (
                <Link href="/pricing" data-oid="q8ht8hg">
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    data-oid="xopnqgr"
                  >
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
