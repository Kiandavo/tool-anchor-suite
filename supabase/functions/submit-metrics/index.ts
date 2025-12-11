import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (entry.count >= RATE_LIMIT) {
    return true;
  }
  
  entry.count++;
  return false;
}

// Validate metric data
function validateMetric(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid data format' };
  }

  const metric = data as Record<string, unknown>;
  
  // Required fields
  if (typeof metric.metric_name !== 'string' || !metric.metric_name) {
    return { valid: false, error: 'metric_name is required' };
  }
  
  if (typeof metric.metric_value !== 'number' || isNaN(metric.metric_value)) {
    return { valid: false, error: 'metric_value must be a number' };
  }
  
  if (typeof metric.rating !== 'string' || !['good', 'needs-improvement', 'poor'].includes(metric.rating)) {
    return { valid: false, error: 'rating must be good, needs-improvement, or poor' };
  }
  
  // Valid metric names
  const validMetrics = ['LCP', 'FCP', 'CLS', 'TTFB', 'INP', 'FID'];
  if (!validMetrics.includes(metric.metric_name)) {
    return { valid: false, error: 'Invalid metric name' };
  }
  
  // Reasonable value bounds
  if (metric.metric_value < 0 || metric.metric_value > 100000) {
    return { valid: false, error: 'metric_value out of bounds' };
  }
  
  // Optional fields validation
  if (metric.page_url !== undefined && metric.page_url !== null) {
    if (typeof metric.page_url !== 'string' || metric.page_url.length > 500) {
      return { valid: false, error: 'page_url must be a string under 500 chars' };
    }
  }
  
  if (metric.user_agent !== undefined && metric.user_agent !== null) {
    if (typeof metric.user_agent !== 'string' || metric.user_agent.length > 300) {
      return { valid: false, error: 'user_agent must be a string under 300 chars' };
    }
  }
  
  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Rate limiting by IP
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    if (isRateLimited(clientIP)) {
      console.log(`Rate limited: ${clientIP}`);
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = validateMetric(body);
    
    if (!validation.valid) {
      console.log(`Validation failed: ${validation.error}`);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client with service role for bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Sanitize and insert
    const { error } = await supabase.from('performance_metrics').insert({
      metric_name: body.metric_name,
      metric_value: body.metric_value,
      rating: body.rating,
      page_url: body.page_url ? body.page_url.substring(0, 500) : null,
      user_agent: body.user_agent ? body.user_agent.substring(0, 200) : null,
    });

    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ error: 'Failed to save metric' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Metric saved: ${body.metric_name} = ${body.metric_value}`);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
