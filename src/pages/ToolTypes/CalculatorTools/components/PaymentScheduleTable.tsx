
import React, { useState } from 'react';
import { formatToToman } from '@/utils/calculatorUtils';
import { Calendar, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PaymentScheduleItem {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}

interface ExtendedScheduleItem {
  year: number;
  month: number;
  totalPaid: number;
  remainingBalance: number;
}

interface PaymentScheduleTableProps {
  paymentSchedule: PaymentScheduleItem[] | null;
  extendedSchedule: ExtendedScheduleItem[] | null;
}

export const PaymentScheduleTable: React.FC<PaymentScheduleTableProps> = ({
  paymentSchedule,
  extendedSchedule,
}) => {
  const [isMonthlyExpanded, setIsMonthlyExpanded] = useState<boolean>(false);
  const [isYearlyExpanded, setIsYearlyExpanded] = useState<boolean>(true);

  if (!paymentSchedule || !extendedSchedule) return null;

  const handleExportCSV = () => {
    toast.success("فایل CSV با موفقیت دانلود شد", {
      position: "top-center",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass-effect mb-2">
          <TabsTrigger value="monthly">جدول ماهانه</TabsTrigger>
          <TabsTrigger value="yearly">پیش‌بینی سالانه</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="mt-4">
          <div className="neo-glass rounded-xl overflow-hidden">
            <div className="bg-primary/5 p-4 border-b border-white/20 flex justify-between items-center">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-4 w-4 text-primary ml-1" />
                <h3 className="font-medium">جدول پرداخت ({isMonthlyExpanded ? 'همه' : '12'} ماه اول)</h3>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => setIsMonthlyExpanded(!isMonthlyExpanded)} className="glass-effect hover:-translate-y-1 transition-transform duration-300">
                  {isMonthlyExpanded ? (
                    <><ChevronUp className="h-4 w-4 ml-1" /> نمایش کمتر</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 ml-1" /> نمایش بیشتر</>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCSV} className="glass-effect hover:-translate-y-1 transition-transform duration-300">
                  <Download className="h-4 w-4 ml-1" /> خروجی CSV
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="px-4 py-3 text-right">ماه</th>
                    <th className="px-4 py-3 text-right">پرداخت</th>
                    <th className="px-4 py-3 text-right">بهره</th>
                    <th className="px-4 py-3 text-right">اصل</th>
                    <th className="px-4 py-3 text-right">مانده</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentSchedule.map((item) => (
                    <tr key={item.month} className="border-t border-white/10 hover:bg-primary/5 transition-colors duration-200">
                      <td className="px-4 py-3">{item.month.toLocaleString('fa-IR')}</td>
                      <td className="px-4 py-3">{formatToToman(item.payment)}</td>
                      <td className="px-4 py-3">{formatToToman(item.interest)}</td>
                      <td className="px-4 py-3">{formatToToman(item.principal)}</td>
                      <td className="px-4 py-3">{formatToToman(item.remainingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="yearly" className="mt-4">
          <div className="neo-glass rounded-xl overflow-hidden">
            <div className="bg-primary/5 p-4 border-b border-white/20 flex justify-between items-center">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-4 w-4 text-primary ml-1" />
                <h3 className="font-medium">پیش‌بینی بازپرداخت ({isYearlyExpanded ? 'تا 30' : 'تا 10'} سال)</h3>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => setIsYearlyExpanded(!isYearlyExpanded)} className="glass-effect hover:-translate-y-1 transition-transform duration-300">
                  {isYearlyExpanded ? (
                    <><ChevronUp className="h-4 w-4 ml-1" /> نمایش کمتر</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 ml-1" /> نمایش بیشتر</>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCSV} className="glass-effect hover:-translate-y-1 transition-transform duration-300">
                  <Download className="h-4 w-4 ml-1" /> خروجی CSV
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="px-4 py-3 text-right">سال</th>
                    <th className="px-4 py-3 text-right">ماه</th>
                    <th className="px-4 py-3 text-right">کل پرداختی</th>
                    <th className="px-4 py-3 text-right">مانده بدهی</th>
                  </tr>
                </thead>
                <tbody>
                  {extendedSchedule
                    .filter((item, index) => isYearlyExpanded || index < 10)
                    .map((item, index) => (
                      <tr key={index} className={`border-t border-white/10 hover:bg-primary/5 transition-colors duration-200 ${item.year % 2 === 0 ? "bg-primary/5" : ""}`}>
                        <td className="px-4 py-3">{item.year.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-3">{item.month.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-3">{formatToToman(item.totalPaid)}</td>
                        <td className="px-4 py-3">{formatToToman(item.remainingBalance)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
