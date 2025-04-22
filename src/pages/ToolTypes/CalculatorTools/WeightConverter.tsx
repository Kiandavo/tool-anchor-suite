
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { weightUnits, convertUnit, Unit } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator } from 'lucide-react';

const WeightConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<Unit>(weightUnits[0]);
  const [toUnit, setToUnit] = useState<Unit>(weightUnits[1]);
  const [results, setResults] = useState<{ unit: Unit; value: number }[]>([]);

  useEffect(() => {
    handleCalculate();
  }, [amount, fromUnit, toUnit]);

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      const allResults = weightUnits.map(unit => ({
        unit,
        value: convertUnit(numAmount, fromUnit, unit)
      }));
      setResults(allResults);
    } else {
      setResults([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Calculator className="ml-2 h-5 w-5" />
          تبدیل واحدهای وزن
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="مقدار"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                value={fromUnit.name}
                onValueChange={(value) => {
                  const unit = weightUnits.find(u => u.name === value);
                  if (unit) {
                    setFromUnit(unit);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{fromUnit.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={toUnit.name}
                onValueChange={(value) => {
                  const unit = weightUnits.find(u => u.name === value);
                  if (unit) {
                    setToUnit(unit);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{toUnit.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
          <div className="space-y-4">
            <OutcomeInfoCard
              outcome={`${amount} ${fromUnit.name} = ${convertUnit(parseFloat(amount), fromUnit, toUnit).toLocaleString('fa-IR')} ${toUnit.name}`}
            />
            
            <div className="rounded-md border bg-muted/50">
              <div className="px-4 py-2 border-b bg-muted font-medium">تمام تبدیل‌ها</div>
              <div className="p-4 divide-y">
                {results.map((result, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <span>{result.unit.name}</span>
                    <span className="font-medium">{result.value.toLocaleString('fa-IR')} {result.unit.symbol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeightConverter;
