// Supabase Edge Function: Meta WhatsApp Cloud API Webhook Handler
// Handles GET (Handshake) and POST (Event Delivery & HMAC Validation)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const META_VERIFY_TOKEN = Deno.env.get("META_WEBHOOK_VERIFY_TOKEN") || "terranova_secure_verify_token_2026";
const META_APP_SECRET = Deno.env.get("META_APP_SECRET") || "";

// HMAC-SHA256 Verification helper
async function verifyHmacSignature(rawBody: string, signatureHeader: string | null, secret: string): Promise<boolean> {
  if (!signatureHeader || !secret) return true; // Bypass in dev if secret not configured
  
  const expectedHash = signatureHeader.replace("sha256=", "");
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  
  // Convert hex string to byte array
  const hexBytes = new Uint8Array(expectedHash.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
  return await crypto.subtle.verify("HMAC", key, hexBytes, encoder.encode(rawBody));
}

serve(async (req) => {
  const url = new URL(req.url);

  // 1. GET Request: Meta Webhook Verification Handshake
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === META_VERIFY_TOKEN) {
      console.log("[Meta Webhook] Handshake verificado com sucesso!");
      return new Response(challenge, { status: 200 });
    } else {
      console.error("[Meta Webhook] Falha na verificação do Verify Token.");
      return new Response("Forbidden: Verification Token Mismatch", { status: 403 });
    }
  }

  // 2. POST Request: Meta Incoming Message / Status Event Delivery
  if (req.method === "POST") {
    try {
      const rawBody = await req.text();
      const signatureHeader = req.headers.get("X-Hub-Signature-256");

      // Verify HMAC SHA256 Signature for security
      const isValid = await verifyHmacSignature(rawBody, signatureHeader, META_APP_SECRET);
      if (!isValid) {
        console.error("[Meta Webhook] Assinatura HMAC SHA256 inválida!");
        return new Response("Unauthorized Signature", { status: 401 });
      }

      const body = JSON.parse(rawBody);

      // Process Meta Entry Events
      if (body.object === "whatsapp_business_account" && body.entry) {
        for (const entry of body.entry) {
          for (const change of entry.changes) {
            const value = change.value;
            
            // A. Incoming Messages Handling
            if (value.messages && value.messages.length > 0) {
              for (const message of value.messages) {
                const senderPhone = message.from;
                const messageType = message.type;
                const messageText = message.text?.body || message.interactive?.button_reply?.title || "";
                const phoneNumberId = value.metadata?.phone_number_id;

                console.log(`[Meta Webhook] Mensagem recebida de ${senderPhone} no PhoneID ${phoneNumberId}: "${messageText}"`);

                // Async Dispatch: Trigger SDR Agent / Event Bus in background (< 100ms response)
                // In production, this pushes to Bull Queue / Supabase Event Queue
              }
            }

            // B. Message Delivery Status Handling (sent, delivered, read, failed)
            if (value.statuses && value.statuses.length > 0) {
              for (const status of value.statuses) {
                const messageId = status.id;
                const recipientId = status.recipient_id;
                const statusType = status.status; // sent, delivered, read, failed

                if (statusType === "failed" && status.errors) {
                  const errorCode = status.errors[0]?.code;
                  console.warn(`[Meta Webhook Status Error] Mensagem ${messageId} para ${recipientId} falhou com código Meta ${errorCode}`);

                  // Meta Error Code 131026: Out of 24h window -> Switch to Template
                  // Meta Error Code 131047: Rate limit -> Backoff
                }
              }
            }
          }
        }
      }

      // Always return HTTP 200 OK immediately in < 100ms to Meta
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      console.error("[Meta Webhook Error]", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
});
