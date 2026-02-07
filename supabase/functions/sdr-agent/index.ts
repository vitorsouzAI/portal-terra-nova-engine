import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { propertyId, strategy, prompt } = await req.json();

    // Initialize OpenAI API call for SDR Agent
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    // SDR Agent System Prompt
    const systemPrompt = `You are a professional Sales Development Representative (SDR) Agent for Portal Terra Nova.
Your task is to analyze rural properties and generate personalized sales outreach messages.
Always maintain a professional tone and focus on the property's unique value proposition.

Strategy: ${strategy || "consultative"}`;

    // Call OpenAI GPT-4o
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        propertyId,
        strategy,
        response: data.choices[0].message.content,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
