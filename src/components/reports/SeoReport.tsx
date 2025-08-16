import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Search, Users, Clock } from 'lucide-react';
import { generateSeoReport, generateWebsiteImprovementReport } from '@/utils/seo-report';

interface SeoReportProps {
  toolName?: string;
  title?: string;
  description?: string;
  content?: string;
  keywords?: string[];
}

export const SeoReport: React.FC<SeoReportProps> = ({
  toolName = "وب‌سایت لنگر",
  title = "لنگر - ابزارهای آنلاین رایگان فارسی",
  description = "مجموعه کامل ابزارهای آنلاین رایگان فارسی",
  content = "محتوای نمونه برای تست",
  keywords = ["ابزار آنلاین", "لنگر", "رایگان", "فارسی"]
}) => {
  const seoAnalysis = generateSeoReport(title, description, content, keywords);
  const improvementReport = generateWebsiteImprovementReport();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            گزارش سئو - {toolName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SEO Score */}
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(seoAnalysis.score)} mb-2`}>
              {seoAnalysis.score}/100
            </div>
            <Progress value={seoAnalysis.score} className="w-full max-w-md mx-auto mb-2" />
            <Badge variant={getScoreBadgeVariant(seoAnalysis.score)}>
              {seoAnalysis.score >= 80 ? 'عالی' : seoAnalysis.score >= 60 ? 'خوب' : 'نیاز به بهبود'}
            </Badge>
          </div>

          {/* Content Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {seoAnalysis.contentAnalysis.titleLength}
              </div>
              <div className="text-sm text-muted-foreground">طول عنوان</div>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {seoAnalysis.contentAnalysis.descriptionLength}
              </div>
              <div className="text-sm text-muted-foreground">طول توضیحات</div>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {seoAnalysis.contentAnalysis.keywordDensity}%
              </div>
              <div className="text-sm text-muted-foreground">تراکم کلیدواژه</div>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {seoAnalysis.contentAnalysis.readabilityScore}
              </div>
              <div className="text-sm text-muted-foreground">خوانایی</div>
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              نقاط قوت
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {seoAnalysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          {seoAnalysis.weaknesses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                نقاط ضعف
              </h3>
              <div className="space-y-2">
                {seoAnalysis.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {seoAnalysis.recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                پیشنهادات بهبود
              </h3>
              <div className="space-y-2">
                {seoAnalysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Website Improvement Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            گزارش وضعیت کلی وب‌سایت
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <div className="text-xl font-bold text-primary mb-1">
                {improvementReport.currentStatus.totalTools}
              </div>
              <div className="text-xs text-muted-foreground">کل ابزارها</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600 mb-1">
                {improvementReport.currentStatus.implementedTools}
              </div>
              <div className="text-xs text-muted-foreground">پیاده‌سازی شده</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600 mb-1">
                {improvementReport.currentStatus.seoOptimized}
              </div>
              <div className="text-xs text-muted-foreground">سئو شده</div>
            </div>
            
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600 mb-1">
                {improvementReport.currentStatus.avgPageSpeed}
              </div>
              <div className="text-xs text-muted-foreground">سرعت صفحه</div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600 mb-1">
                {improvementReport.currentStatus.mobileCompatibility}%
              </div>
              <div className="text-xs text-muted-foreground">موبایل</div>
            </div>
          </div>

          {/* Priorities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">اولویت‌های بهبود</h3>
            <div className="space-y-3">
              {improvementReport.priorities.map((priority, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{priority.title}</h4>
                    <Badge variant={
                      priority.priority === 'بالا' ? 'destructive' :
                      priority.priority === 'متوسط' ? 'secondary' : 'outline'
                    }>
                      {priority.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {priority.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-600">تأثیر: {priority.impact}</span>
                    <span className="text-blue-600">تلاش: {priority.effort}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins */}
          <div>
            <h3 className="text-lg font-semibold mb-3">بهبودهای سریع</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {improvementReport.quickWins.map((win, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{win}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};