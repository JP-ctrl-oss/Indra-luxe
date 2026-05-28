import { NextRequest, NextResponse } from "next/server";
import { stripeServer } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "usd" } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const isPlaceholder = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder");

    if (isPlaceholder) {
      console.log("Stripe Mock Mode Active: Returning simulated clientSecret");
      return NextResponse.json({
        clientSecret: "mock_secret_placeholder_" + Math.random().toString(36).substr(2, 9),
        isMockMode: true,
      });
    }

    const paymentIntent = await stripeServer.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe error, falling back to simulated clientSecret:", error);
    return NextResponse.json({
      clientSecret: "mock_secret_placeholder_" + Math.random().toString(36).substr(2, 9),
      isMockMode: true,
    });
  }
}
