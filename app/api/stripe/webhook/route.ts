import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature")!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const { userId, plan } = event.data.object.metadata;

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutComplete(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionCancel(userId);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}

async function handleCheckoutComplete(session: any) {
  const { userId, plan } = session.metadata;
  
  await supabase
    .from("profiles")
    .update({
      subscription_tier: plan,
      subscription_status: "active",
      stripe_subscription_id: session.subscription,
      document_quota: plan === "pro" ? -1 : plan === "enterprise" ? -1 : 5,
    })
    .eq("id", userId);
}

async function handleSubscriptionUpdate(subscription: any) {
  const { userId } = subscription.metadata;
  
  await supabase
    .from("profiles")
    .update({
      subscription_status: subscription.status,
      subscription_period_start: new Date(subscription.current_period_start * 1000),
      subscription_period_end: new Date(subscription.current_period_end * 1000),
    })
    .eq("id", userId);
}

async function handleSubscriptionCancel(userId: string) {
  await supabase
    .from("profiles")
    .update({
      subscription_tier: "free",
      subscription_status: "inactive",
      stripe_subscription_id: null,
      document_quota: 5,
    })
    .eq("id", userId);
}