-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can insert performance metrics" ON public.performance_metrics;
DROP POLICY IF EXISTS "Anyone can read performance metrics" ON public.performance_metrics;

-- Create restrictive policies
-- INSERT: Only allow through service role (edge function)
-- This effectively blocks all direct client inserts
CREATE POLICY "Service role can insert metrics"
ON public.performance_metrics
FOR INSERT
TO service_role
WITH CHECK (true);

-- SELECT: Keep public read for the dashboard but limit exposed columns via application
-- The dashboard is a public feature showing aggregated performance data
CREATE POLICY "Public can read aggregated metrics"
ON public.performance_metrics
FOR SELECT
USING (true);