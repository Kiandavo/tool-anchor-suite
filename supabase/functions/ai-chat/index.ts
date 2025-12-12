import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting: Track requests per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Model mapping for UI-friendly names to actual API identifiers
const MODEL_MAPPING: Record<string, string> = {
  'deepseek-v3-base': 'deepseek/deepseek-v3-0324:free',
  'deepseek-r1': 'tngtech/deepseek-r1t-chimera:free',
  'google-gemini-flash': 'google/gemini-2.0-flash-exp:free',
  'llama4-maverick': 'meta-llama/llama-4-maverick:free'
};

// Validate and sanitize input
function sanitizeMessage(content: string): string {
  if (typeof content !== 'string') return '';
  return content
    .trim()
    .slice(0, 10000) // Limit message length
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

function validateApiKey(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') return false;
  if (!apiKey.startsWith('sk-or-v1-')) return false;
  if (apiKey.length < 20 || apiKey.length > 500) return false;
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'محدودیت درخواست‌ها. لطفا کمی صبر کنید.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { messages, model, temperature, apiKey } = body;

    // Validate API key
    if (!validateApiKey(apiKey)) {
      console.log('Invalid API key format');
      return new Response(
        JSON.stringify({ error: 'کلید API نامعتبر است' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'پیام‌ها نامعتبر هستند' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize and validate all messages
    const sanitizedMessages = messages.map(msg => ({
      role: msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system' ? msg.role : 'user',
      content: sanitizeMessage(msg.content)
    })).filter(msg => msg.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'پیام معتبری یافت نشد' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the correct model identifier
    const modelIdentifier = MODEL_MAPPING[model] || 'google/gemini-2.0-flash-exp:free';
    
    // Clamp temperature
    const safeTemperature = Math.max(0.1, Math.min(1.0, Number(temperature) || 0.7));

    console.log(`Processing AI chat request - Model: ${modelIdentifier}, Messages: ${sanitizedMessages.length}`);

    // Make request to OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://laangar.ir',
        'X-Title': 'Laangar Persian Text Tools'
      },
      body: JSON.stringify({
        model: modelIdentifier,
        messages: sanitizedMessages,
        temperature: safeTemperature,
        max_tokens: 2000,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenRouter API error: ${response.status} - ${errorText}`);
      
      if (response.status === 401) {
        return new Response(
          JSON.stringify({ error: 'خطا در احراز هویت API. لطفا کلید API خود را بررسی کنید.' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'محدودیت درخواست‌ها به API رسیده است. لطفا کمی صبر کنید.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'خطا در ارتباط با سرور API' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in API response:', data);
      return new Response(
        JSON.stringify({ error: 'پاسخی از API دریافت نشد' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully processed AI chat request');

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'خطای ناشناخته' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});