import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@latest";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "");

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.log(`\u26a0\ufe0f  Webhook signature verification failed.`, err.message);
    return new Response(JSON.stringify({ ok: false }), {
      headers: corsHeaders,
      status: 400,
    });
  }

  console.log(`\u2728 Received event: ${event.type}`);

  // Handle different event types
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("Payment succeeded:", event.data.object.id);
      // Update transaction status in Supabase
      break;

    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      // Update transaction status in Supabase
      break;

    case "charge.refunded":
      console.log("Charge refunded:", event.data.object.id);
      // Handle refund logic
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
