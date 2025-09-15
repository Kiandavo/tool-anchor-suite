import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Copy, Star } from "lucide-react";
import { toast } from "sonner";

interface FactorsResult {
  number: number;
  factors: number[];
  primeFactors: number[];
  properDivisors: number[];
  isPerfect: boolean;
  isDeficient: boolean;
  isAbundant: boolean;
  factorPairs: [number, number][];
}

export const FactorsFinder: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<FactorsResult | null>(null);

  const findFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) {
          factors.push(n / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  const findPrimeFactors = (n: number): number[] => {
    const factors: number[] = [];
    let num = n;
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
      while (num % i === 0) {
        factors.push(i);
        num = num / i;
      }
    }
    
    if (num > 1) {
      factors.push(num);
    }
    
    return factors;
  };

  const getFactorPairs = (factors: number[], n: number): [number, number][] => {
    const pairs: [number, number][] = [];
    const used = new Set<number>();
    
    for (const factor of factors) {
      const complement = n / factor;
      if (!used.has(factor) && !used.has(complement)) {
        pairs.push([factor, complement]);
        used.add(factor);
        used.add(complement);
      }
    }
    
    return pairs.sort((a, b) => a[0] - b[0]);
  };

  const calculateFactors = () => {
    const num = parseInt(number);
    if (isNaN(num) || num <= 0) {
      toast.error('لطفاً یک عدد صحیح مثبت وارد کنید');
      return;
    }

    if (num > 1000000) {
      toast.error('عدد نمی‌تواند بیشتر از ۱،۰۰۰،۰۰۰ باشد');
      return;
    }

    const factors = findFactors(num);
    const primeFactors = findPrimeFactors(num);
    const properDivisors = factors.filter(f => f !== num);
    const sumOfProperDivisors = properDivisors.reduce((sum, f) => sum + f, 0);
    
    const isPerfect = sumOfProperDivisors === num;
    const isDeficient = sumOfProperDivisors < num;
    const isAbundant = sumOfProperDivisors > num;
    
    const factorPairs = getFactorPairs(factors, num);

    setResult({
      number: num,
      factors,
      primeFactors,
      properDivisors,
      isPerfect,
      isDeficient,
      isAbundant,
      factorPairs
    });
  };

  const copyFactors = () => {
    if (!result) return;
    const factorsText = result.factors.join(', ');
    navigator.clipboard.writeText(factorsText);
    toast.success('مقسوم‌علیه‌ها کپی شد');
  };

  const copyPrimeFactors = () => {
    if (!result) return;
    const primeFactorsText = result.primeFactors.join(' × ');
    navigator.clipboard.writeText(primeFactorsText);
    toast.success('عوامل اول کپی شد');
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            یافتن مقسوم‌علیه‌ها
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">عدد مورد نظر را وارد کنید:</label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="مثال: 24"
              className="text-lg"
              min="1"
              max="1000000"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateFactors} disabled={!number.trim()}>
              یافتن مقسوم‌علیه‌ها
            </Button>
            {result && (
              <Button onClick={reset} variant="outline">
                شروع دوباره
              </Button>
            )}
          </div>

          {result && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">
                      مقسوم‌علیه‌های {result.number.toLocaleString('fa-IR')}
                    </h3>
                    <div className="flex justify-center gap-2">
                      {result.isPerfect && (
                        <Badge variant="default" className="bg-gold text-gold-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          عدد کامل
                        </Badge>
                      )}
                      {result.isAbundant && (
                        <Badge variant="secondary">عدد فراوان</Badge>
                      )}
                      {result.isDeficient && (
                        <Badge variant="outline">عدد کمبود</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">همه مقسوم‌علیه‌ها:</h4>
                        <Button variant="outline" size="sm" onClick={copyFactors}>
                          <Copy className="w-4 h-4 mr-2" />
                          کپی
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.factors.map((factor, index) => (
                          <Badge 
                            key={index} 
                            variant={factor === 1 || factor === result.number ? "default" : "secondary"}
                            className="text-sm"
                          >
                            {factor.toLocaleString('fa-IR')}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        تعداد: {result.factors.length.toLocaleString('fa-IR')} مقسوم‌علیه
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">عوامل اول:</h4>
                        <Button variant="outline" size="sm" onClick={copyPrimeFactors}>
                          <Copy className="w-4 h-4 mr-2" />
                          کپی
                        </Button>
                      </div>
                      <div className="p-3 bg-background rounded border">
                        <p className="text-center font-mono">
                          {result.number.toLocaleString('fa-IR')} = {result.primeFactors.map(f => f.toLocaleString('fa-IR')).join(' × ')}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[...new Set(result.primeFactors)].map((prime, index) => (
                          <Badge key={index} variant="destructive" className="text-sm">
                            {prime.toLocaleString('fa-IR')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">جفت‌های مقسوم‌علیه:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {result.factorPairs.map((pair, index) => (
                        <div key={index} className="p-2 bg-background rounded border text-center">
                          <span className="text-sm font-mono">
                            {pair[0].toLocaleString('fa-IR')} × {pair[1].toLocaleString('fa-IR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">کل مقسوم‌علیه‌ها</p>
                        <p className="text-lg font-semibold">
                          {result.factors.length.toLocaleString('fa-IR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">مقسوم‌علیه‌های حقیقی</p>
                        <p className="text-lg font-semibold">
                          {result.properDivisors.length.toLocaleString('fa-IR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">عوامل اول منحصربفرد</p>
                        <p className="text-lg font-semibold">
                          {[...new Set(result.primeFactors)].length.toLocaleString('fa-IR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">مجموع مقسوم‌علیه‌های حقیقی</p>
                        <p className="text-lg font-semibold">
                          {result.properDivisors.reduce((sum, f) => sum + f, 0).toLocaleString('fa-IR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>توضیحات مقسوم‌علیه‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              <strong>مقسوم‌علیه (Divisor/Factor)</strong> عددی است که عدد مورد نظر بر آن بخش‌پذیر باشد.
            </p>
            
            <h4>انواع مقسوم‌علیه‌ها:</h4>
            <ul>
              <li><strong>مقسوم‌علیه‌های حقیقی:</strong> همه مقسوم‌علیه‌ها به جز خود عدد</li>
              <li><strong>عوامل اول:</strong> مقسوم‌علیه‌هایی که عدد اول هستند</li>
              <li><strong>مقسوم‌علیه‌های مرکب:</strong> مقسوم‌علیه‌هایی که عدد مرکب هستند</li>
            </ul>

            <h4>طبقه‌بندی اعداد بر اساس مجموع مقسوم‌علیه‌های حقیقی:</h4>
            <ul>
              <li><strong>عدد کامل:</strong> مجموع مقسوم‌علیه‌های حقیقی = خود عدد (مثل ۶، ۲۸)</li>
              <li><strong>عدد کمبود:</strong> مجموع مقسوم‌علیه‌های حقیقی کمتر از خود عدد</li>
              <li><strong>عدد فراوان:</strong> مجموع مقسوم‌علیه‌های حقیقی بیشتر از خود عدد</li>
            </ul>

            <h4>کاربردها:</h4>
            <ul>
              <li>ساده‌سازی کسرها</li>
              <li>حل معادلات دیوفانتین</li>
              <li>نظریه اعداد و رمزنگاری</li>
              <li>الگوریتم‌های بهینه‌سازی</li>
              <li>محاسبات ریاضی و فیزیک</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};