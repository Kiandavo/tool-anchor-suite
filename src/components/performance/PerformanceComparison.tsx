import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUp, ArrowDown, Minus, Calendar } from 'lucide-react';

interface ComparisonData {
  metric: string;
  period1: number;
  period2: number;
  change: number;
  changePercent: number;
}

interface PageMetrics {
  page_url: string;
  avg_lcp: number;
  avg_fcp: number;
  avg_cls: number;
  avg_ttfb: number;
  avg_inp: number;
  sample_count: number;
}

const METRIC_LABELS: Record<string, string> = {
  LCP: 'Largest Contentful Paint',
  FCP: 'First Contentful Paint',
  CLS: 'Cumulative Layout Shift',
  TTFB: 'Time to First Byte',
  INP: 'Interaction to Next Paint',
};

const METRIC_UNITS: Record<string, string> = {
  LCP: 'ms',
  FCP: 'ms',
  CLS: '',
  TTFB: 'ms',
  INP: 'ms',
};

export const PerformanceComparison: React.FC = () => {
  const [comparisonType, setComparisonType] = useState<'time' | 'page'>('time');
  const [period1, setPeriod1] = useState<string>('7');
  const [period2, setPeriod2] = useState<string>('14');
  const [selectedPage1, setSelectedPage1] = useState<string>('all');
  const [selectedPage2, setSelectedPage2] = useState<string>('all');
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [pageMetrics, setPageMetrics] = useState<PageMetrics[]>([]);
  const [availablePages, setAvailablePages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAvailablePages();
  }, []);

  useEffect(() => {
    if (comparisonType === 'time') {
      fetchTimeComparison();
    } else {
      fetchPageComparison();
    }
  }, [comparisonType, period1, period2, selectedPage1, selectedPage2]);

  const fetchAvailablePages = async () => {
    try {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('page_url')
        .not('page_url', 'is', null);

      if (error) throw error;

      const uniquePages = [...new Set(data?.map(d => d.page_url).filter(Boolean))] as string[];
      setAvailablePages(uniquePages);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    }
  };

  const fetchTimeComparison = async () => {
    setIsLoading(true);
    try {
      const metrics = ['LCP', 'FCP', 'CLS', 'TTFB', 'INP'];
      const comparisons: ComparisonData[] = [];

      for (const metric of metrics) {
        // Period 1 (more recent)
        const { data: data1 } = await supabase
          .from('performance_metrics')
          .select('metric_value')
          .eq('metric_name', metric)
          .gte('created_at', new Date(Date.now() - parseInt(period1) * 24 * 60 * 60 * 1000).toISOString());

        // Period 2 (older)
        const { data: data2 } = await supabase
          .from('performance_metrics')
          .select('metric_value')
          .eq('metric_name', metric)
          .gte('created_at', new Date(Date.now() - parseInt(period2) * 24 * 60 * 60 * 1000).toISOString())
          .lt('created_at', new Date(Date.now() - parseInt(period1) * 24 * 60 * 60 * 1000).toISOString());

        const avg1 = data1?.length ? data1.reduce((sum, d) => sum + Number(d.metric_value), 0) / data1.length : 0;
        const avg2 = data2?.length ? data2.reduce((sum, d) => sum + Number(d.metric_value), 0) / data2.length : 0;
        
        const change = avg1 - avg2;
        const changePercent = avg2 !== 0 ? ((avg1 - avg2) / avg2) * 100 : 0;

        comparisons.push({
          metric,
          period1: avg1,
          period2: avg2,
          change,
          changePercent
        });
      }

      setComparisonData(comparisons);
    } catch (error) {
      console.error('Failed to fetch comparison:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPageComparison = async () => {
    setIsLoading(true);
    try {
      const metrics = ['LCP', 'FCP', 'CLS', 'TTFB', 'INP'];
      const comparisons: ComparisonData[] = [];

      for (const metric of metrics) {
        let query1 = supabase
          .from('performance_metrics')
          .select('metric_value')
          .eq('metric_name', metric)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

        let query2 = supabase
          .from('performance_metrics')
          .select('metric_value')
          .eq('metric_name', metric)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

        if (selectedPage1 !== 'all') {
          query1 = query1.eq('page_url', selectedPage1);
        }
        if (selectedPage2 !== 'all') {
          query2 = query2.eq('page_url', selectedPage2);
        }

        const [{ data: data1 }, { data: data2 }] = await Promise.all([query1, query2]);

        const avg1 = data1?.length ? data1.reduce((sum, d) => sum + Number(d.metric_value), 0) / data1.length : 0;
        const avg2 = data2?.length ? data2.reduce((sum, d) => sum + Number(d.metric_value), 0) / data2.length : 0;
        
        const change = avg1 - avg2;
        const changePercent = avg2 !== 0 ? ((avg1 - avg2) / avg2) * 100 : 0;

        comparisons.push({
          metric,
          period1: avg1,
          period2: avg2,
          change,
          changePercent
        });
      }

      setComparisonData(comparisons);
    } catch (error) {
      console.error('Failed to fetch page comparison:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getChangeIndicator = (change: number, metric: string) => {
    // For performance metrics, lower is better (except CLS which is already small)
    const isImprovement = change < 0;
    
    if (Math.abs(change) < 0.01) {
      return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
    
    return isImprovement ? (
      <ArrowDown className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowUp className="w-4 h-4 text-red-500" />
    );
  };

  const formatValue = (value: number, metric: string) => {
    if (metric === 'CLS') return value.toFixed(3);
    return Math.round(value).toString();
  };

  const chartData = comparisonData.map(d => ({
    name: d.metric,
    [`${comparisonType === 'time' ? `${period1} روز اخیر` : selectedPage1 === 'all' ? 'همه صفحات' : 'صفحه ۱'}`]: d.period1,
    [`${comparisonType === 'time' ? `${period1}-${period2} روز قبل` : selectedPage2 === 'all' ? 'همه صفحات' : 'صفحه ۲'}`]: d.period2,
  }));

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-lg">مقایسه عملکرد</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={comparisonType} onValueChange={(v) => setComparisonType(v as 'time' | 'page')}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">مقایسه زمانی</SelectItem>
                <SelectItem value="page">مقایسه صفحات</SelectItem>
              </SelectContent>
            </Select>

            {comparisonType === 'time' ? (
              <>
                <Select value={period1} onValueChange={setPeriod1}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">۱ روز اخیر</SelectItem>
                    <SelectItem value="7">۷ روز اخیر</SelectItem>
                    <SelectItem value="14">۱۴ روز اخیر</SelectItem>
                    <SelectItem value="30">۳۰ روز اخیر</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">vs</span>
                <Select value={period2} onValueChange={setPeriod2}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">۷ روز قبل</SelectItem>
                    <SelectItem value="14">۱۴ روز قبل</SelectItem>
                    <SelectItem value="30">۳۰ روز قبل</SelectItem>
                    <SelectItem value="60">۶۰ روز قبل</SelectItem>
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
                <Select value={selectedPage1} onValueChange={setSelectedPage1}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="صفحه اول" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه صفحات</SelectItem>
                    {availablePages.map(page => (
                      <SelectItem key={page} value={page}>
                        {new URL(page).pathname || '/'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">vs</span>
                <Select value={selectedPage2} onValueChange={setSelectedPage2}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="صفحه دوم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه صفحات</SelectItem>
                    {availablePages.map(page => (
                      <SelectItem key={page} value={page}>
                        {new URL(page).pathname || '/'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : comparisonData.every(d => d.period1 === 0 && d.period2 === 0) ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>داده‌ای برای مقایسه وجود ندارد</p>
          </div>
        ) : (
          <>
            {/* Chart */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      direction: 'rtl'
                    }}
                  />
                  <Legend wrapperStyle={{ direction: 'rtl' }} />
                  <Bar 
                    dataKey={comparisonType === 'time' ? `${period1} روز اخیر` : selectedPage1 === 'all' ? 'همه صفحات' : 'صفحه ۱'} 
                    fill="#22c55e" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey={comparisonType === 'time' ? `${period1}-${period2} روز قبل` : selectedPage2 === 'all' ? 'همه صفحات' : 'صفحه ۲'} 
                    fill="#6b7280" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">معیار</th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                      {comparisonType === 'time' ? `${period1} روز اخیر` : 'مقدار ۱'}
                    </th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                      {comparisonType === 'time' ? `${period1}-${period2} روز قبل` : 'مقدار ۲'}
                    </th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">تغییر</th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">درصد</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.metric} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3 px-2">
                        <div>
                          <span className="font-medium">{row.metric}</span>
                          <p className="text-xs text-muted-foreground">{METRIC_LABELS[row.metric]}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono">
                        {formatValue(row.period1, row.metric)}{METRIC_UNITS[row.metric]}
                      </td>
                      <td className="py-3 px-2 font-mono">
                        {formatValue(row.period2, row.metric)}{METRIC_UNITS[row.metric]}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          {getChangeIndicator(row.change, row.metric)}
                          <span className="font-mono">
                            {row.change > 0 ? '+' : ''}{formatValue(row.change, row.metric)}{METRIC_UNITS[row.metric]}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge 
                          variant="outline" 
                          className={
                            Math.abs(row.changePercent) < 1 
                              ? 'bg-muted/20' 
                              : row.changePercent < 0 
                                ? 'bg-green-500/20 text-green-600 border-green-500/30' 
                                : 'bg-red-500/20 text-red-600 border-red-500/30'
                          }
                        >
                          {row.changePercent > 0 ? '+' : ''}{row.changePercent.toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
