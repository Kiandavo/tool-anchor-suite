import React, { useState, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Users } from "lucide-react";
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { toast } from 'sonner';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [numPeople, setNumPeople] = useState<string>('1');

  const result = useMemo(() => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numPeople);
    
    if (isNaN(bill) || isNaN(tip) || isNaN(people) || bill <= 0 || people <= 0) {
      return null;
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;
    const tipPerPerson = tipAmount / people;

    return {
      bill,
      tip,
      tipAmount,
      totalAmount,
      perPerson,
      tipPerPerson,
      people
    };
  }, [billAmount, tipPercentage, numPeople]);

  const setQuickTip = (percentage: number) => {
    setTipPercentage(percentage.toString());
    toast.success(`انعام ${percentage}٪ انتخاب شد`);
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercentage('15');
    setNumPeople('1');
  };

  return (
    <CalculatorCard
      title="محاسبه انعام"
      icon={DollarSign}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bill">مبلغ قبض (تومان)</Label>
            <Input
              id="bill"
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="۱۰۰۰۰۰"
              className="text-lg"
            />
          </div>

          <div className="space-y-3">
            <Label>درصد انعام</Label>
            <div className="grid grid-cols-5 gap-2">
              {[10, 15, 18, 20, 25].map(percentage => (
                <Button
                  key={percentage}
                  variant={tipPercentage === percentage.toString() ? 'default' : 'outline'}
                  onClick={() => setQuickTip(percentage)}
                  className="transition-all"
                >
                  {formatPersianNumber(percentage)}٪
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              placeholder="۱۵"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="people" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              تعداد افراد
            </Label>
            <Input
              id="people"
              type="number"
              min="1"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              placeholder="۱"
              className="text-lg"
            />
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <VisualizationCard title="تقسیم قبض">
              <div className="space-y-4">
                <div className="relative h-32 bg-gradient-to-br from-card to-muted/30 rounded-xl overflow-hidden border border-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(result.bill / result.totalAmount) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/40 to-primary/60 flex items-center justify-center"
                  >
                      <div className="text-center text-foreground px-2">
                        <p className="text-xs font-medium">قبض اصلی</p>
                        <p className="text-sm font-bold">{result.bill.toLocaleString('fa-IR')}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(result.tipAmount / result.totalAmount) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      className="absolute right-0 top-0 h-full bg-gradient-to-l from-green-500/60 to-green-500/40 flex items-center justify-center"
                    >
                      <div className="text-center text-foreground px-2">
                        <p className="text-xs font-medium">انعام ({result.tip.toLocaleString('fa-IR')}٪)</p>
                        <p className="text-sm font-bold">{result.tipAmount.toLocaleString('fa-IR')}</p>
                      </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg text-center border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">قبض</p>
                    <p className="text-sm font-bold text-primary">{result.bill.toLocaleString('fa-IR')}</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg text-center border border-green-500/20">
                    <p className="text-xs text-muted-foreground mb-1">انعام</p>
                    <p className="text-sm font-bold text-green-600">{result.tipAmount.toLocaleString('fa-IR')}</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg text-center border border-border">
                    <p className="text-xs text-muted-foreground mb-1">کل</p>
                    <p className="text-sm font-bold">{result.totalAmount.toLocaleString('fa-IR')}</p>
                  </div>
                </div>
              </div>
            </VisualizationCard>

            {result.people > 1 && (
              <VisualizationCard title="سهم هر نفر">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Array.from({ length: Math.min(result.people, 6) }).map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <p className="text-xs font-medium">نفر {(idx + 1).toLocaleString('fa-IR')}</p>
                      </div>
                      <p className="text-lg font-bold text-primary">{result.perPerson.toLocaleString('fa-IR')}</p>
                      <p className="text-xs text-muted-foreground">شامل {result.tipPerPerson.toLocaleString('fa-IR')} انعام</p>
                    </motion.div>
                  ))}
                  {result.people > 6 && (
                    <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">+ {(result.people - 6).toLocaleString('fa-IR')} نفر دیگر</p>
                    </div>
                  )}
                </div>
              </VisualizationCard>
            )}
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
}