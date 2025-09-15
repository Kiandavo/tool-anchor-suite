import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, ShoppingCart } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { toast } from 'sonner';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const formatNumber = (value: string) => {
    const numberValue = value.replace(/[^\d]/g, '');
    return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fa-IR') + ' تومان';
  };

  const calculateByPercentage = async () => {
    const original = parseNumber(originalPrice);
    const percent = parseNumber(discountPercent);

    if (!original || !percent || original <= 0 || percent < 0 || percent > 100) {
      toast.error('لطفاً قیمت اصلی و درصد تخفیف معتبر وارد کنید');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const discountAmountValue = (original * percent) / 100;
    const finalPriceValue = original - discountAmountValue;

    setResult(
      `نتایج محاسبه تخفیف:\n\n` +
      `قیمت اصلی: ${formatCurrency(original)}\n` +
      `درصد تخفیف: ${percent}٪\n` +
      `مقدار تخفیف: ${formatCurrency(discountAmountValue)}\n` +
      `قیمت نهایی: ${formatCurrency(finalPriceValue)}\n` +
      `مقدار صرفه‌جویی: ${formatCurrency(discountAmountValue)}`
    );

    // Update other fields
    setDiscountAmount(formatNumber(discountAmountValue.toString()));
    setFinalPrice(formatNumber(finalPriceValue.toString()));

    setIsCalculating(false);
    toast.success('برآورد تخفیف با موفقیت انجام شد');
  };

  const calculateByAmount = async () => {
    const original = parseNumber(originalPrice);
    const amount = parseNumber(discountAmount);

    if (!original || !amount || original <= 0 || amount < 0 || amount > original) {
      toast.error('لطفاً قیمت اصلی و مقدار تخفیف معتبر وارد کنید');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const finalPriceValue = original - amount;
    const percentValue = (amount / original) * 100;

    setResult(
      `نتایج محاسبه تخفیف:\n\n` +
      `قیمت اصلی: ${formatCurrency(original)}\n` +
      `مقدار تخفیف: ${formatCurrency(amount)}\n` +
      `درصد تخفیف: ${percentValue.toFixed(2)}٪\n` +
      `قیمت نهایی: ${formatCurrency(finalPriceValue)}\n` +
      `مقدار صرفه‌جویی: ${formatCurrency(amount)}`
    );

    // Update other fields
    setDiscountPercent(percentValue.toFixed(2));
    setFinalPrice(formatNumber(finalPriceValue.toString()));

    setIsCalculating(false);
    toast.success('برآورد تخفیف با موفقیت انجام شد');
  };

  const calculateByFinalPrice = async () => {
    const original = parseNumber(originalPrice);
    const final = parseNumber(finalPrice);

    if (!original || !final || original <= 0 || final < 0 || final > original) {
      toast.error('لطفاً قیمت اصلی و قیمت نهایی معتبر وارد کنید');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const discountAmountValue = original - final;
    const percentValue = (discountAmountValue / original) * 100;

    setResult(
      `نتایج محاسبه تخفیف:\n\n` +
      `قیمت اصلی: ${formatCurrency(original)}\n` +
      `قیمت نهایی: ${formatCurrency(final)}\n` +
      `مقدار تخفیف: ${formatCurrency(discountAmountValue)}\n` +
      `درصد تخفیف: ${percentValue.toFixed(2)}٪\n` +
      `مقدار صرفه‌جویی: ${formatCurrency(discountAmountValue)}`
    );

    // Update other fields
    setDiscountPercent(percentValue.toFixed(2));
    setDiscountAmount(formatNumber(discountAmountValue.toString()));

    setIsCalculating(false);
    toast.success('برآورد تخفیف با موفقیت انجام شد');
  };

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setDiscountAmount('');
    setFinalPrice('');
    setResult(null);
    setIsCalculating(false);
    toast.info('فرم بازنشانی شد');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <ShoppingCart className="ml-2 h-5 w-5" />
          محاسبه‌گر تخفیف
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Info Card */}
        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex items-start space-x-3 space-x-reverse">
            <Percent className="mt-0.5 h-5 w-5 text-primary shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">راهنمای استفاده</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                قیمت اصلی کالا را وارد کنید و سپس یکی از گزینه‌های زیر را انتخاب کنید:
                محاسبه براساس درصد تخفیف، مقدار تخفیف، یا قیمت نهایی
              </p>
            </div>
          </div>
        </div>

        {/* Original Price Input */}
        <div className="space-y-2">
          <Label htmlFor="originalPrice">قیمت اصلی (تومان)</Label>
          <Input
            id="originalPrice"
            type="text"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(formatNumber(e.target.value))}
            placeholder="مثال: 1,000,000"
            className="text-right"
          />
        </div>

        {/* Calculation Options */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* By Percentage */}
          <div className="space-y-3 p-4 border rounded-lg">
            <h3 className="font-medium text-sm">محاسبه براساس درصد</h3>
            <div className="space-y-2">
              <Label htmlFor="discountPercent">درصد تخفیف</Label>
              <Input
                id="discountPercent"
                type="text"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="مثال: 20"
                className="text-right"
              />
            </div>
            <Button 
              onClick={calculateByPercentage}
              disabled={isCalculating || !originalPrice || !discountPercent}
              size="sm"
              className="w-full"
            >
              محاسبه
            </Button>
          </div>

          {/* By Amount */}
          <div className="space-y-3 p-4 border rounded-lg">
            <h3 className="font-medium text-sm">محاسبه براساس مقدار</h3>
            <div className="space-y-2">
              <Label htmlFor="discountAmount">مقدار تخفیف (تومان)</Label>
              <Input
                id="discountAmount"
                type="text"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(formatNumber(e.target.value))}
                placeholder="مثال: 200,000"
                className="text-right"
              />
            </div>
            <Button 
              onClick={calculateByAmount}
              disabled={isCalculating || !originalPrice || !discountAmount}
              size="sm"
              className="w-full"
            >
              محاسبه
            </Button>
          </div>

          {/* By Final Price */}
          <div className="space-y-3 p-4 border rounded-lg">
            <h3 className="font-medium text-sm">محاسبه براساس قیمت نهایی</h3>
            <div className="space-y-2">
              <Label htmlFor="finalPrice">قیمت نهایی (تومان)</Label>
              <Input
                id="finalPrice"
                type="text"
                value={finalPrice}
                onChange={(e) => setFinalPrice(formatNumber(e.target.value))}
                placeholder="مثال: 800,000"
                className="text-right"
              />
            </div>
            <Button 
              onClick={calculateByFinalPrice}
              disabled={isCalculating || !originalPrice || !finalPrice}
              size="sm"
              className="w-full"
            >
              محاسبه
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={isCalculating}
          >
            بازنشانی فرم
          </Button>
        </div>

        {/* Results */}
        {result && (
          <OutcomeInfoCard outcome={result} />
        )}
      </CardContent>
    </Card>
  );
}