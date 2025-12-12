import React from 'react';
import { AlertCircle, Clock, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { getCategoryUrl } from '@/utils/internal-linking';

interface ToolNotImplementedProps {
  toolName?: string;
  category?: string;
  estimatedCompletion?: string;
}

export default function ToolNotImplemented({ 
  toolName = "این ابزار", 
  category = "",
  estimatedCompletion = "به زودی"
}: ToolNotImplementedProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
            <Clock className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-2xl text-amber-800 mb-2">
            {toolName} در حال توسعه است
          </CardTitle>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 mx-auto">
            <Sparkles className="mr-1" size={12} />
            {estimatedCompletion}
          </Badge>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="max-w-md mx-auto">
            <p className="text-amber-700 mb-4">
              ما در حال کار بر روی این ابزار هستیم تا بهترین تجربه را برای شما فراهم کنیم.
            </p>
            
            <div className="p-4 bg-amber-100/50 rounded-lg">
              <h3 className="font-medium text-amber-800 mb-2">چه انتظاری داشته باشید:</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• رابط کاربری زیبا و کاربردی</li>
                <li>• عملکرد سریع و دقیق</li>
                <li>• پشتیبانی کامل از زبان فارسی</li>
                <li>• قابلیت‌های پیشرفته و هوشمند</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link to="/">
                <ArrowLeft className="mr-2" size={16} />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
            
            {category && (
              <Button asChild variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-50">
                <Link to={getCategoryUrl(category)}>
                  مشاهده سایر ابزارهای {category}
                </Link>
              </Button>
            )}
          </div>

          <div className="mt-8 p-4 bg-white/60 rounded-lg border border-amber-200">
            <h3 className="font-medium text-amber-800 mb-2">📬 اطلاع از آپدیت‌ها</h3>
            <p className="text-sm text-amber-600">
              برای اطلاع از آماده شدن این ابزار، صفحه را در علاقه‌مندی‌های مرورگر خود ذخیره کنید.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
