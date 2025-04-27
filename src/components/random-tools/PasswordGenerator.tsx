
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Key } from 'lucide-react';
import { toast } from 'sonner';
import { OutcomeInfoCard } from '../OutcomeInfoCard';
import { copyToClipboard } from '@/utils/randomUtils';

export function PasswordGenerator() {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let chars = '';
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) {
      toast.error("لطفاً حداقل یک گزینه را انتخاب کنید");
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPassword);
    toast.success("رمز عبور با موفقیت تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">طول رمز عبور: {length}</p>
            <Slider
              value={[length]}
              min={4}
              max={32}
              step={1}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
              />
              <label htmlFor="uppercase" className="text-sm font-medium">
                شامل حروف بزرگ (A-Z)
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
              />
              <label htmlFor="lowercase" className="text-sm font-medium">
                شامل حروف کوچک (a-z)
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
              />
              <label htmlFor="numbers" className="text-sm font-medium">
                شامل اعداد (0-9)
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
              />
              <label htmlFor="symbols" className="text-sm font-medium">
                شامل نمادها (!@#$%&)
              </label>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full flex items-center gap-2">
            <Key size={18} />
            تولید رمز عبور
          </Button>
        </div>

        {password && (
          <div className="mt-4">
            <div 
              className="p-4 bg-muted rounded-lg font-mono text-center cursor-pointer"
              onClick={() => copyToClipboard(password)}
            >
              {password}
            </div>
            <OutcomeInfoCard outcome="برای کپی کردن رمز عبور کلیک کنید" success={true} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
