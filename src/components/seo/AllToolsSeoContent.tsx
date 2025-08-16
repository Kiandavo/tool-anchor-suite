import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock, Users, Shield } from 'lucide-react';

interface AllToolsSeoContentProps {
  totalTools: number;
  categories: string[];
}

export const AllToolsSeoContent: React.FC<AllToolsSeoContentProps> = ({
  totalTools,
  categories
}) => {
  return (
    <div className="space-y-8 mt-12">
      {/* About Section */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            درباره مجموعه ابزارهای لنگر
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              لنگر بزرگترین مجموعه ابزارهای آنلاین رایگان فارسی است که با هدف ارائه خدمات مفید و کاربردی 
              به کاربران ایرانی طراحی شده است. ما بیش از {totalTools} ابزار مختلف در {categories.length} دسته‌بندی 
              ارائه می‌دهیم.
            </p>
            <p>
              تمام ابزارهای لنگر به صورت کاملاً رایگان، بدون نیاز به ثبت‌نام یا نصب برنامه در دسترس هستند. 
              ما به حفظ حریم خصوصی کاربران متعهد بوده و هیچ‌گونه اطلاعات شخصی جمع‌آوری نمی‌کنیم.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            ویژگی‌های منحصر به فرد لنگر
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">دسترسی ۲۴/۷</h4>
                <p className="text-sm text-muted-foreground">
                  تمام ابزارها در تمام ساعات شبانه‌روز قابل دسترسی هستند
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">پشتیبانی فارسی</h4>
                <p className="text-sm text-muted-foreground">
                  طراحی مخصوص کاربران فارسی‌زبان با پشتیبانی کامل از راست‌نویسی
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">رابط کاربری مدرن</h4>
                <p className="text-sm text-muted-foreground">
                  طراحی زیبا و کاربر پسند با تجربه کاربری بهینه
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">امنیت و حریم خصوصی</h4>
                <p className="text-sm text-muted-foreground">
                  بدون ذخیره اطلاعات شخصی و با حفظ کامل حریم خصوصی
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">دسته‌بندی ابزارها</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="text-sm">
                {category}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ابزارهای لنگر در دسته‌بندی‌های مختلف سازماندهی شده‌اند تا بتوانید به راحتی آنچه نیاز دارید پیدا کنید.
          </p>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">سوالات متداول</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-purple-900 mb-2">
                آیا استفاده از ابزارهای لنگر رایگان است؟
              </h4>
              <p className="text-sm text-muted-foreground">
                بله، تمام ابزارهای لنگر کاملاً رایگان هستند و هیچ‌گونه هزینه یا محدودیتی ندارند.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-purple-900 mb-2">
                آیا نیاز به ثبت‌نام دارم؟
              </h4>
              <p className="text-sm text-muted-foreground">
                خیر، برای استفاده از هیچ‌یک از ابزارها نیازی به ثبت‌نام یا ارائه اطلاعات شخصی ندارید.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-purple-900 mb-2">
                آیا ابزارها روی موبایل کار می‌کنند؟
              </h4>
              <p className="text-sm text-muted-foreground">
                بله، تمام ابزارها برای استفاده روی موبایل، تبلت و کامپیوتر بهینه‌سازی شده‌اند.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};