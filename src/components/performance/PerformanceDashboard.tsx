import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, Eye, Clock, Layout, RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceComparison } from './PerformanceComparison';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  target: number;
  unit: string;
  icon: React.ReactNode;
  description: string;
}

interface TrendData {
  period_start: string;
  avg_value: number;
  min_value: number;
  max_value: number;
  sample_count: number;
}

const getMetricRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    INP: [200, 500],
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  };

  const [good, poor] = thresholds[name] || [0, 0];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
};

const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
  switch (rating) {
    case 'good': return 'bg-green-500/20 text-green-600 border-green-500/30';
    case 'needs-improvement': return 'bg-amber-500/20 text-amber-600 border-amber-500/30';
    case 'poor': return 'bg-red-500/20 text-red-600 border-red-500/30';
  }
};

const getRatingLabel = (rating: 'good' | 'needs-improvement' | 'poor') => {
  switch (rating) {
    case 'good': return 'عالی';
    case 'needs-improvement': return 'نیاز به بهبود';
    case 'poor': return 'ضعیف';
  }
};

const getProgressColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
  switch (rating) {
    case 'good': return 'bg-green-500';
    case 'needs-improvement': return 'bg-amber-500';
    case 'poor': return 'bg-red-500';
  }
};

const getChartColor = (metricName: string) => {
  const colors: Record<string, string> = {
    LCP: '#22c55e',
    FCP: '#eab308',
    CLS: '#3b82f6',
    TTFB: '#8b5cf6',
    INP: '#f97316',
  };
  return colors[metricName] || '#6b7280';
};

