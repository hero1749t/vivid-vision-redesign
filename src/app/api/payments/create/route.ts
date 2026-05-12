import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { stripe, isStripeConfigured } from "@/lib/stripe";

const paymentIntentSchema = z.object({
  enrollmentId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default("usd"),
  email: z.string().email(),
  name: z.string(),
  courseName: z.string(),
  paymentType: z.enum(["deposit", "full"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = paymentIntentSchema.parse(body);

    // If Stripe is not configured, return demo response
    if (!isStripeConfigured()) {
      return NextResponse.json({
        success: true,
        demo: true,
        clientSecret: "demo_secret_" + Date.now(),
        message: "Demo mode - Stripe not configured",
      });
    }

    // Create or get customer
    const customers = await stripe.customers.list({ email: data.email, limit: 1 });
    let customer = customers.data[0];

    if (!customer) {
      customer = await stripe.customers.create({
        email: data.email,
        name: data.name,
        metadata: {
          source: "baliyttc",
        },
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100),
      currency: data.currency.toLowerCase(),
      customer: customer.id,
      metadata: {
        enrollmentId: data.enrollmentId || "",
        courseName: data.courseName,
        paymentType: data.paymentType,
        email: data.email,
        name: data.name,
      },
      automatic_payment_methods: {
        enabled: true,
      },
      description: `${data.paymentType === "deposit" ? "Deposit" : "Full Payment"} for ${data.courseName}`,
    });

    // Create payment record
    if (data.enrollmentId) {
      await prisma.payment.create({
        data: {
          enrollmentId: data.enrollmentId,
          amount: data.amount,
          currency: data.currency.toUpperCase(),
          stripePaymentIntentId: paymentIntent.id,
          status: "PENDING",
        },
      });
    }

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Payment intent error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
