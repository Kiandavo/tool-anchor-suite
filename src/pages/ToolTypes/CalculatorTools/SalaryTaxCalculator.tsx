
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { CreditCard, Landmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Tax brackets for 1403 (Iranian fiscal year)
const TAX_BRACKETS_1403 = [
  { max: 8_800_000, rate: 0 },         // Up to 8.8M, 0%
  { max: 13_200_000, rate: 0.10 },     // 8.8M to 13.2M, 10%
  { max: 22_000_000, rate: 0.15 },     // 13.2M to 22M, 15%
  { max: 30_800_000, rate: 0.20 },     // 22M to 30.8M, 20%
  { max: Infinity, rate: 0.30 },       // Over 30.8M, 30%
];

export default function SalaryTaxCalculator() {
  const [salary, setSalary] = useState<string>('');
  const [taxYear, setTaxYear] = useState<string>('1403');
  const [calculationType, setCalculationType] = useState<string>('monthly');
  const [result, setResult] = useState<string | null>(null);
  const [taxDetails, setTaxDetails] = useState<{ bracket: string; amount: number; rate: number; }[]>([]);
  
  // Format input with thousands separator
  const formatInput = (value: string): string => {
    const plainNumber = value.replace(/[^\d]/g, '');
    
    if (plainNumber === '') {
      return '';
    }
    
    return plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value);
    setSalary(formatted);
  };
  
  // Format Rial amount to display
  const formatRial = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  // Calculate tax based on the provided salary
  const calculateTax = () => {
    try {
      const salaryValue = parseFloat(salary.replace(/,/g, ''));
      
      if (isNaN(salaryValue) || salaryValue < 0) {
        setResult('لطفاً مقدار معتبری برای حقوق وارد کنید.');
        setTaxDetails([]);
        return;
      }

      // Apply tax brackets
      let totalTax = 0;
      let remainingSalary = salaryValue;
      const details: { bracket: string; amount: number; rate: number }[] = [];
      let previousMax = 0;
      
      // Use appropriate tax brackets based on selected year
      const brackets = TAX_BRACKETS_1403; // For now, only 1403
      
      // Apply each tax bracket
      for (const bracket of brackets) {
        const bracketRange = bracket.max - previousMax;
        const taxableInBracket = Math.min(remainingSalary, bracketRange);
        
        if (taxableInBracket > 0) {
          const taxForBracket = taxableInBracket * bracket.rate;
          totalTax += taxForBracket;
          
          details.push({
            bracket: `${formatRial(previousMax)} تا ${bracket.max !== Infinity ? formatRial(bracket.max) : 'بی‌نهایت'}`,
            amount: taxableInBracket,
            rate: bracket.rate * 100
          });
          
          remainingSalary -= taxableInBracket;
          
          if (remainingSalary <= 0) {
            break;
          }
        }
        
        previousMax = bracket.max;
      }

      // Calculate net salary
      const netSalary = salaryValue - totalTax;
      const taxRate = (totalTax / salaryValue) * 100;
      
      // Prepare the result message
      let resultMsg = `نتیجه محاسبه مالیات حقوق ${calculationType === 'monthly' ? 'ماهانه' : 'سالانه'}:\n\n`;
      resultMsg += `حقوق ناخالص: ${formatRial(salaryValue)}\n`;
      resultMsg += `مالیات: ${formatRial(totalTax)} (${taxRate.toFixed(2)}٪)\n`;
      resultMsg += `حقوق خالص: ${formatRial(netSalary)}\n`;
      
      // Add yearly equivalent if calculating monthly
      if (calculationType === 'monthly') {
        resultMsg += `\nمعادل سالیانه:\n`;
        resultMsg += `حقوق ناخالص سالیانه: ${formatRial(salaryValue * 12)}\n`;
        resultMsg += `مالیات سالیانه: ${formatRial(totalTax * 12)}\n`;
        resultMsg += `حقوق خالص سالیانه: ${formatRial(netSalary * 12)}`;
      } 
      // Add monthly equivalent if calculating yearly
      else {
        resultMsg += `\nمعادل ماهیانه:\n`;
        resultMsg += `حقوق ناخالص ماهیانه: ${formatRial(salaryValue / 12)}\n`;
        resultMsg += `مالیات ماهیانه: ${formatRial(totalTax / 12)}\n`;
        resultMsg += `حقوق خالص ماهیانه: ${formatRial(netSalary / 12)}`;
      }
      
      setResult(resultMsg);
      setTaxDetails(details);
      
    } catch (error) {
      console.error('Error calculating tax:', error);
      setResult('خطا در محاسبه مالیات. لطفاً مقادیر را بررسی کنید.');
      setTaxDetails([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Landmark className="h-5 w-5" />
          محاسبه‌گر مالیات حقوق
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-md">
          <h3 className="font-medium mb-2 flex items-center gap-1">
            <CreditCard size={16} className="text-primary" />
            اطلاعات پلکان‌های مالیاتی سال ۱۴۰۳
          </h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• تا ۸.۸ میلیون تومان در ماه: معاف از مالیات</p>
            <p>• از ۸.۸ تا ۱۳.۲ میلیون تومان در ماه: ۱۰٪</p>
            <p>• از ۱۳.۲ تا ۲۲ میلیون تومان در ماه: ۱۵٪</p>
            <p>• از ۲۲ تا ۳۰.۸ میلیون تومان در ماه: ۲۰٪</p>
            <p>• بیش از ۳۰.۸ میلیون تومان در ماه: ۳۰٪</p>
          </div>
        </div>
        
        <Tabs defaultValue="monthly" value={calculationType} onValueChange={setCalculationType}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="monthly">محاسبه ماهیانه</TabsTrigger>
            <TabsTrigger value="yearly">محاسبه سالیانه</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="tax-year">سال مالیاتی</Label>
              <Select 
                value={taxYear} 
                onValueChange={setTaxYear}
              >
                <SelectTrigger id="tax-year" className="mt-1">
                  <SelectValue placeholder="انتخاب سال مالیاتی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1403">۱۴۰۳</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="salary">
                حقوق {calculationType === 'monthly' ? 'ماهیانه' : 'سالیانه'} (تومان)
              </Label>
              <Input
                id="salary"
                value={salary}
                onChange={handleSalaryChange}
                placeholder={`مثلاً ${calculationType === 'monthly' ? '15,000,000' : '180,000,000'}`}
                className="mt-1"
                dir="ltr"
              />
            </div>
            
            <Button onClick={calculateTax} className="w-full">
              محاسبه مالیات
            </Button>
          </div>
        </Tabs>
        
        {result && <OutcomeInfoCard outcome={result} />}
        
        {taxDetails.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">جزئیات محاسبه مالیات:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-md">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-2 px-3 text-right text-xs">پله مالیاتی</th>
                    <th className="py-2 px-3 text-right text-xs">مبلغ مشمول</th>
                    <th className="py-2 px-3 text-right text-xs">نرخ</th>
                    <th className="py-2 px-3 text-right text-xs">مالیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {taxDetails.map((detail, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-2 px-3">{detail.bracket}</td>
                      <td className="py-2 px-3">{formatRial(detail.amount)}</td>
                      <td className="py-2 px-3">{detail.rate}٪</td>
                      <td className="py-2 px-3">{formatRial(detail.amount * detail.rate / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
