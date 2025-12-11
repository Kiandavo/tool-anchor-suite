import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, ShoppingCart, RotateCcw, Copy, Check, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const formatNumber = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value: string): number => parseFloat(value.replace(/,/g, '')) || 0;

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('fa-IR').format(Math.round(amount)) + ' تومان';

  const result = useMemo(() => {
    const original = parseNumber(originalPrice);
    const percent = parseFloat(discountPercent);

    if (!original || isNaN(percent) || percent < 0 || percent > 100) return null;

    const discountAmount = (original * percent) / 100;
    const finalPrice = original - discountAmount;
    const savingsPercent = percent;

    return { original, discountAmount, finalPrice, savingsPercent };
  }, [originalPrice, discountPercent]);

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `قیمت اصلی: ${formatCurrency(result.original)}\nتخفیف ${discountPercent}%: ${formatCurrency(result.discountAmount)}\nقیمت نهایی: ${formatCurrency(result.finalPrice)}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('کپی شد');
    setTimeout(() => setCopied(false), 2000);
  };

  const discountPresets = [10, 20, 30, 50, 70];
  const pricePresets = [
    { label: '۱۰۰ هزار', value: '100000' },
    { label: '۵۰۰ هزار', value: '500000' },
    { label: '۱ میلیون', value: '1000000' },
    { label: '۵ میلیون', value: '5000000' },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">محاسبه‌گر تخفیف</span>
            </div>
          </div>

          {/* Original Price */}
          <div className="space-y-3">
            <Label className="text-sm">قیمت اصلی (تومان)</Label>
            <Input
              type="text"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(formatNumber(e.target.value))}
              placeholder="مثال: 1,000,000"
              className="text-lg bg-background/50"
              dir="ltr"
            />
            <div className="flex flex-wrap gap-2">
              {pricePresets.map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setOriginalPrice(formatNumber(preset.value))}
                  className="text-xs rounded-full"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Discount Percent */}
          <div className="space-y-3">
            <Label className="text-sm">درصد تخفیف</Label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="۲۰"
                className="text-lg bg-background/50 flex-1"
                dir="ltr"
                min="0"
                max="100"
              />
              <span className="flex items-center text-2xl text-muted-foreground">%</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {discountPresets.map((preset) => (
                <Button
                  key={preset}
                  variant={discountPercent === preset.toString() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDiscountPercent(preset.toString())}
                  className="rounded-full"
                >
                  {preset}%
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Result */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 text-center">
                <Tag className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm text-muted-foreground mb-1">قیمت نهایی</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(result.finalPrice)}
                </p>
              </div>

              {/* Visual Progress */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>قیمت اصلی</span>
                    <span className="line-through text-muted-foreground">{formatCurrency(result.original)}</span>
                  </div>
                  <Progress value={100} className="h-3 bg-red-500/20" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">صرفه‌جویی شما</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(result.discountAmount)}
                    </span>
                  </div>
                  <Progress value={result.savingsPercent} className="h-3" />
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <p className="text-2xl font-bold text-primary">{result.savingsPercent}%</p>
                  <p className="text-xs text-muted-foreground">درصد تخفیف</p>
                </div>
                <div className="p-4 rounded-xl bg-green-500/10 text-center">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.discountAmount)}
                  </p>
                  <p className="text-xs text-muted-foreground">مقدار صرفه‌جویی</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {result && (
              <Button variant="outline" size="sm" onClick={copyResult} className="rounded-full">
                {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                کپی
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full text-muted-foreground">
              <RotateCcw className="w-4 h-4 ml-2" />
              پاک کردن
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
