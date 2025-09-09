import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

export const RomanNumeralConverter = () => {
  const [decimalInput, setDecimalInput] = useState('');
  const [romanInput, setRomanInput] = useState('');
  const [decimalResult, setDecimalResult] = useState('');
  const [romanResult, setRomanResult] = useState('');

  const decimalToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return 'خارج از محدوده (1-3999)';
    
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    
    let result = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += numerals[i];
        num -= values[i];
      }
    }
    return result;
  };

  const romanToDecimal = (roman: string): number => {
    const values: Record<string, number> = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = values[roman[i]];
      const next = values[roman[i + 1]];
      
      if (next && current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }
    return result;
  };

  const handleDecimalToRoman = () => {
    const num = parseInt(decimalInput);
    if (isNaN(num)) {
      toast.error('لطفاً عدد معتبری وارد کنید');
      return;
    }
    setRomanResult(decimalToRoman(num));
  };

  const handleRomanToDecimal = () => {
    if (!romanInput.match(/^[IVXLCDM]+$/i)) {
      toast.error('لطفاً عدد رومی معتبری وارد کنید');
      return;
    }
    setDecimalResult(romanToDecimal(romanInput.toUpperCase()).toString());
  };

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('کپی شد!');
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              عدد به رومی
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="decimal">عدد (1-3999)</Label>
              <Input
                id="decimal"
                type="number"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                placeholder="مثال: 2023"
                min="1"
                max="3999"
              />
            </div>
            <Button onClick={handleDecimalToRoman} className="w-full">
              تبدیل به رومی
            </Button>
            {romanResult && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono">{romanResult}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyResult(romanResult)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              رومی به عدد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="roman">عدد رومی</Label>
              <Input
                id="roman"
                value={romanInput}
                onChange={(e) => setRomanInput(e.target.value)}
                placeholder="مثال: MMXXIII"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
            <Button onClick={handleRomanToDecimal} className="w-full">
              تبدیل به عدد
            </Button>
            {decimalResult && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono">{decimalResult}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyResult(decimalResult)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>راهنمای اعداد رومی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-semibold">اعداد پایه:</div>
              <div className="space-y-1">
                <div>I = 1</div>
                <div>V = 5</div>
                <div>X = 10</div>
                <div>L = 50</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">اعداد بالاتر:</div>
              <div className="space-y-1">
                <div>C = 100</div>
                <div>D = 500</div>
                <div>M = 1000</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">قوانین کم کردن:</div>
              <div className="space-y-1">
                <div>IV = 4</div>
                <div>IX = 9</div>
                <div>XL = 40</div>
                <div>XC = 90</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">مثال‌ها:</div>
              <div className="space-y-1">
                <div>CD = 400</div>
                <div>CM = 900</div>
                <div>MMXX = 2020</div>
                <div>MCMXC = 1990</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};