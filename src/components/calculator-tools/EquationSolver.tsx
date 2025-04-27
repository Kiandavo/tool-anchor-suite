
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export function EquationSolver() {
  const [linearEquation, setLinearEquation] = useState('');
  const [quadraticA, setQuadraticA] = useState('');
  const [quadraticB, setQuadraticB] = useState('');
  const [quadraticC, setQuadraticC] = useState('');
  const [systemEq1, setSystemEq1] = useState('');
  const [systemEq2, setSystemEq2] = useState('');
  
  const [linearResult, setLinearResult] = useState<string | null>(null);
  const [quadraticResult, setQuadraticResult] = useState<string | null>(null);
  const [systemResult, setSystemResult] = useState<string | null>(null);
  
  // حل معادله خطی ax + b = 0
  const solveLinearEquation = () => {
    try {
      // تبدیل معادله به فرم استاندارد ax + b = 0
      // این یک پیاده‌سازی ساده است و می‌تواند بهبود یابد
      let eq = linearEquation.replace(/\s/g, '');
      
      // بررسی معتبر بودن معادله
      if (!eq.includes('=')) {
        toast.error('معادله باید شامل علامت = باشد');
        return;
      }
      
      const parts = eq.split('=');
      if (parts.length !== 2) {
        toast.error('معادله معتبر نیست. فقط یک علامت = باید وجود داشته باشد');
        return;
      }
      
      // انتقال همه عبارات به سمت چپ معادله
      let leftSide = parts[0];
      let rightSide = parts[1];
      
      // تبدیل معادله به فرم ax + b = 0
      if (rightSide !== '0') {
        // انتقال عبارت سمت راست به چپ با علامت مخالف
        const modifiedRightSide = rightSide
          .replace(/-/g, '±') // تغییر موقت علامت منفی
          .replace(/\+/g, '-') // تغییر علامت + به -
          .replace(/±/g, '+'); // تغییر علامت منفی موقت به +
          
        leftSide = `${leftSide}-(${modifiedRightSide})`;
      }
      
      // استخراج ضریب x
      let xCoefficient = 0;
      const xTerms = leftSide.match(/[+-]?\s*\d*\.?\d*x/g) || [];
      
      for (const term of xTerms) {
        let coef = term.replace('x', '');
        if (coef === '+' || coef === '') coef = '1';
        else if (coef === '-') coef = '-1';
        xCoefficient += parseFloat(coef);
      }
      
      // استخراج عدد ثابت
      let constant = 0;
      const constantTerms = leftSide.match(/[+-]?\s*\d+\.?\d*(?![x\w])/g) || [];
      
      for (const term of constantTerms) {
        constant += parseFloat(term);
      }
      
      // حل معادله ax + b = 0
      if (xCoefficient === 0) {
        if (constant === 0) {
          setLinearResult('این معادله دارای جواب‌های نامتناهی است (همه اعداد حقیقی).');
        } else {
          setLinearResult('این معادله جواب ندارد.');
        }
      } else {
        const solution = -constant / xCoefficient;
        setLinearResult(`x = ${solution.toFixed(4)}`);
      }
      
      toast.success('معادله با موفقیت حل شد.');
    } catch (error) {
      console.error('Error solving linear equation:', error);
      toast.error('خطا در حل معادله. لطفاً معادله معتبری وارد کنید.');
    }
  };

  // حل معادله درجه دوم ax² + bx + c = 0
  const solveQuadraticEquation = () => {
    try {
      const a = parseFloat(quadraticA);
      const b = parseFloat(quadraticB);
      const c = parseFloat(quadraticC);
      
      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        toast.error('لطفاً مقادیر عددی معتبر وارد کنید.');
        return;
      }
      
      if (a === 0) {
        // معادله درجه اول
        if (b === 0) {
          if (c === 0) {
            setQuadraticResult('این معادله دارای جواب‌های نامتناهی است.');
          } else {
            setQuadraticResult('این معادله جواب ندارد.');
          }
        } else {
          const x = -c / b;
          setQuadraticResult(`x = ${x.toFixed(4)} (معادله خطی)`);
        }
        return;
      }
      
      // محاسبه دلتا
      const delta = b*b - 4*a*c;
      
      if (delta < 0) {
        // جواب‌های مختلط
        const realPart = -b / (2*a);
        const imagPart = Math.sqrt(Math.abs(delta)) / (2*a);
        setQuadraticResult(
          `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i\n` +
          `x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`
        );
      } else if (delta === 0) {
        // یک جواب مضاعف
        const x = -b / (2*a);
        setQuadraticResult(`x = ${x.toFixed(4)} (جواب مضاعف)`);
      } else {
        // دو جواب حقیقی متمایز
        const x1 = (-b + Math.sqrt(delta)) / (2*a);
        const x2 = (-b - Math.sqrt(delta)) / (2*a);
        setQuadraticResult(`x₁ = ${x1.toFixed(4)}\nx₂ = ${x2.toFixed(4)}`);
      }
      
      toast.success('معادله درجه دوم با موفقیت حل شد.');
    } catch (error) {
      console.error('Error solving quadratic equation:', error);
      toast.error('خطا در حل معادله. لطفاً مقادیر معتبری وارد کنید.');
    }
  };

  // حل دستگاه معادلات خطی 2×2
  const solveSystemOfEquations = () => {
    try {
      // فرمت معادلات باید به شکل ax + by = c باشد
      // پارس کردن معادله اول
      const eq1 = systemEq1.replace(/\s/g, '');
      if (!eq1.includes('=')) {
        toast.error('معادله اول باید شامل علامت = باشد');
        return;
      }
      
      // پارس کردن معادله دوم
      const eq2 = systemEq2.replace(/\s/g, '');
      if (!eq2.includes('=')) {
        toast.error('معادله دوم باید شامل علامت = باشد');
        return;
      }
      
      // تجزیه معادلات به ضرایب
      // این یک پیاده‌سازی ساده است که می‌تواند بهبود یابد
      let a1 = 0, b1 = 0, c1 = 0;
      let a2 = 0, b2 = 0, c2 = 0;
      
      // استخراج ضرایب معادله اول
      const parts1 = eq1.split('=');
      
      // پارس کردن ضریب x در معادله اول
      const xMatch1 = parts1[0].match(/([+-]?\d*\.?\d*)x/);
      if (xMatch1) {
        let coef = xMatch1[1];
        if (coef === '+' || coef === '') coef = '1';
        else if (coef === '-') coef = '-1';
        a1 = parseFloat(coef);
      }
      
      // پارس کردن ضریب y در معادله اول
      const yMatch1 = parts1[0].match(/([+-]?\d*\.?\d*)y/);
      if (yMatch1) {
        let coef = yMatch1[1];
        if (coef === '+' || coef === '') coef = '1';
        else if (coef === '-') coef = '-1';
        b1 = parseFloat(coef);
      }
      
      // پارس کردن عدد سمت راست معادله اول
      c1 = parseFloat(parts1[1]);
      
      // استخراج ضرایب معادله دوم
      const parts2 = eq2.split('=');
      
      // پارس کردن ضریب x در معادله دوم
      const xMatch2 = parts2[0].match(/([+-]?\d*\.?\d*)x/);
      if (xMatch2) {
        let coef = xMatch2[1];
        if (coef === '+' || coef === '') coef = '1';
        else if (coef === '-') coef = '-1';
        a2 = parseFloat(coef);
      }
      
      // پارس کردن ضریب y در معادله دوم
      const yMatch2 = parts2[0].match(/([+-]?\d*\.?\d*)y/);
      if (yMatch2) {
        let coef = yMatch2[1];
        if (coef === '+' || coef === '') coef = '1';
        else if (coef === '-') coef = '-1';
        b2 = parseFloat(coef);
      }
      
      // پارس کردن عدد سمت راست معادله دوم
      c2 = parseFloat(parts2[1]);
      
      // حل دستگاه معادلات با روش کرامر
      const determinant = a1 * b2 - a2 * b1;
      
      if (determinant === 0) {
        // دستگاه معادلات یا جواب ندارد یا دارای بی‌نهایت جواب است
        const det1 = c1 * b2 - c2 * b1;
        const det2 = a1 * c2 - a2 * c1;
        
        if (det1 === 0 && det2 === 0) {
          setSystemResult('دستگاه دارای بی‌نهایت جواب است (معادلات وابسته هستند).');
        } else {
          setSystemResult('دستگاه جواب ندارد (معادلات ناسازگار هستند).');
        }
      } else {
        // دستگاه دارای یک جواب یکتا است
        const x = (c1 * b2 - c2 * b1) / determinant;
        const y = (a1 * c2 - a2 * c1) / determinant;
        
        setSystemResult(`x = ${x.toFixed(4)}\ny = ${y.toFixed(4)}`);
      }
      
      toast.success('دستگاه معادلات با موفقیت حل شد.');
    } catch (error) {
      console.error('Error solving system of equations:', error);
      toast.error('خطا در حل دستگاه معادلات. لطفاً معادلات معتبری وارد کنید.');
    }
  };
  
  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6">
        <Tabs defaultValue="linear" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="linear">معادله خطی</TabsTrigger>
            <TabsTrigger value="quadratic">معادله درجه دوم</TabsTrigger>
            <TabsTrigger value="system">دستگاه معادلات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="linear" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linear-equation">معادله خطی (مثال: 2x + 3 = 0)</Label>
              <Input
                id="linear-equation"
                value={linearEquation}
                onChange={(e) => setLinearEquation(e.target.value)}
                placeholder="معادله را وارد کنید..."
                className="text-right"
              />
            </div>
            
            <Button onClick={solveLinearEquation} className="w-full">حل معادله</Button>
            
            {linearResult && (
              <div className="bg-muted rounded-lg p-4 mt-4">
                <h3 className="font-medium mb-2">نتیجه:</h3>
                <p className="text-right">{linearResult}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="quadratic" className="space-y-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">معادله به فرم ax² + bx + c = 0</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quadratic-a">ضریب a</Label>
                  <Input
                    id="quadratic-a"
                    value={quadraticA}
                    onChange={(e) => setQuadraticA(e.target.value)}
                    placeholder="مثال: 1"
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quadratic-b">ضریب b</Label>
                  <Input
                    id="quadratic-b"
                    value={quadraticB}
                    onChange={(e) => setQuadraticB(e.target.value)}
                    placeholder="مثال: -5"
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quadratic-c">ضریب c</Label>
                  <Input
                    id="quadratic-c"
                    value={quadraticC}
                    onChange={(e) => setQuadraticC(e.target.value)}
                    placeholder="مثال: 6"
                    className="text-right"
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={solveQuadraticEquation} className="w-full">حل معادله درجه دوم</Button>
            
            {quadraticResult && (
              <div className="bg-muted rounded-lg p-4 mt-4">
                <h3 className="font-medium mb-2">نتیجه:</h3>
                <pre className="whitespace-pre-wrap text-right">{quadraticResult}</pre>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-eq1">معادله اول (مثال: 2x + 3y = 5)</Label>
                <Input
                  id="system-eq1"
                  value={systemEq1}
                  onChange={(e) => setSystemEq1(e.target.value)}
                  placeholder="معادله اول را وارد کنید..."
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system-eq2">معادله دوم (مثال: 4x - y = 3)</Label>
                <Input
                  id="system-eq2"
                  value={systemEq2}
                  onChange={(e) => setSystemEq2(e.target.value)}
                  placeholder="معادله دوم را وارد کنید..."
                  className="text-right"
                />
              </div>
            </div>
            
            <Button onClick={solveSystemOfEquations} className="w-full">حل دستگاه معادلات</Button>
            
            {systemResult && (
              <div className="bg-muted rounded-lg p-4 mt-4">
                <h3 className="font-medium mb-2">نتیجه:</h3>
                <pre className="whitespace-pre-wrap text-right">{systemResult}</pre>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
