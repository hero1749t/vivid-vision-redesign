import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_demo", {
  apiVersion: "2025-02-24.acacia",
});

export const isStripeConfigured = () => {
  return !!(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_SECRET_KEY !== "sk_test_demo" &&
    process.env.STRIPE_SECRET_KEY.startsWith("sk_")
  );
};

export const isStripeTestMode = () => {
  return process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") || !isStripeConfigured();
};

export const isStripeLiveMode = () => {
  return process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_");
};

// Helper to get frontend publishable key
export const getPublishableKey = () => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
};

// Price calculation helpers
export interface PriceCalculation {
  basePrice: number;
  accommodationUpgrade: number;
  couponDiscount: number;
  finalPrice: number;
  depositAmount: number;
  remainingAmount: number;
}

export function calculatePrice(params: {
  coursePrice: number;
  accommodationPrice?: number;
  couponDiscount?: number;
  paymentType: "deposit" | "full";
}): PriceCalculation {
  const { coursePrice, accommodationPrice = 0, couponDiscount = 0, paymentType } = params;

  const totalBeforeDiscount = coursePrice + accommodationPrice;
  const discountAmount = Math.round(totalBeforeDiscount * (couponDiscount / 100));
  const finalPrice = Math.max(0, totalBeforeDiscount - discountAmount);

  // Deposit is always 200 USD or 20% whichever is higher
  const depositAmount = Math.max(200, Math.round(finalPrice * 0.2));
  const remainingAmount = finalPrice - depositAmount;

  return {
    basePrice: coursePrice,
    accommodationUpgrade: accommodationPrice,
    couponDiscount: discountAmount,
    finalPrice,
    depositAmount,
    remainingAmount,
  };
}

// Currency formatting
export const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function formatCurrency(amount: number, currency = "USD"): string {
  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${amount.toLocaleString()}`;
}

// Create checkout session for frontend
export async function createCheckoutSession(params: {
  enrollmentId: string;
  amount: number;
  currency?: string;
  customerEmail: string;
  courseName: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!isStripeConfigured()) {
    return { url: null, demo: true };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: params.currency?.toLowerCase() || "usd",
          product_data: {
            name: `Enrollment: ${params.courseName}`,
            description: "Yoga Teacher Training Deposit",
          },
          unit_amount: Math.round(params.amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: params.customerEmail,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      enrollmentId: params.enrollmentId,
      courseName: params.courseName,
    },
  });

  return { url: session.url, sessionId: session.id, demo: false };
}

// Refund helper
export async function refundPayment(paymentIntentId: string, amount?: number) {
  if (!isStripeConfigured()) {
    return { success: true, demo: true };
  }

  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? Math.round(amount * 100) : undefined,
  });

  return { success: true, refundId: refund.id };
}
