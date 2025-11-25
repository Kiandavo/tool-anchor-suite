import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useHoroscopeForecasts, type ForecastData } from '@/hooks/useHoroscopeForecasts';
import { motion } from 'framer-motion';
import { Star, Heart, Briefcase, Activity, DollarSign, Sparkles, Calendar, RefreshCw, Share2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const HoroscopeForecasts = () => {
  const { sign: urlSign } = useParams();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedSign, setSelectedSign] = useState<ForecastData | null>(null);
  const { forecasts, isLoading, lastUpdated, refreshForecasts } = useHoroscopeForecasts(period);

  const periodLabels = {
    daily: 'امروز',
    weekly: 'این هفته',
    monthly: 'این ماه'
  };

  const handleSignClick = (forecast: ForecastData) => {
    setSelectedSign(forecast);
    navigate(`/horoscope-forecasts/${forecast.sign}/${period}`);
  };

  const handleShare = (forecast: ForecastData) => {
    const text = `طالع ${periodLabels[period]} برج ${forecast.signName}:\nنمره کلی: ${forecast.overallScore}/5\n\nببینید طالع شما چیست: ${window.location.origin}/horoscope-forecasts`;
    navigator.clipboard.writeText(text);
    toast.success('متن طالع کپی شد!');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'love': return <Heart className="w-4 h-4" />;
      case 'career': return <Briefcase className="w-4 h-4" />;
      case 'health': return <Activity className="w-4 h-4" />;
      case 'finance': return <DollarSign className="w-4 h-4" />;
      case 'general': return <Sparkles className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      love: 'عشق',
      career: 'شغل',
      health: 'سلامت',
      finance: 'مالی',
      general: 'عمومی'
    };
    return labels[category] || category;
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-blue-600';
    if (score >= 2.5) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <Layout>
      <EnhancedSeoHead
        pageType="tool"
        title={`طالع روزانه، هفتگی و ماهانه همه بروج ۲۰۲۵ | پیش‌بینی کامل`}
        description="طالع دقیق و کامل روزانه، هفتگی و ماهانه برای تمام ۱۲ برج. شامل عشق، کار، سلامت، مالی و پیش‌بینی‌های تخصصی"
        keywords="طالع روزانه, طالع هفتگی, طالع ماهانه, پیش‌بینی بروج, فال روزانه"
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            طالع همه بروج
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            پیش‌بینی دقیق و کامل برای تمام ۱۲ برج
          </p>
          
          {/* Period Tabs */}
          <Tabs value={period} onValueChange={(v) => setPeriod(v as any)} className="mb-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                امروز
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                این هفته
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                این ماه
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Refresh Button */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>آخرین بروزرسانی: {lastUpdated.toLocaleTimeString('fa-IR')}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshForecasts}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
              بروزرسانی
            </Button>
          </div>
        </motion.div>

        {/* Forecasts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse bg-muted/30 rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {forecasts.map((forecast, index) => (
              <motion.div
                key={forecast.sign}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleSignClick(forecast)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <span className="text-3xl">{forecast.icon}</span>
                          {forecast.signName}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {forecast.element}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className={getScoreColor(forecast.overallScore)}>
                        <Star className="w-3 h-3 ml-1 fill-current" />
                        {forecast.overallScore}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(forecast.categories).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1.5 p-2 bg-muted/30 rounded">
                          {getCategoryIcon(key)}
                          <span className="font-medium">{getCategoryLabel(key)}:</span>
                          <span className={getScoreColor(value.score)}>{value.score}</span>
                        </div>
                      ))}
                    </div>

                    {/* Lucky Colors */}
                    <div className="flex items-center gap-2 text-xs">
                      <Sparkles className="w-3 h-3" />
                      <span>رنگ شانس:</span>
                      <div className="flex gap-1">
                        {forecast.luckyColors.map((color, i) => (
                          <Badge key={i} variant="outline" className="text-[10px] py-0 px-1.5">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      مشاهده جزئیات کامل
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Detailed Forecast Dialog */}
        <Dialog open={!!selectedSign} onOpenChange={() => setSelectedSign(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedSign && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <span className="text-4xl">{selectedSign.icon}</span>
                    <div>
                      <div>طالع {periodLabels[period]} برج {selectedSign.signName}</div>
                      <div className="text-sm text-muted-foreground font-normal mt-1">
                        عنصر {selectedSign.element} • نمره کلی: {selectedSign.overallScore}/5
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Categories */}
                  {Object.entries(selectedSign.categories).map(([key, value]) => (
                    <Card key={key}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {getCategoryIcon(key)}
                          {getCategoryLabel(key)}
                          <Badge className={getScoreColor(value.score)}>
                            {value.score}/5
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm leading-relaxed">{value.text}</p>
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                          <p className="text-sm font-medium text-primary flex items-start gap-2">
                            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span><strong>توصیه:</strong> {value.advice}</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Lucky Elements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">عناصر شانس</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-sm">اعداد شانس:</h4>
                        <div className="flex gap-2">
                          {selectedSign.luckyNumbers.map((num, i) => (
                            <Badge key={i} variant="secondary" className="text-base">
                              {num}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-sm">رنگ‌های شانس:</h4>
                        <div className="flex gap-2">
                          {selectedSign.luckyColors.map((color, i) => (
                            <Badge key={i} variant="outline">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-sm">بروج سازگار:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSign.compatibleSigns.map((sign, i) => (
                            <Badge key={i} variant="secondary">
                              {sign}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Share Button */}
                  <Button
                    onClick={() => handleShare(selectedSign)}
                    className="w-full"
                    variant="outline"
                  >
                    <Share2 className="w-4 h-4 ml-2" />
                    اشتراک‌گذاری طالع
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default HoroscopeForecasts;
