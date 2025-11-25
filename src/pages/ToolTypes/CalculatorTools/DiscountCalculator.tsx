import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, ShoppingCart, TrendingDown } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [visualData, setVisualData] = useState<{ original: number; discount: number; final: number } | null>(null);

  const formatNumber = (value: string) => {
    const numberValue = value.replace(/[^\d]/g, '');
    return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const formatCurrency = (amount: number): string => {
    return formatPersianNumber(amount) + ' تومان';
  };

  const discountPresets = [10, 20, 30, 50, 70];

  const calculateByPercentage = async () => {
    const original = parseNumber(originalPrice);
    const percent = parseNumber(discountPercent);

    if (!original || !percent || original <= 0 || percent < 0 || percent > 100) {
      toast({
        title: 'خطا',
        description: 'لطفاً قیمت اصلی و درصد تخفیف معتبر وارد کنید',
        variant: 'destructive',
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const discountAmountValue = (original * percent) / 100;
    const finalPriceValue = original - discountAmountValue;

    setResult(
      `نتایج محاسبه تخفیف:\n\n` +
      `قیمت اصلی: ${formatCurrency(original)}\n` +
      `درصد تخفیف: ${formatPersianNumber(percent)}٪\n` +
      `مقدار تخفیف: ${formatCurrency(discountAmountValue)}\n` +
      `قیمت نهایی: ${formatCurrency(finalPriceValue)}\n` +
      `مقدار صرفه‌جویی: ${formatCurrency(discountAmountValue)}`
    );

    setVisualData({ original, discount: discountAmountValue, final: finalPriceValue });
    setDiscountAmount(formatNumber(discountAmountValue.toString()));
    setFinalPrice(formatNumber(finalPriceValue.toString()));
    setIsCalculating(false);
    
    toast({
      title: 'محاسبه انجام شد',
      description: 'تخفیف با موفقیت محاسبه شد',
    });
  };

  const calculateByAmount = async () => {
    const original = parseNumber(originalPrice);
    const amount = parseNumber(discountAmount);

    if (!original || !amount || original <= 0 || amount < 0 || amount > original) {
      toast({
        title: 'خطا',
        description: 'لطفاً قیمت اصلی و مقدار تخفیف معتبر وارد کنید',
        variant: 'destructive',
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const finalPriceValue = original - amount;
    const percentValue = (amount / original) * 100;

    setResult(
      `نتایج محاسبه تخفیف:\n\n` +
      `قیمت اصلی: ${formatCurrency(original)}\n` +
      `مقدار تخفیف: ${formatCurrency(amount)}\n` +
      `درصد تخفیف: ${formatPersianNumber(percentValue)}٪\n` +
      `قیمت نهایی: ${formatCurrency(finalPriceValue)}\n` +
      `مقدار صرفه‌جویی: ${formatCurrency(amount)}`
    );

    setVisualData({ original, discount: amount, final: finalPriceValue });
    setDiscountPercent(percentValue.toFixed(2));
    setFinalPrice(formatNumber(finalPriceValue.toString()));
    setIsCalculating(false);
    
    toast({
      title: 'محاسبه انجام شد',
      description: 'تخفیف با موفقیت محاسبه شد',
    });
  };

  const calculateByFinalPrice = async () => {
    const original = parseNumber(originalPrice);
    const final = parseNumber(finalPrice);

    if (!original || !final || original <= 0 || final < 0 || final > original) {
      toast({
        title: 'خطا',
        description: 'لطفاً قیمت اصلی و قیمت نهایی معتبر وارد کنید',
        variant: 'destructive',
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const discountAmountValue = original - final;
    const percentValue = (discountAmountValue / original) * 100;

    setResult(
      `نتایج محاسبه تخفیف:\n\n` +
      `قیمت اصلی: ${formatCurrency(original)}\n` +
      `قیمت نهایی: ${formatCurrency(final)}\n` +
      `مقدار تخفیف: ${formatCurrency(discountAmountValue)}\n` +
      `درصد تخفیف: ${formatPersianNumber(percentValue)}٪\n` +
      `مقدار صرفه‌جویی: ${formatCurrency(discountAmountValue)}`
    );

    setVisualData({ original, discount: discountAmountValue, final });
    setDiscountPercent(percentValue.toFixed(2));
    setDiscountAmount(formatNumber(discountAmountValue.toString()));
    setIsCalculating(false);
    
    toast({
      title: 'محاسبه انجام شد',
      description: 'تخفیف با موفقیت محاسبه شد',
    });
  };

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setDiscountAmount('');
    setFinalPrice('');
    setResult(null);
    setVisualData(null);
    setIsCalculating(false);
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="محاسبه‌گر تخفیف" icon={ShoppingCart} onReset={handleReset}>
        {/* Info */}
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <Percent className="mt-0.5 h-5 w-5 text-primary shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">راهنمای استفاده</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                قیمت اصلی کالا را وارد کنید و سپس یکی از روش‌های محاسبه را انتخاب کنید
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
            dir="ltr"
            className="text-lg font-semibold"
          />
        </div>

        {/* Quick Discount Presets */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">درصدهای پرکاربرد:</Label>
          <div className="flex flex-wrap gap-2">
            {discountPresets.map((preset) => (
              <Button
                key={preset}
                variant="secondary"
                size="sm"
                onClick={() => setDiscountPercent(preset.toString())}
                className="text-xs"
              >
                {formatPersianNumber(preset)}%
              </Button>
            ))}
          </div>
        </div>

        {/* Calculation Options */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-3 p-4 border rounded-lg bg-card">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <Percent className="h-4 w-4 text-primary" />
              محاسبه براساس درصد
            </h3>
            <div className="space-y-2">
              <Label htmlFor="discountPercent" className="text-xs">درصد تخفیف</Label>
              <Input
                id="discountPercent"
                type="text"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="۲۰"
                dir="ltr"
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

          <div className="space-y-3 p-4 border rounded-lg bg-card">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-primary" />
              محاسبه براساس مقدار
            </h3>
            <div className="space-y-2">
              <Label htmlFor="discountAmount" className="text-xs">مقدار تخفیف (تومان)</Label>
              <Input
                id="discountAmount"
                type="text"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(formatNumber(e.target.value))}
                placeholder="۲۰۰,۰۰۰"
                dir="ltr"
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

          <div className="space-y-3 p-4 border rounded-lg bg-card">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              محاسبه براساس قیمت نهایی
            </h3>
            <div className="space-y-2">
              <Label htmlFor="finalPrice" className="text-xs">قیمت نهایی (تومان)</Label>
              <Input
                id="finalPrice"
                type="text"
                value={finalPrice}
                onChange={(e) => setFinalPrice(formatNumber(e.target.value))}
                placeholder="۸۰۰,۰۰۰"
                dir="ltr"
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

        {/* Visual Price Comparison */}
        {visualData && (
          <VisualizationCard title="مقایسه بصری قیمت‌ها">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>قیمت اصلی</span>
                  <span className="font-bold">{formatCurrency(visualData.original)}</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-red-500/70 to-red-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>تخفیف</span>
                  <span className="font-bold text-green-600">{formatCurrency(visualData.discount)}</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(visualData.discount / visualData.original) * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>قیمت نهایی</span>
                  <span className="font-bold text-primary">{formatCurrency(visualData.final)}</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(visualData.final / visualData.original) * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-primary to-primary/80"
                  />
                </div>
              </div>
            </div>
          </VisualizationCard>
        )}

        {result && <OutcomeInfoCard outcome={result} />}
      </CalculatorCard>
    </div>
  );
}