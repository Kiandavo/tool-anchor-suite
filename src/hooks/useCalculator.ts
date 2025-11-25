import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseCalculatorOptions {
  onCalculate?: () => void;
  onReset?: () => void;
  successMessage?: string;
}

export const useCalculator = (options: UseCalculatorOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  const calculate = useCallback(async () => {
    setIsLoading(true);
    try {
      options.onCalculate?.();
      if (options.successMessage) {
        toast({
          title: 'محاسبه انجام شد',
          description: options.successMessage,
        });
      }
    } catch (error) {
      toast({
        title: 'خطا در محاسبه',
        description: 'لطفا مقادیر را بررسی کنید',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    options.onReset?.();
    toast({
      title: 'پاک شد',
      description: 'تمام فیلدها پاک شدند',
    });
  }, [options]);

  return {
    isLoading,
    calculate,
    reset,
  };
};