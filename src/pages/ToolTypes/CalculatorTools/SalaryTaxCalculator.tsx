
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { OutcomeInfoCard } from "@/components/OutcomeInfoCard";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tax brackets for 1403 (2024-2025, Iran)
// You may adjust as needed
const TAX_FREE = 120_000_000;
const FIRST_STEP = 360_000_000;
const SECOND_STEP = 480_000_000;

function calculateSalaryTax(monthlySalary: number) {
  // Convert monthly to yearly
  const yearly = monthlySalary * 12;
  let remaining = yearly;
  let tax = 0;

  if (yearly <= TAX_FREE) {
    return 0;
  }

  // 0% for up to 120M
  remaining -= TAX_FREE;

  // 10% for next 240M
  if (yearly > TAX_FREE && yearly <= FIRST_STEP) {
    tax += remaining * 0.1;
    remaining = 0;
  }
  else if (yearly > FIRST_STEP) {
    tax += (FIRST_STEP - TAX_FREE) * 0.1;
    remaining -= (FIRST_STEP - TAX_FREE);
  }

  // 15% for next 120M (from 360M to 480M)
  if (yearly > FIRST_STEP && yearly <= SECOND_STEP) {
    tax += remaining * 0.15;
    remaining = 0;
  }
  else if (yearly > SECOND_STEP) {
    tax += (SECOND_STEP - FIRST_STEP) * 0.15;
    remaining -= (SECOND_STEP - FIRST_STEP);
  }

  // 20% for anything above 480M
  if (yearly > SECOND_STEP) {
    tax += remaining * 0.2;
  }

  return Math.floor(tax);
}

export default function SalaryTaxCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const monthly = parseInt(monthlySalary.replace(/,/g, ''));
    if (isNaN(monthly) || monthly <= 0) {
      setResult("لطفاً مبلغ حقوق ماهانه را به‌درستی وارد کنید.");
      return;
    }

    const taxYear = calculateSalaryTax(monthly);
    const taxMonth = Math.floor(taxYear / 12);

    setResult(
      `میزان مالیات سالانه شما: ${taxYear.toLocaleString("fa-IR")} تومان
      معادل ${taxMonth.toLocaleString("fa-IR")} تومان در هر ماه`
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Calculator className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">محاسبه‌گر مالیات حقوق</h2>
          </div>
          <div className="space-y-2 max-w-sm mx-auto">
            <Label htmlFor="monthly-salary">حقوق ماهانه (تومان)</Label>
            <Input
              id="monthly-salary"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="مثال: 25,000,000"
              type="text"
              dir="ltr"
              inputMode="numeric"
              autoComplete="off"
            />
          </div>
          <Button
            onClick={handleCalculate}
            className="flex items-center justify-center"
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه کن
          </Button>
          {result && <OutcomeInfoCard outcome={result} />}
          <div className="bg-muted p-2 rounded text-xs text-muted-foreground text-center">
            <span>
              بر اساس بخشنامه مالیاتی سال ۱۴۰۳ (اعداد به تومان)
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
