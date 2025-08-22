import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Eye, 
  Lightbulb,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrossReadingInsight } from '@/types/reading-types';
import { generateCrossReadingInsights } from '@/utils/cross-reading-insights';
import { getReadingHistory } from '@/utils/reading-storage';

export const CrossReadingInsights: React.FC = () => {
  const [insights, setInsights] = useState<CrossReadingInsight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<CrossReadingInsight | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      setIsLoading(true);
      
      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const readings = getReadingHistory();
      const generatedInsights = generateCrossReadingInsights(readings);
      setInsights(generatedInsights);
      setIsLoading(false);
    };

    loadInsights();
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-blue-600 bg-blue-100';
    if (confidence >= 0.4) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'قطعیت بالا';
    if (confidence >= 0.6) return 'قطعیت متوسط';
    if (confidence >= 0.4) return 'قطعیت پایین';
    return 'نامشخص';
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Brain className="w-16 h-16 text-indigo-600" />
          </motion.div>
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">
            در حال تحلیل الگوهای فال‌های شما...
          </h3>
          <p className="text-indigo-600">
            لطفاً صبر کنید تا بینش‌های عمیق آماده شود
          </p>
        </CardContent>
      </Card>
    );
  }

  if (insights.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200">
        <CardContent className="p-8 text-center">
          <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            بینش کافی موجود نیست
          </h3>
          <p className="text-gray-600 mb-4">
            برای تولید بینش‌های عمیق، حداقل 5 فال مختلف لازم است
          </p>
          <Button variant="outline" className="border-gray-300">
            <Sparkles className="w-4 h-4 ml-2" />
            فال جدید بگیرید
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            بینش‌های عمیق فال‌گیری
          </CardTitle>
          <p className="text-purple-100">
            تحلیل هوشمند الگوها و روندهای فال‌های شما
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        <AnimatePresence>
          {insights.map((insight, index) => (
            <motion.div
              key={insight.pattern}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-indigo-400">
                <CardContent 
                  className="p-5"
                  onClick={() => setSelectedInsight(
                    selectedInsight?.pattern === insight.pattern ? null : insight
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-gray-800">
                          {insight.pattern}
                        </h3>
                        <Badge className={`text-xs px-2 py-1 ${getConfidenceColor(insight.confidence)}`}>
                          {getConfidenceText(insight.confidence)}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {insight.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>مرتبط با {insight.relatedReadings.length} فال</span>
                        <span>•</span>
                        <span>{Math.round(insight.confidence * 100)}% اطمینان</span>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: selectedInsight?.pattern === insight.pattern ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedInsight?.pattern === insight.pattern && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-yellow-500" />
                              پیشنهادات
                            </h4>
                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                              <p className="text-yellow-800 text-sm">
                                {getRecommendation(insight.pattern)}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">
                              فال‌های مرتبط ({insight.relatedReadings.length})
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {insight.relatedReadings.map((readingId, idx) => (
                                <span
                                  key={readingId}
                                  className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded"
                                >
                                  فال #{idx + 1}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const getRecommendation = (pattern: string): string => {
  const recommendations: Record<string, string> = {
    'تمرکز بر روابط عاطفی': 'در این دوره، توجه بیشتری به روابط شخصی و عاطفی خود داشته باشید. زمان مناسبی برای بهبود ارتباطات و ابراز احساسات است.',
    'توجه به مسیر شغلی': 'فرصت‌های شغلی جدیدی در راه است. آماده باشید و از تصمیم‌گیری‌های مهم نترسید.',
    'الگوی روزانه فال‌گیری': 'علاقه شما به فال‌گیری نشان‌دهنده جستجوی راهنمایی است. سعی کنید بینش‌ها را در زندگی عملی به کار ببرید.',
    'دقت بالای فال‌ها': 'فال‌های شما معمولاً دقیق هستند. به شهود درونی خود اعتماد داشته باشید و از راهنمایی‌های دریافتی استفاده کنید.'
  };

  // Find matching pattern
  for (const [key, value] of Object.entries(recommendations)) {
    if (pattern.includes(key) || key.includes(pattern)) {
      return value;
    }
  }

  return 'بر اساس الگوی مشاهده شده، توصیه می‌شود به تغییرات جدید در زندگی خود آماده باشید و از فرصت‌های پیش رو بهره‌برداری کنید.';
};