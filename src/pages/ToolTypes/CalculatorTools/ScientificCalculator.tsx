
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Pi, Equal, SquareRoot } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function ScientificCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleNumberClick = (num: string) => {
    setInput(prev => prev + num);
  };

  const handleOperatorClick = (operator: string) => {
    setInput(prev => prev + operator);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const calculateResult = () => {
    try {
      // Replace special symbols with JavaScript math operations
      let expression = input
        .replace('×', '*')
        .replace('÷', '/')
        .replace('π', Math.PI.toString())
        .replace('√', 'Math.sqrt')
        .replace('^', '**');

      // Evaluate the expression
      const evalResult = Function('"use strict";return (' + expression + ')')();
      setResult(evalResult.toString());
    } catch (error) {
      setResult('خطا');
    }
  };

  const buttons = [
    ['sin', 'cos', 'tan', '(', ')'],
    ['π', '√', '^', '÷', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', 'C']
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          ماشین حساب علمی
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={input}
          readOnly
          className="text-left text-lg font-mono"
          dir="ltr"
        />
        
        <div className="grid grid-cols-5 gap-2">
          {buttons.map((row, i) => 
            row.map((btn, j) => (
              <Button
                key={`${i}-${j}`}
                variant={btn === '=' ? "default" : "outline"}
                className={`${btn === '=' ? 'row-span-2' : ''} ${['sin', 'cos', 'tan', 'π', '√', '^'].includes(btn) ? 'bg-secondary/50' : ''}`}
                onClick={() => {
                  if (btn === 'C') handleClear();
                  else if (btn === '=') calculateResult();
                  else if (['+', '-', '×', '÷', '^'].includes(btn)) handleOperatorClick(btn);
                  else handleNumberClick(btn);
                }}
              >
                {btn}
              </Button>
            ))
          )}
        </div>

        {result && (
          <OutcomeInfoCard outcome={result} />
        )}
      </CardContent>
    </Card>
  );
}
