
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">جدول ماهانه</TabsTrigger>
          <TabsTrigger value="yearly">پیش‌بینی سالانه</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="mt-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-4 w-4 text-primary ml-1" />
                <h3 className="font-medium">جدول پرداخت ({isMonthlyExpanded ? 'همه' : '12'} ماه اول)</h3>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => setIsMonthlyExpanded(!isMonthlyExpanded)}>
                  {isMonthlyExpanded ? (
                    <><ChevronUp className="h-4 w-4 ml-1" /> نمایش کمتر</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 ml-1" /> نمایش بیشتر</>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCSV}>
                  <Download className="h-4 w-4 ml-1" /> خروجی CSV
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-right">ماه</th>
                    <th className="px-4 py-2 text-right">پرداخت</th>
                    <th className="px-4 py-2 text-right">بهره</th>
                    <th className="px-4 py-2 text-right">اصل</th>
                    <th className="px-4 py-2 text-right">مانده</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentSchedule.map((item) => (
                    <tr key={item.month} className="border-t">
                      <td className="px-4 py-2">{item.month.toLocaleString('fa-IR')}</td>
                      <td className="px-4 py-2">{formatToToman(item.payment)}</td>
                      <td className="px-4 py-2">{formatToToman(item.interest)}</td>
                      <td className="px-4 py-2">{formatToToman(item.principal)}</td>
                      <td className="px-4 py-2">{formatToToman(item.remainingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="yearly" className="mt-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-4 w-4 text-primary ml-1" />
                <h3 className="font-medium">پیش‌بینی بازپرداخت ({isYearlyExpanded ? 'تا 30' : 'تا 10'} سال)</h3>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => setIsYearlyExpanded(!isYearlyExpanded)}>
                  {isYearlyExpanded ? (
                    <><ChevronUp className="h-4 w-4 ml-1" /> نمایش کمتر</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 ml-1" /> نمایش بیشتر</>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCSV}>
                  <Download className="h-4 w-4 ml-1" /> خروجی CSV
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-right">سال</th>
                    <th className="px-4 py-2 text-right">ماه</th>
                    <th className="px-4 py-2 text-right">کل پرداختی</th>
                    <th className="px-4 py-2 text-right">مانده بدهی</th>
                  </tr>
                </thead>
                <tbody>
                  {extendedSchedule
                    .filter((item, index) => isYearlyExpanded || index < 10)
                    .map((item, index) => (
                      <tr key={index} className={`border-t ${item.year % 2 === 0 ? "bg-gray-50/50" : ""}`}>
                        <td className="px-4 py-2">{item.year.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{item.month.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{formatToToman(item.totalPaid)}</td>
                        <td className="px-4 py-2">{formatToToman(item.remainingBalance)}</td>
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
