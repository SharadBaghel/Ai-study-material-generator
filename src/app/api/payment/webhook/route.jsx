import { NextResponse } from "next/server";
import Stripe from "stripe";
import {db} from "@/configs/db";
import {USER_TABLE} from "@/configs/schema";
import { eq } from "drizzle-orm";

// Handle POST requests
export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Webhook secret key for signature validation
  const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;

  // Retrieve the raw body to verify webhook signature
  const rawBody = await req.text();

  let event;
  let data;
  let eventType;

  // If webhook secret exists, verify the signature
  if (webhookSecret) {
    const signature = req.headers.get('stripe-signature');

    try {
      // Construct the event using Stripe's webhook signature verification
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      data = event.data;
      eventType = event.type;
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
    }
  } else {
    // In case the webhook secret isn't configured, use the raw body directly (use this cautiously in production)
    data = JSON.parse(rawBody).data;
    eventType = JSON.parse(rawBody).type;
  }

  // Handle different event types
  switch (eventType) {
    case 'checkout.session.completed':
      // Payment successful, provision the subscription
      try {
        const result = await db.update(USER_TABLE)
          .set({ isMember: true })
          .where(eq(USER_TABLE.email, data.customer_details.email));

        console.log("Subscription provisioned:", result);
      } catch (error) {
        console.error("Error updating user in the database:", error);
        return NextResponse.json({ error: 'Failed to update subscription status.' }, { status: 500 });
      }
      break;

    case 'invoice.paid':
      // Continue provisioning the subscription on payment success
      break;

    case 'invoice.payment_failed':
      // Notify customer about failed payment
      break;

    default:
      console.log(`Unhandled event type: ${eventType}`);
  }

  // Respond with success
  return NextResponse.json({ result: 'Success' });
}
