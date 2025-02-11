import { Stripe } from 'stripe';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const PLANS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;

export const PRICING = {
  [PLANS.FREE]: {
    price: 0,
    name: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Upload up to 5 documents per month',
      'Basic document analysis',
      'Limited AI queries',
      'Standard support',
    ],
  },
  [PLANS.PRO]: {
    price: 19.99,
    name: 'Pro',
    description: 'For power users and professionals',
    features: [
      'Unlimited document uploads',
      'Advanced document analysis',
      'Unlimited AI queries',
      'Priority support',
      'Multi-document analysis',
    ],
    stripePriceId: 'price_H5ggYwtUq3f5J1',
  },
  [PLANS.ENTERPRISE]: {
    price: 49.99,
    name: 'Enterprise',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'Advanced analytics',
    ],
    stripePriceId: 'price_H5ggYwtUq3f5J2',
  },
} as const;