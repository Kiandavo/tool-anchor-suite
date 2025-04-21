
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calculator, Check, X } from 'lucide-react';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function PrimeCheckerTool() {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<{ isPrime: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const checkPrime = () => {
    setError(null);
    
    // Validate input
    const num = parseInt(number.trim(), 10);
    
    if (isNaN(num)) {
      setError('لطفا یک عدد صحیح وارد کنید');
      return;
    }
    
    if (num < 2) {
      setResult({
        isPrime: false,
        message: `عدد ${num} اول نیست. اعداد اول از 2 شروع می‌شوند.`
      });
      return;
    }
    
    // Check if prime
    const isPrime = isPrimeNumber(num);
    
    // Set result
    setResult({
      isPrime,
      message: isPrime 
        ? `عدد ${num} یک عدد اول است.` 
        : `عدد ${num} یک عدد اول نیست.`
    });
  };

  // Function to check if a number is prime
  const isPrimeNumber = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // Check using 6k ± 1 optimization
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setNumber(value);
  };

  return (
    <div className="space-y-6">
      <ToolInfoCard 
        name="بررسی عدد اول" 
        description="با این ابزار می‌توانید بررسی کنید که آیا یک عدد، عدد اول است یا خیر. عدد اول به عددی گفته می‌شود که فقط بر 1 و خودش بخش‌پذیر باشد."
        learnMoreUrl="https://en.wikipedia.org/wiki/Prime_number"
      />

      <Card className="border border-primary/10">
        <CardContent className="pt-6">
          <div className="relative">
            <Input
              value={number}
              onChange={handleInputChange}
              placeholder="عدد مورد نظر را وارد کنید"
              className="pr-10 text-lg h-14 text-center"
              maxLength={12}
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-3">
              <Calculator className="text-muted-foreground" size={18} />
            </div>
          </div>

          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}

          <Button 
            onClick={checkPrime} 
            className="w-full mt-4 gap-2"
            disabled={!number}
          >
            <Calculator size={18} />
            بررسی عدد اول
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {result.isPrime ? (
                <div className="rounded-full bg-green-100 p-2">
                  <Check className="text-green-600" size={24} />
                </div>
              ) : (
                <div className="rounded-full bg-red-100 p-2">
                  <X className="text-red-500" size={24} />
                </div>
              )}
              <h3 className="text-xl font-semibold">{result.message}</h3>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <OutcomeInfoCard 
          outcome={result.isPrime 
            ? "عدد اول به عددی گفته می‌شود که فقط بر 1 و خودش بخش‌پذیر باشد. این عدد، عدد اول است."
            : "عدد اول به عددی گفته می‌شود که فقط بر 1 و خودش بخش‌پذیر باشد. این عدد قابل تقسیم بر اعداد دیگر است، بنابراین عدد اول نیست."
          }
          success={result.isPrime}
        />
      )}
    </div>
  );
}
