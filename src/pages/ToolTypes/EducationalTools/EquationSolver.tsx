import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowRight, AlertCircle } from "lucide-react";

const EquationSolver = () => {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState<any>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  const solveEquation = () => {
    setError("");
    setSolution(null);
    setSteps([]);

    if (!equation.trim()) {
      setError("لطفاً معادله‌ای وارد کنید");
      return;
    }

    try {
      // Clean and standardize the equation
      let cleanEquation = equation.replace(/\s/g, '').toLowerCase();
      
      // Check if it's a linear equation in form ax + b = c
      const linearMatch = cleanEquation.match(/^([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)=([+-]?\d*\.?\d*)$/);
      
      if (linearMatch) {
        solveLinearEquation(linearMatch);
        return;
      }

      // Check if it's a quadratic equation in form ax² + bx + c = 0
      const quadraticMatch = cleanEquation.match(/^([+-]?\d*\.?\d*)x²?([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)=0$/);
      
      if (quadraticMatch) {
        solveQuadraticEquation(quadraticMatch);
        return;
      }

      // Check simple arithmetic
      const arithmeticMatch = cleanEquation.match(/^([+-]?\d*\.?\d*)([+\-*/])([+-]?\d*\.?\d*)=([+-]?\d*\.?\d*)$/);
      
      if (arithmeticMatch) {
        solveArithmetic(arithmeticMatch);
        return;
      }

      setError("فرمت معادله شناخته نشد. از فرمت‌هایی مثل 'x + 5 = 10' یا '2x² + 3x - 1 = 0' استفاده کنید");
      
    } catch (err) {
      setError("خطا در حل معادله");
    }
  };

  const solveLinearEquation = (match: RegExpMatchArray) => {
    const a = parseFloat(match[1]) || 1;
    const b = parseFloat(match[2]) || 0;
    const c = parseFloat(match[3]) || 0;

    const solutionSteps = [];
    solutionSteps.push(`معادله اصلی: ${a}x + (${b}) = ${c}`);
    
    if (a === 0) {
      if (b === c) {
        setSolution("بی‌نهایت جواب");
        solutionSteps.push("چون ضریب x صفر است و دو طرف معادله برابرند، معادله بی‌نهایت جواب دارد");
      } else {
        setSolution("بدون جواب");
        solutionSteps.push("چون ضریب x صفر است و دو طرف معادله برابر نیستند، معادله جواب ندارد");
      }
    } else {
      const newC = c - b;
      solutionSteps.push(`${b} را از دو طرف کم می‌کنیم: ${a}x = ${newC}`);
      
      const x = newC / a;
      solutionSteps.push(`دو طرف را بر ${a} تقسیم می‌کنیم: x = ${newC}/${a}`);
      solutionSteps.push(`x = ${x}`);
      
      setSolution(x);
    }
    
    setSteps(solutionSteps);
  };

  const solveQuadraticEquation = (match: RegExpMatchArray) => {
    const a = parseFloat(match[1]) || 1;
    const b = parseFloat(match[2]) || 0;
    const c = parseFloat(match[3]) || 0;

    const solutionSteps = [];
    solutionSteps.push(`معادله درجه دوم: ${a}x² + (${b})x + (${c}) = 0`);
    
    const discriminant = b * b - 4 * a * c;
    solutionSteps.push(`محاسبه تشخیص‌دهنده: Δ = b² - 4ac = ${b}² - 4×${a}×${c} = ${discriminant}`);

    if (discriminant < 0) {
      setSolution("جواب حقیقی ندارد");
      solutionSteps.push("چون تشخیص‌دهنده منفی است، معادله جواب حقیقی ندارد");
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      solutionSteps.push(`چون تشخیص‌دهنده صفر است، یک جواب مضاعف داریم:`);
      solutionSteps.push(`x = -b/2a = ${-b}/${2 * a} = ${x}`);
      setSolution([x]);
    } else {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const x1 = (-b + sqrtDiscriminant) / (2 * a);
      const x2 = (-b - sqrtDiscriminant) / (2 * a);
      
      solutionSteps.push(`چون تشخیص‌دهنده مثبت است، دو جواب داریم:`);
      solutionSteps.push(`x₁ = (-b + √Δ)/2a = (${-b} + √${discriminant})/${2 * a} = ${x1.toFixed(3)}`);
      solutionSteps.push(`x₂ = (-b - √Δ)/2a = (${-b} - √${discriminant})/${2 * a} = ${x2.toFixed(3)}`);
      
      setSolution([x1, x2]);
    }
    
    setSteps(solutionSteps);
  };

  const solveArithmetic = (match: RegExpMatchArray) => {
    const num1 = parseFloat(match[1]);
    const operator = match[2];
    const num2 = parseFloat(match[3]);
    const result = parseFloat(match[4]);

    const solutionSteps = [];
    let unknown;

    switch (operator) {
      case '+':
        unknown = result - num1;
        solutionSteps.push(`${num1} + x = ${result}`);
        solutionSteps.push(`x = ${result} - ${num1} = ${unknown}`);
        break;
      case '-':
        unknown = num1 - result;
        solutionSteps.push(`${num1} - x = ${result}`);
        solutionSteps.push(`x = ${num1} - ${result} = ${unknown}`);
        break;
      case '*':
        unknown = result / num1;
        solutionSteps.push(`${num1} × x = ${result}`);
        solutionSteps.push(`x = ${result} ÷ ${num1} = ${unknown}`);
        break;
      case '/':
        unknown = num1 / result;
        solutionSteps.push(`${num1} ÷ x = ${result}`);
        solutionSteps.push(`x = ${num1} ÷ ${result} = ${unknown}`);
        break;
    }

    setSolution(unknown);
    setSteps(solutionSteps);
  };

  const exampleEquations = [
    "2x + 5 = 11",
    "x² - 4x + 3 = 0",
    "3x - 7 = 14",
    "x² + 2x - 8 = 0"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            حل‌کننده معادلات ریاضی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            معادلات خطی و درجه دوم خود را وارد کنید تا با نمایش مراحل حل شوند.
          </p>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="مثال: 2x + 5 = 11 یا x² - 4x + 3 = 0"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && solveEquation()}
                className="text-left"
                dir="ltr"
              />
            </div>

            <Button onClick={solveEquation} className="w-full" disabled={!equation.trim()}>
              <Calculator className="w-4 h-4 ml-2" />
              حل معادله
            </Button>

            {error && (
              <div className="p-3 border border-destructive/20 rounded-lg bg-destructive/5 text-destructive">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium">نمونه معادلات:</p>
              <div className="flex flex-wrap gap-2">
                {exampleEquations.map((ex, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setEquation(ex)}
                  >
                    {ex}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {(solution !== null || steps.length > 0) && (
            <div className="mt-6 space-y-4 p-4 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-semibold">مراحل حل:</h3>
              
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-background rounded">
                    <Badge variant="outline" className="min-w-8 h-6 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>

              {solution !== null && (
                <div className="p-4 bg-primary/10 rounded-lg border-r-4 border-primary">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <strong>جواب نهایی:</strong>
                    <span className="text-lg font-mono">
                      {Array.isArray(solution) 
                        ? solution.map((x, i) => `x${i+1} = ${typeof x === 'number' ? x.toFixed(3) : x}`).join(', ')
                        : typeof solution === 'number' 
                          ? `x = ${solution.toFixed(3)}`
                          : solution
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EquationSolver;