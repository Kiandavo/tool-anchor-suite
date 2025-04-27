
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Copy, RefreshCw, Calculator } from 'lucide-react';

export function NumberBaseConverter() {
  const [inputValue, setInputValue] = useState('');
  const [inputBase, setInputBase] = useState('10');
  const [outputBases, setOutputBases] = useState<Record<string, string>>({
    '2': '',  // باینری
    '8': '',  // اکتال
    '10': '', // دسیمال
    '16': '', // هگزادسیمال
    '32': '', // Base32
    '36': ''  // Base36
  });
  const [error, setError] = useState<string | null>(null);
  
  // تبدیل عدد از یک مبنا به مبناهای دیگر
  const convertNumber = () => {
    try {
      setError(null);
      
      if (!inputValue.trim()) {
        toast.warning('لطفاً یک عدد وارد کنید.');
        return;
      }
      
      // تبدیل عدد ورودی به مبنای ۱۰ (دسیمال)
      const decimalValue = parseInt(inputValue, parseInt(inputBase));
      
      if (isNaN(decimalValue)) {
        setError(`عدد وارد شده با مبنای ${inputBase} معتبر نیست.`);
        toast.error('عدد وارد شده معتبر نیست.');
        return;
      }
      
      // تبدیل عدد دسیمال به مبناهای دیگر
      const newOutputBases: Record<string, string> = {};
      
      for (const base of Object.keys(outputBases)) {
        const baseNumber = parseInt(base);
        newOutputBases[base] = decimalValue.toString(baseNumber).toUpperCase();
      }
      
      setOutputBases(newOutputBases);
      toast.success('عدد با موفقیت به مبناهای مختلف تبدیل شد.');
    } catch (err) {
      console.error('Conversion error:', err);
      setError('خطا در تبدیل عدد. لطفاً ورودی را بررسی کنید.');
      toast.error('خطای تبدیل عدد.');
    }
  };
  
  // کپی نتیجه به کلیپ‌بورد
  const copyResult = (value: string, baseName: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`مقدار مبنای ${baseName} کپی شد.`);
  };
  
  // پاک کردن همه فیلدها
  const clearAll = () => {
    setInputValue('');
    setInputBase('10');
    setOutputBases({
      '2': '',
      '8': '',
      '10': '',
      '16': '',
      '32': '',
      '36': ''
    });
    setError(null);
    toast.info('همه فیلدها پاک شد.');
  };
  
  // نام مبناها
  const baseNames: Record<string, string> = {
    '2': 'باینری',
    '8': 'اکتال',
    '10': 'دسیمال',
    '16': 'هگزادسیمال',
    '32': 'Base32',
    '36': 'Base36'
  };
  
  // تعیین اعتبار عدد مبنای خاص
  const isValidDigitForBase = (digit: string, base: number) => {
    const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitValue = validChars.indexOf(digit.toUpperCase());
    return digitValue !== -1 && digitValue < base;
  };
  
  // بررسی اعتبار ورودی هنگام تایپ
  const validateInput = (value: string, base: number) => {
    for (let i = 0; i < value.length; i++) {
      if (!isValidDigitForBase(value[i], base)) {
        return false;
      }
    }
    return true;
  };
  
  // دریافت محدودیت کاراکترهای مجاز براساس مبنا
  const getBasePattern = (base: number): string => {
    const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
    return `[${validChars}]`;
  };
  
  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="standard">تبدیل استاندارد</TabsTrigger>
            <TabsTrigger value="advanced">تبدیل پیشرفته</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="input-value">عدد ورودی</Label>
                  <Input
                    id="input-value"
                    value={inputValue}
                    onChange={(e) => {
                      const newValue = e.target.value.toUpperCase();
                      const base = parseInt(inputBase);
                      if (newValue === '' || validateInput(newValue, base)) {
                        setInputValue(newValue);
                      }
                    }}
                    placeholder="عدد را وارد کنید..."
                    dir="ltr"
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-2 md:w-1/3">
                  <Label htmlFor="input-base">مبنای ورودی</Label>
                  <select
                    id="input-base"
                    value={inputBase}
                    onChange={(e) => {
                      setInputBase(e.target.value);
                      // بررسی مجدد اعتبار عدد ورودی با مبنای جدید
                      if (inputValue && !validateInput(inputValue, parseInt(e.target.value))) {
                        setInputValue('');
                        toast.warning('عدد ورودی برای مبنای انتخابی معتبر نیست و حذف شد.');
                      }
                    }}
                    className="w-full border rounded-md px-3 py-2 font-mono"
                  >
                    <option value="2">مبنای 2 (باینری)</option>
                    <option value="8">مبنای 8 (اکتال)</option>
                    <option value="10">مبنای 10 (دسیمال)</option>
                    <option value="16">مبنای 16 (هگزادسیمال)</option>
                    <option value="32">مبنای 32</option>
                    <option value="36">مبنای 36</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={convertNumber} className="flex gap-2 flex-1">
                  <Calculator size={18} />
                  تبدیل کن
                </Button>
                <Button variant="outline" onClick={clearAll} className="flex gap-2">
                  <RefreshCw size={18} />
                  پاک کردن
                </Button>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg">
                  {error}
                </div>
              )}
              
              {/* نتایج تبدیل */}
              <div className="space-y-3">
                <h3 className="font-medium">نتایج تبدیل</h3>
                
                {Object.entries(outputBases).map(([base, value]) => (
                  value && (
                    <div key={base} className="flex items-center justify-between gap-2 bg-muted p-3 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{baseNames[base]} (مبنای {base}):</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">{value}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyResult(value, base)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 p-3 rounded-lg">
                در این بخش می‌توانید تبدیل بین هر مبنای دلخواه (از 2 تا 36) را انجام دهید.
              </div>
              
              {/* محتوای تب پیشرفته */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-input-value">عدد ورودی</Label>
                  <Input
                    id="custom-input-value"
                    value={inputValue}
                    onChange={(e) => {
                      const newValue = e.target.value.toUpperCase();
                      const base = parseInt(inputBase);
                      if (newValue === '' || validateInput(newValue, base)) {
                        setInputValue(newValue);
                      }
                    }}
                    placeholder="عدد را وارد کنید..."
                    dir="ltr"
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-input-base">مبنای ورودی (2-36)</Label>
                  <Input
                    id="custom-input-base"
                    type="number"
                    min="2"
                    max="36"
                    value={inputBase}
                    onChange={(e) => {
                      const newBase = Math.max(2, Math.min(36, parseInt(e.target.value) || 2));
                      setInputBase(newBase.toString());
                      // بررسی مجدد اعتبار عدد ورودی با مبنای جدید
                      if (inputValue && !validateInput(inputValue, newBase)) {
                        setInputValue('');
                        toast.warning('عدد ورودی برای مبنای انتخابی معتبر نیست و حذف شد.');
                      }
                    }}
                    dir="ltr"
                    className="font-mono"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>کاراکترهای مجاز برای مبنای انتخابی:</Label>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm text-center overflow-x-auto whitespace-nowrap">
                  {('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ').slice(0, parseInt(inputBase))}
                </div>
              </div>
              
              <Button onClick={convertNumber} className="w-full flex gap-2">
                <Calculator size={18} />
                تبدیل به همه مبناها
              </Button>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg">
                  {error}
                </div>
              )}
              
              {/* نتایج تبدیل پیشرفته */}
              <div className="space-y-3">
                <h3 className="font-medium">نتایج تبدیل</h3>
                
                {Object.entries(outputBases).map(([base, value]) => (
                  value && (
                    <div key={base} className="flex items-center justify-between gap-2 bg-muted p-3 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{baseNames[base]} (مبنای {base}):</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">{value}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyResult(value, base)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
