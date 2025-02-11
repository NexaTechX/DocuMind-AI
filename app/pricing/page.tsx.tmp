"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { PRICING, PLANS } from "@/lib/stripe";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Show toast for Stripe checkout result
  useEffect(() => {
    if (searchParams?.get("success")) {
      toast({
        title: "Success!",
        description: "Your subscription has been activated.",
      });
    }
    if (searchParams?.get("canceled")) {
      toast({
        title: "Canceled",
        description: "Subscription was not completed.",
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const handleSubscribe = async (plan: keyof typeof PLANS) => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      if (plan === PLANS.FREE) {
        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_tier: PLANS.FREE,
            subscription_status: "active",
            document_quota: 5,
          })
          .eq("id", session.user.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "You're now on the Free plan",
        });

        router.push("/dashboard");
        return;
      }

      // For paid plans, redirect to Stripe checkout
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: PRICING[plan],
          userId: session.user.id,
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);

      // Redirect to Stripe Checkout
      window.location.href = url;
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
    <div className="min-h-screen bg-background" data-oid="7cemfyd">
      <header className="border-b" data-oid="kl1dk53">
        <div
          className="container mx-auto px-4 h-16 flex items-center"
          data-oid="vv7kd.b"
        >
          <h1 className="text-xl font-bold" data-oid="2soe-tm">
            Pricing Plans
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12" data-oid="ar4oepr">
        <div className="text-center mb-12" data-oid="oj7el5z">
          <h2 className="text-3xl font-bold mb-4" data-oid="e:h_nu-">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground" data-oid="vmn0wj-">
            Select the perfect plan for your document analysis needs
          </p>
        </div>

        <div
          className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
          data-oid="hrs6wwb"
        >
          {Object.entries(PRICING).map(([plan, details]) => (
            <div
              key={plan}
              className="border rounded-lg p-6 bg-card flex flex-col"
              data-oid="yz8o06b"
            >
              <div className="mb-6" data-oid="23400fz">
                <h3 className="text-2xl font-bold mb-2" data-oid="01y6n-y">
                  {details.name}
                </h3>
                <p className="text-muted-foreground mb-4" data-oid="w988h67">
                  {details.description}
                </p>
                <div className="text-3xl font-bold" data-oid="qszakd7">
                  ${details.price}
                  <span
                    className="text-base font-normal text-muted-foreground"
                    data-oid="xrs7.2l"
                  >
                    /month
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow" data-oid="mxzmqs5">
                {details.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center"
                    data-oid="vg30me3"
                  >
                    <Check
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                      data-oid="n0wi8l6"
                    />

                    <span data-oid="_ax_w3g">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan as keyof typeof PLANS)}
                disabled={loading}
                className="w-full"
                variant={plan === PLANS.PRO ? "default" : "outline"}
                data-oid="vlril0l"
              >
                {loading ? "Processing..." : `Get ${details.name}`}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
