import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

export default function ProfitCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{ interest: number; total: number; years: Array<{ year: number; amount: number }> } | null>(null);

  const calculateProfit = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      return;
    }

    const interest = p * r * t;
    const total = p + interest;

    const years = [];
    for (let i = 1; i <= t; i++) {
      years.push({
        year: i,
        amount: p + (p * r * i)
      });
    }

    setResult({ interest, total, years });
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
  };

  return (
    <CalculatorCard
      title="محاسبه سود و بهره"
      icon={TrendingUp}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">مبلغ اولیه (تومان)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="۱۰۰۰۰۰۰"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">نرخ سود سالانه (درصد)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="۲۰"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">مدت (سال)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="۱"
            />
          </div>
          <Button onClick={calculateProfit} className="w-full" size="lg">
            محاسبه سود
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-primary/10 rounded-xl text-center border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">مبلغ اولیه</p>
                <p className="text-sm font-bold text-primary">{parseFloat(principal).toLocaleString('fa-IR')}</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-xl text-center border border-green-500/20">
                <p className="text-xs text-muted-foreground mb-1">سود</p>
                <p className="text-sm font-bold text-green-600">{result.interest.toLocaleString('fa-IR')}</p>
              </div>
              <div className="p-4 bg-card rounded-xl text-center border border-border">
                <p className="text-xs text-muted-foreground mb-1">کل مبلغ</p>
                <p className="text-sm font-bold">{result.total.toLocaleString('fa-IR')}</p>
              </div>
            </div>

            <VisualizationCard title="رشد سرمایه">
              <div className="relative h-48">
                {result.years.map((yearData, idx) => {
                  const height = (yearData.amount / result.total) * 100;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.2 }}
                      className="absolute bottom-0 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg"
                      style={{
                        left: `${(idx / result.years.length) * 100}%`,
                        width: `${80 / result.years.length}%`,
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                        {yearData.amount.toLocaleString('fa-IR')}
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                        سال {yearData.year.toLocaleString('fa-IR')}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </VisualizationCard>

            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
              <p className="text-sm text-center">
                با سرمایه‌گذاری <span className="font-bold">{principal}</span> تومان
                به مدت <span className="font-bold">{time}</span> سال
                با نرخ <span className="font-bold">{rate}٪</span>،
                سود شما <span className="font-bold text-green-600">{result.interest.toLocaleString('fa-IR')}</span> تومان
                و مبلغ کل <span className="font-bold text-primary">{result.total.toLocaleString('fa-IR')}</span> تومان خواهد بود.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
}