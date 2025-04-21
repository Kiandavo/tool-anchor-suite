
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, Percent } from 'lucide-react';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [calcType, setCalcType] = useState<'applyDiscount' | 'findDiscount'>('applyDiscount');

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (isNaN(price) || price <= 0 || isNaN(discount) || discount < 0) {
      return;
    }

    if (calcType === 'applyDiscount') {
      if (discount > 100) {
        setResult("درصد تخفیف نمی‌تواند بیشتر از 100 باشد!");
        return;
      }
      
      const discountAmount = (price * discount) / 100;
      const finalPrice = price - discountAmount;
      
      setResult(`
      قیمت اصلی: ${price.toLocaleString('fa-IR')}
      درصد تخفیف: ${discount.toLocaleString('fa-IR')}%
      مقدار تخفیف: ${discountAmount.toLocaleString('fa-IR')}
      قیمت نهایی: ${finalPrice.toLocaleString('fa-IR')}
      `);
    } else {
      // Find discount percentage between two prices
      // Here originalPrice is the original price and discountPercent is the final price (after discount)
      const finalPrice = parseFloat(discountPercent);
      
      if (finalPrice > price) {
        setResult("قیمت نهایی نمی‌تواند بیشتر از قیمت اصلی باشد!");
        return;
      }
      
      const discountAmount = price - finalPrice;
      const discountPercentage = (discountAmount / price) * 100;
      
      setResult(`
      قیمت اصلی: ${price.toLocaleString('fa-IR')}
      قیمت نهایی: ${finalPrice.toLocaleString('fa-IR')}
      مقدار تخفیف: ${discountAmount.toLocaleString('fa-IR')}
      درصد تخفیف: ${discountPercentage.toFixed(2).toLocaleString('fa-IR')}%
      `);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setter(value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Percent className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">محاسبه‌گر تخفیف</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button
                onClick={() => setCalcType('applyDiscount')}
                className={`px-4 py-2 rounded-md ${calcType === 'applyDiscount' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                محاسبه قیمت پس از تخفیف
              </button>
              <button
                onClick={() => setCalcType('findDiscount')}
                className={`px-4 py-2 rounded-md ${calcType === 'findDiscount' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                محاسبه درصد تخفیف
              </button>
            </div>
          </div>

          {calcType === 'applyDiscount' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="originalPrice">قیمت اصلی</Label>
                <Input
                  id="originalPrice"
                  value={originalPrice}
                  onChange={(e) => handleInputChange(e, setOriginalPrice)}
                  placeholder="مثال: 100000"
                  type="text"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountPercent">درصد تخفیف</Label>
                <Input
                  id="discountPercent"
                  value={discountPercent}
                  onChange={(e) => handleInputChange(e, setDiscountPercent)}
                  placeholder="مثال: 20"
                  type="text"
                  dir="ltr"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="originalPrice">قیمت اصلی</Label>
                <Input
                  id="originalPrice"
                  value={originalPrice}
                  onChange={(e) => handleInputChange(e, setOriginalPrice)}
                  placeholder="مثال: 100000"
                  type="text"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalPrice">قیمت نهایی (با تخفیف)</Label>
                <Input
                  id="finalPrice"
                  value={discountPercent}
                  onChange={(e) => handleInputChange(e, setDiscountPercent)}
                  placeholder="مثال: 80000"
                  type="text"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          <button
            onClick={calculate}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه کن
          </button>

          {result && <OutcomeInfoCard outcome={result} />}
        </div>
      </Card>
    </div>
  );
}
