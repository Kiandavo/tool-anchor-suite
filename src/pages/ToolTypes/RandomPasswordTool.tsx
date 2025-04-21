
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Key, Lock } from 'lucide-react';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function RandomPasswordTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Generate password on component mount and when settings change
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    
    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        toast({
          title: "کپی شد!",
          description: "رمز عبور در کلیپ‌بورد ذخیره شد",
        });
      })
      .catch(err => {
        toast({
          title: "خطا در کپی",
          description: "متأسفانه امکان کپی رمز عبور وجود ندارد",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-6">
      <ToolInfoCard 
        name="رمز عبور تصادفی" 
        description="با این ابزار می‌توانید رمزهای عبور ایمن و تصادفی تولید کنید. طول و نوع کاراکترها را انتخاب کنید تا رمز عبور مناسب خود را بسازید."
        learnMoreUrl="https://en.wikipedia.org/wiki/Password_strength"
      />

      <Card className="border border-primary/10">
        <CardContent className="pt-6">
          <div className="relative">
            <Input
              value={password}
              readOnly
              className="pr-10 font-mono text-lg h-14 text-center bg-muted/50"
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-3">
              <Lock className="text-muted-foreground" size={18} />
            </div>
          </div>

          <div className="flex mt-4 gap-2">
            <Button onClick={generatePassword} className="flex-1 gap-2">
              <RefreshCw size={18} />
              تولید مجدد
            </Button>
            <Button onClick={copyToClipboard} variant="outline" className="flex-1 gap-2">
              <Copy size={18} />
              {copied ? "کپی شد!" : "کپی کردن"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">طول رمز: {length} کاراکتر</span>
              <span className="text-xs text-muted-foreground">
                {length < 8 ? "ضعیف" : length < 12 ? "متوسط" : "قوی"}
              </span>
            </div>
            <Slider
              value={[length]}
              min={4}
              max={32}
              step={1}
              onValueChange={(value) => setLength(value[0])}
              className="py-4"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="ml-2">حروف بزرگ (A-Z)</span>
              </div>
              <Switch
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="ml-2">اعداد (0-9)</span>
              </div>
              <Switch
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="ml-2">نمادها (!@#$%...)</span>
              </div>
              <Switch
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <OutcomeInfoCard 
        outcome="رمز عبور تصادفی با موفقیت ایجاد شد. برای امنیت بیشتر، از ترکیبی از حروف بزرگ و کوچک، اعداد و نمادها استفاده کنید و طول رمز را حداقل 12 کاراکتر در نظر بگیرید."
        success={true}
      />
    </div>
  );
}
