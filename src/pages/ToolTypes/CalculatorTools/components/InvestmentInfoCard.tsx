
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react';

export const InvestmentInfoCard: React.FC = () => {
  return (
    <Card className="mb-6 border-primary/10 bg-primary/5">
      <CardContent className="p-4 flex gap-3">
        <div className="mt-1">
          <Info className="h-5 w-5 text-primary" />
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">راهنمای محاسبه‌گر سرمایه‌گذاری:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>سرمایه اولیه: مبلغی که در ابتدا سرمایه‌گذاری می‌کنید</li>
            <li>سرمایه‌گذاری منظم: مبلغی که به صورت ماهانه یا سالانه اضافه می‌کنید</li>
            <li>نرخ بازده: درصد سود سالانه مورد انتظار (به طور متوسط بین ۱۵٪ تا ۲۵٪)</li>
            <li>مدت سرمایه‌گذاری: طول دوره سرمایه‌گذاری بر حسب سال</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
