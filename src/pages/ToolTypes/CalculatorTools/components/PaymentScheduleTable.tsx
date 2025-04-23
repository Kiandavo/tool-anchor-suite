
import React from 'react';
import { formatToToman } from '@/utils/calculatorUtils';
import { Calendar } from 'lucide-react';

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
  if (!paymentSchedule || !extendedSchedule) return null;

  return (
    <div className="space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-3 border-b">
          <h3 className="font-medium">جدول پرداخت (12 ماه اول)</h3>
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

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-3 border-b flex items-center space-x-2 space-x-reverse">
          <Calendar className="h-4 w-4 text-primary ml-1" />
          <h3 className="font-medium">پیش‌بینی بازپرداخت تا 10 سال</h3>
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
              {extendedSchedule.map((item, index) => (
                <tr key={index} className={`border-t ${item.year % 2 === 0 ? "bg-gray-50/50" : ""}`}>
                  <td className="px-4 py-2">{item.year.toLocaleString('fa-IR')}</td>
                  <td className="px-4 py-2">{item.month.toLocaleString('fa-IR')}</td>
                  <td className="px-4 py-2">{formatToToman(item.totalPaid)}</td>
                  <td className="px-4 py-2">{formatToToman(item.remainingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
