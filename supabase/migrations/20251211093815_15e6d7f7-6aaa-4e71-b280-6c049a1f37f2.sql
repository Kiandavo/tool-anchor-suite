-- Create a table for storing performance metrics history
CREATE TABLE public.performance_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('good', 'needs-improvement', 'poor')),
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert metrics (anonymous tracking)
CREATE POLICY "Anyone can insert performance metrics"
ON public.performance_metrics
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read aggregated metrics (for dashboard)
CREATE POLICY "Anyone can read performance metrics"
ON public.performance_metrics
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_performance_metrics_created_at ON public.performance_metrics(created_at DESC);
CREATE INDEX idx_performance_metrics_name ON public.performance_metrics(metric_name);

-- Create a function to get aggregated metrics for a time period
CREATE OR REPLACE FUNCTION get_performance_trends(
  p_metric_name TEXT,
  p_days INTEGER DEFAULT 7
)
RETURNS TABLE (
  period_start TIMESTAMP WITH TIME ZONE,
  avg_value NUMERIC,
  min_value NUMERIC,
  max_value NUMERIC,
  sample_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    date_trunc('hour', created_at) as period_start,
    ROUND(AVG(metric_value)::numeric, 2) as avg_value,
    ROUND(MIN(metric_value)::numeric, 2) as min_value,
    ROUND(MAX(metric_value)::numeric, 2) as max_value,
    COUNT(*) as sample_count
  FROM public.performance_metrics
  WHERE metric_name = p_metric_name
    AND created_at >= NOW() - (p_days || ' days')::INTERVAL
  GROUP BY date_trunc('hour', created_at)
  ORDER BY period_start DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;