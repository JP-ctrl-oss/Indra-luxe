import { NextRequest, NextResponse } from "next/server";
import { stripeServer } from "@/lib/stripe";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !endpointSecret) {
    return NextResponse.json(
      { error: "Missing signature or endpoint secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripeServer.webhooks.constructEvent(
      payload,
      sig,
      endpointSecret
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent was successful:", paymentIntent.id);
      // TODO: Update order status in database
      // await supabase.from("orders").update({ payment_status: "succeeded" }).eq("stripe_payment_intent_id", paymentIntent.id);
      break;

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log("Payment failed:", failedPayment.id);
      // TODO: Update order status
      break;

    case "charge.refunded":
      const refund = event.data.object as Stripe.Charge;
      console.log("Charge refunded:", refund.id);
      // TODO: Update order status to refunded
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