export const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [navigationTiming, setNavigationTiming] = useState<Record<string, number>>({});
  const [trends, setTrends] = useState<Record<string, TrendData[]>>({});
  const [selectedMetric, setSelectedMetric] = useState<string>('LCP');
  const [timeRange, setTimeRange] = useState<number>(7);

  const saveMetricToDb = async (name: string, value: number, rating: string) => {
    try {
      await supabase.from('performance_metrics').insert({
        metric_name: name,
        metric_value: value,
        rating: rating,
        page_url: window.location.href,
        user_agent: navigator.userAgent.substring(0, 200)
      });
    } catch (error) {
      console.error('Failed to save metric:', error);
    }
  };

  const fetchTrends = async (metricName: string, days: number = 7) => {
    try {
      const { data, error } = await supabase.rpc('get_performance_trends', {
        p_metric_name: metricName,
        p_days: days
      });

      if (error) throw error;
      
      setTrends(prev => ({
        ...prev,
        [metricName]: (data || []).reverse()
      }));
    } catch (error) {
      console.error('Failed to fetch trends:', error);
    }
  };

  const collectMetrics = async () => {
    setIsLoading(true);
    
    try {
      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
      
      const collectedMetrics: WebVitalMetric[] = [];

      const addMetric = (name: string, value: number, target: number, unit: string, icon: React.ReactNode, description: string) => {
        const existingIndex = collectedMetrics.findIndex(m => m.name === name);
        const rating = getMetricRating(name, value);
        const metric: WebVitalMetric = {
          name,
          value,
          rating,
          target,
          unit,
          icon,
          description
        };
        
        if (existingIndex >= 0) {
          collectedMetrics[existingIndex] = metric;
        } else {
          collectedMetrics.push(metric);
        }
        
        setMetrics([...collectedMetrics]);
        
        // Save to database
        saveMetricToDb(name, value, rating);
        
        // Fetch trends for this metric
        fetchTrends(name, timeRange);
      };

      onLCP((metric) => {
        addMetric('LCP', metric.value, 2500, 'ms', <Eye className="w-5 h-5" />, 'Largest Contentful Paint - زمان نمایش بزرگترین محتوا');
      });

      onFCP((metric) => {
        addMetric('FCP', metric.value, 1800, 'ms', <Zap className="w-5 h-5" />, 'First Contentful Paint - زمان نمایش اولین محتوا');
      });

      onCLS((metric) => {
        addMetric('CLS', metric.value, 0.1, '', <Layout className="w-5 h-5" />, 'Cumulative Layout Shift - میزان جابجایی چیدمان');
      });

      onTTFB((metric) => {
        addMetric('TTFB', metric.value, 800, 'ms', <Clock className="w-5 h-5" />, 'Time to First Byte - زمان دریافت اولین بایت');
      });

      onINP((metric) => {
        addMetric('INP', metric.value, 200, 'ms', <Activity className="w-5 h-5" />, 'Interaction to Next Paint - تعامل تا رندر بعدی');
      });

      // Get navigation timing
      if (performance.getEntriesByType) {
        const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navEntries.length > 0) {
          const nav = navEntries[0];
          setNavigationTiming({
            'DNS Lookup': nav.domainLookupEnd - nav.domainLookupStart,
            'TCP Connection': nav.connectEnd - nav.connectStart,
            'Request Time': nav.responseStart - nav.requestStart,
            'Response Time': nav.responseEnd - nav.responseStart,
            'DOM Processing': nav.domComplete - nav.domInteractive,
            'Total Load': nav.loadEventEnd - nav.fetchStart,
          });
        }
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to collect metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    collectMetrics();
  }, []);

  useEffect(() => {
    // Fetch trends for selected metric when time range changes
    if (selectedMetric) {
      fetchTrends(selectedMetric, timeRange);
    }
  }, [timeRange, selectedMetric]);

  const overallScore = metrics.length > 0 
    ? Math.round((metrics.filter(m => m.rating === 'good').length / metrics.length) * 100)
    : 0;

  const getOverallRating = () => {
    if (overallScore >= 80) return 'good';
    if (overallScore >= 50) return 'needs-improvement';
    return 'poor';
  };

  const getTrendIndicator = (metricName: string) => {
    const trendData = trends[metricName];
    if (!trendData || trendData.length < 2) return null;
    
    const recent = trendData[trendData.length - 1]?.avg_value || 0;
    const previous = trendData[Math.max(0, trendData.length - 2)]?.avg_value || 0;
    
    if (recent < previous * 0.95) {
      return { icon: <TrendingDown className="w-4 h-4 text-green-500" />, text: 'بهبود' };
    } else if (recent > previous * 1.05) {
      return { icon: <TrendingUp className="w-4 h-4 text-red-500" />, text: 'افت' };
    }
    return { icon: <Minus className="w-4 h-4 text-muted-foreground" />, text: 'ثابت' };
  };

  const formatChartDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">داشبورد عملکرد</h1>
          <p className="text-muted-foreground text-sm mt-1">
            نظارت بر Core Web Vitals و معیارهای کلیدی عملکرد
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              آخرین بروزرسانی: {lastUpdated.toLocaleTimeString('fa-IR')}
            </span>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={collectMetrics}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
            بروزرسانی
          </Button>
        </div>
      </div>

      {/* Overall Score Card */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className={
                    overallScore >= 80 ? 'text-green-500' :
                    overallScore >= 50 ? 'text-amber-500' : 'text-red-500'
                  }
                  initial={{ strokeDasharray: '0 352' }}
                  animate={{ strokeDasharray: `${(overallScore / 100) * 352} 352` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{overallScore}</span>
                <span className="text-xs text-muted-foreground">امتیاز کلی</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-right">
              <Badge className={`${getRatingColor(getOverallRating())} mb-2`}>
                {getRatingLabel(getOverallRating())}
              </Badge>
              <h3 className="text-lg font-semibold text-foreground">وضعیت عملکرد سایت</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {metrics.filter(m => m.rating === 'good').length} از {metrics.length} معیار در وضعیت عالی
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Trends */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-lg">روند تاریخی عملکرد</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={timeRange === 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(1)}
              >
                ۲۴ ساعت
              </Button>
              <Button
                variant={timeRange === 7 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(7)}
              >
                ۷ روز
              </Button>
              <Button
                variant={timeRange === 30 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(30)}
              >
                ۳۰ روز
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
            <TabsList className="grid grid-cols-5 mb-4">
              {['LCP', 'FCP', 'CLS', 'TTFB', 'INP'].map(metric => (
                <TabsTrigger key={metric} value={metric} className="text-xs">
                  {metric}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {['LCP', 'FCP', 'CLS', 'TTFB', 'INP'].map(metric => (
              <TabsContent key={metric} value={metric}>
                {trends[metric] && trends[metric].length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trends[metric]}>
                        <defs>
                          <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={getChartColor(metric)} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={getChartColor(metric)} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="period_start" 
                          tickFormatter={formatChartDate}
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={10}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={10}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            direction: 'rtl'
                          }}
                          labelFormatter={(label) => `زمان: ${formatChartDate(label as string)}`}
                          formatter={(value: number) => [
                            metric === 'CLS' ? value.toFixed(3) : `${Math.round(value)}ms`,
                            'میانگین'
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="avg_value"
                          stroke={getChartColor(metric)}
                          fill={`url(#gradient-${metric})`}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <p>داده‌ای برای نمایش وجود ندارد</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <PerformanceComparison />

      {/* Core Web Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {metrics.map((metric, index) => {
            const trend = getTrendIndicator(metric.name);
            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getRatingColor(metric.rating)}`}>
                          {metric.icon}
                        </div>
                        <CardTitle className="text-base font-semibold">{metric.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {trend && (
                          <div className="flex items-center gap-1 text-xs">
                            {trend.icon}
                            <span className="text-muted-foreground">{trend.text}</span>
                          </div>
                        )}
                        <Badge variant="outline" className={getRatingColor(metric.rating)}>
                          {getRatingLabel(metric.rating)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-foreground">
                          {metric.name === 'CLS' ? metric.value.toFixed(3) : Math.round(metric.value)}
                        </span>
                        <span className="text-sm text-muted-foreground">{metric.unit}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>هدف: {metric.target}{metric.unit}</span>
                          <span>{Math.min(100, Math.round((metric.target / metric.value) * 100))}%</span>
                        </div>
                        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${getProgressColor(metric.rating)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (metric.target / metric.value) * 100)}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Timing Breakdown */}
      {Object.keys(navigationTiming).length > 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">جزئیات زمان بارگذاری</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(navigationTiming).map(([key, value]) => (
                <div key={key} className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-lg font-bold text-foreground">
                    {Math.round(value)}
                    <span className="text-xs text-muted-foreground mr-1">ms</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{key}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">پیشنهادات بهبود عملکرد</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {metrics.some(m => m.name === 'LCP' && m.rating !== 'good') && (
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                برای بهبود LCP: تصاویر را بهینه کنید و از lazy loading استفاده کنید
              </li>
            )}
            {metrics.some(m => m.name === 'CLS' && m.rating !== 'good') && (
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                برای بهبود CLS: ابعاد تصاویر را مشخص کنید و از فونت‌های محلی استفاده کنید
              </li>
            )}
            {metrics.some(m => m.name === 'INP' && m.rating !== 'good') && (
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                برای بهبود INP: عملیات سنگین را به Web Workers منتقل کنید
              </li>
            )}
            {metrics.every(m => m.rating === 'good') && (
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                عملکرد سایت شما عالی است! همه معیارها در وضعیت مطلوب هستند.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
