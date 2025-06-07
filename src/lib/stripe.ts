import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const STRIPE_CONFIG = {
  currency: 'usd',
  minimumPurchase: 500, // $5.00 in cents
  creditValueInCents: 1, // 1 credit = $0.01
  tiers: {
    basic: {
      name: 'Basic',
      markup: 0.4, // 40%
      maxCredits: 10000,
    },
    pro: {
      name: 'Pro',
      markup: 0.2, // 20%
      monthlyFee: 50, // $50/month
      maxCredits: 50000,
    },
    enterprise: {
      name: 'Enterprise',
      markup: 0.1, // 10%
      monthlyFee: 500, // $500/month
      maxCredits: 999999,
    },
  },
};

export const createCheckoutSession = async (
  userId: string,
  credits: number,
  tier: string = 'basic'
) => {
  const amountInCents = credits * STRIPE_CONFIG.creditValueInCents;
  
  if (amountInCents < STRIPE_CONFIG.minimumPurchase) {
    throw new Error(`Minimum purchase is $${STRIPE_CONFIG.minimumPurchase / 100}`);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: `${credits} Credits`,
            description: `Purchase ${credits} credits for Hi-API services`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/credits/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/credits`,
    metadata: {
      userId,
      credits: credits.toString(),
      tier,
    },
  });

  return session;
};

export const createPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/credits`,
  });

  return session;
};