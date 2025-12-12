import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag, Copy, Check, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
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

    return { original, discountAmount, finalPrice, savingsPercent: percent };
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

  const discountPresets = [10, 15, 20, 25, 30, 50];
  const pricePresets = [
    { label: '۱۰۰ هزار', value: '100000' },
    { label: '۵۰۰ هزار', value: '500000' },
    { label: '۱ میلیون', value: '1000000' },
    { label: '۵ میلیون', value: '5000000' },
  ];

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6 space-y-6">
        {/* Original Price Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">قیمت اصلی (تومان)</Label>
          <Input
            type="text"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(formatNumber(e.target.value))}
            placeholder="مثال: ۱,۰۰۰,۰۰۰"
            className="text-lg"
            dir="ltr"
          />
          <div className="flex flex-wrap gap-2">
            {pricePresets.map((preset) => (
              <Button
                key={preset.value}
                variant="outline"
                size="sm"
                onClick={() => setOriginalPrice(formatNumber(preset.value))}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Discount Percent Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">درصد تخفیف</Label>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="۲۰"
              className="text-lg flex-1"
              dir="ltr"
              min="0"
              max="100"
            />
            <span className="text-xl text-muted-foreground">%</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {discountPresets.map((preset) => (
              <Button
                key={preset}
                variant={discountPercent === preset.toString() ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDiscountPercent(preset.toString())}
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
            className="space-y-4 pt-4 border-t border-border"
          >
            {/* Main Result */}
            <div className="p-5 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <Tag className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground mb-1">قیمت نهایی</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(result.finalPrice)}
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 p-4 rounded-lg bg-muted/30">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">مبلغ تخفیف</span>
                <span className="font-medium text-green-600">{formatCurrency(result.discountAmount)}</span>
              </div>
              <Progress value={result.savingsPercent} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">درصد صرفه‌جویی</span>
                <span className="font-medium">{result.savingsPercent}%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={copyResult} className="rounded-full">
                {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                کپی نتیجه
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full text-muted-foreground">
                <RotateCcw className="w-4 h-4 ml-2" />
                پاک کردن
              </Button>
            </div>
          </motion.div>
        )}

        {/* Reset when no results */}
        {!result && (originalPrice || discountPercent) && (
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full text-muted-foreground">
              <RotateCcw className="w-4 h-4 ml-2" />
              پاک کردن
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
