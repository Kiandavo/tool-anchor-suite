
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { currencies, convertUnit } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount)) {
      const convertedAmount = convertUnit(numAmount, fromCurrency, toCurrency);
      setResult(convertedAmount);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="مقدار"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (e.target.value) handleCalculate();
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                value={fromCurrency.name}
                onValueChange={(value) => {
                  const currency = currencies.find(c => c.name === value);
                  if (currency) {
                    setFromCurrency(currency);
                    if (amount) handleCalculate();
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{fromCurrency.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.name} value={currency.name}>
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={toCurrency.name}
                onValueChange={(value) => {
                  const currency = currencies.find(c => c.name === value);
                  if (currency) {
                    setToCurrency(currency);
                    if (amount) handleCalculate();
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{toCurrency.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.name} value={currency.name}>
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {result !== null && (
          <OutcomeInfoCard
            outcome={`${amount} ${fromCurrency.name} = ${result.toLocaleString('fa-IR')} ${toCurrency.name}`}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
