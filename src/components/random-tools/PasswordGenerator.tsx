
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Dices, Copy, Eye, EyeOff, RefreshCw, Save, CheckCircle } from 'lucide-react';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [strength, setStrength] = useState(0);
  const [savedPasswords, setSavedPasswords] = useState<string[]>([]);
  
  // تولید رمز تصادفی
  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // حداقل یک گزینه باید انتخاب شده باشد
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.error('لطفاً حداقل یک نوع کاراکتر را انتخاب کنید.');
      return;
    }
    
    // ایجاد مجموعه کاراکترها براساس گزینه‌های انتخاب شده
    let charset = '';
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    // تولید رمز عبور
    let newPassword = '';
    
    // اطمینان از اینکه حداقل یک کاراکتر از هر نوع انتخاب شده وجود دارد
    if (includeUppercase) newPassword += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    if (includeLowercase) newPassword += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    if (includeNumbers) newPassword += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (includeSymbols) newPassword += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    // تکمیل رمز عبور تا طول مورد نظر
    while (newPassword.length < length) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    
    // بهم زدن ترتیب کاراکترها (shuffle)
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('').slice(0, length);
    
    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
    
    toast.success('رمز عبور جدید تولید شد.');
  };
  
  // محاسبه قدرت رمز عبور
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    
    // امتیاز براساس طول
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (pass.length >= 16) score += 1;
    
    // امتیاز براساس تنوع کاراکترها
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    // امتیاز نهایی (از 0 تا 100)
    const normalizedScore = Math.min(100, Math.round((score / 7) * 100));
    setStrength(normalizedScore);
  };
  
  // کپی رمز به کلیپ‌بورد
  const copyPassword = () => {
    if (!password) {
      toast.error('هنوز رمزی تولید نشده است.');
      return;
    }
    
    navigator.clipboard.writeText(password);
    toast.success('رمز عبور در کلیپ‌بورد کپی شد.');
  };
  
  // ذخیره رمز عبور
  const savePassword = () => {
    if (!password) {
      toast.error('هنوز رمزی تولید نشده است.');
      return;
    }
    
    if (savedPasswords.includes(password)) {
      toast.info('این رمز قبلاً ذخیره شده است.');
      return;
    }
    
    const updatedPasswords = [...savedPasswords, password];
    setSavedPasswords(updatedPasswords);
    localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
    toast.success('رمز عبور با موفقیت ذخیره شد.');
  };
  
  // حذف رمز ذخیره شده
  const removePassword = (passToRemove: string) => {
    const updatedPasswords = savedPasswords.filter(pass => pass !== passToRemove);
    setSavedPasswords(updatedPasswords);
    localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
    toast.info('رمز عبور حذف شد.');
  };
  
  // بارگذاری رمزهای ذخیره شده از localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedPasswords');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedPasswords(parsed);
        }
      } catch (e) {
        console.error('Error parsing saved passwords', e);
      }
    }
  }, []);
  
  // تولید رمز عبور اولیه
  useEffect(() => {
    generatePassword();
  }, []);
  
  // تعیین رنگ نمایش استحکام رمز عبور
  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // توضیح استحکام رمز عبور
  const getStrengthText = () => {
    if (strength < 40) return 'ضعیف';
    if (strength < 70) return 'متوسط';
    return 'قوی';
  };
  
  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              className="w-full px-4 py-3 border rounded-lg text-lg font-mono bg-muted"
              dir="ltr"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 transform -translate-y-1/2 left-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={generatePassword} className="flex items-center gap-2 flex-1">
              <RefreshCw size={18} />
              تولید مجدد
            </Button>
            <Button variant="outline" onClick={copyPassword} className="flex items-center gap-2 flex-1">
              <Copy size={18} />
              کپی
            </Button>
            <Button variant="secondary" onClick={savePassword} className="flex items-center gap-2 flex-1">
              <Save size={18} />
              ذخیره
            </Button>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>قدرت رمز: {getStrengthText()}</span>
              <span>{strength}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${getStrengthColor()}`}
                style={{ width: `${strength}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">تنظیمات</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>طول رمز عبور: {length}</Label>
              <span className="text-sm text-muted-foreground">{length} کاراکتر</span>
            </div>
            <Slider
              value={[length]}
              min={8}
              max={32}
              step={1}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="uppercase">حروف بزرگ (A-Z)</Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="lowercase">حروف کوچک (a-z)</Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="numbers">اعداد (0-9)</Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="symbols">نمادها (!@#$%...)</Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>
          
          <Button 
            onClick={generatePassword}
            variant="default"
            className="w-full flex gap-2"
          >
            <Dices size={18} />
            تولید رمز عبور
          </Button>
        </div>
        
        {savedPasswords.length > 0 && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">رمزهای ذخیره شده ({savedPasswords.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {savedPasswords.map((savedPass, index) => (
                <div key={index} className="flex justify-between items-center border p-2 rounded-lg">
                  <div className="font-mono text-sm truncate ml-2 pl-2" dir="ltr">
                    {savedPass.substring(0, 3)}••••••••{savedPass.substring(savedPass.length - 3)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(savedPass);
                        toast.success('رمز عبور کپی شد');
                      }}
                    >
                      <Copy size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setPassword(savedPass);
                        calculatePasswordStrength(savedPass);
                        toast.success('رمز عبور بارگذاری شد');
                      }}
                    >
                      <CheckCircle size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removePassword(savedPass)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
