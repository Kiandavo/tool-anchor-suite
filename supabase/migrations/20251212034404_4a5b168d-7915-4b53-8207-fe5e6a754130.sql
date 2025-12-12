-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Public can read aggregated metrics" ON public.performance_metrics;

-- Create a restrictive policy that blocks direct table access
-- The get_performance_trends() function uses SECURITY DEFINER so it bypasses RLS
CREATE POLICY "Block direct public access"
  ON public.performance_metrics
  FOR SELECT
  USING (false);

-- Add a comment explaining why this is secure
COMMENT ON POLICY "Block direct public access" ON public.performance_metrics IS 
  'Direct table access is blocked. Use get_performance_trends() function for aggregated metrics.';