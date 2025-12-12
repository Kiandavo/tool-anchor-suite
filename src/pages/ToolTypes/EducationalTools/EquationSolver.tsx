import React, { useState, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Calculator, ArrowRight, TrendingUp, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Solution {
  type: 'linear' | 'quadratic' | 'system';
  values: number[] | string;
  steps: string[];
}

const EquationSolver = () => {
  const [mode, setMode] = useState<'linear' | 'quadratic' | 'system'>('linear');
  const [equation, setEquation] = useState('');
  const [equation2, setEquation2] = useState('');
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{ eq: string; sol: string }[]>([]);

  const persianToEnglish = (str: string) => {
    const persianNums = '۰۱۲۳۴۵۶۷۸۹';
    return str.replace(/[۰-۹]/g, (d) => String(persianNums.indexOf(d)));
  };

  const solveLinear = () => {
    setError('');
    setSolution(null);

    let eq = persianToEnglish(equation).replace(/\s/g, '').toLowerCase();
    
    // Parse ax + b = c
    const match = eq.match(/^([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)=([+-]?\d*\.?\d*)$/);
    
    if (!match) {
      setError('فرمت معادله صحیح نیست. مثال: 2x+5=11');
      return;
    }

    const a = parseFloat(match[1]) || 1;
    const b = parseFloat(match[2]) || 0;
    const c = parseFloat(match[3]) || 0;

    const steps: string[] = [];
    steps.push(`معادله: ${a}x + (${b}) = ${c}`);

    if (a === 0) {
      if (b === c) {
        setSolution({ type: 'linear', values: 'بی‌نهایت جواب', steps });
      } else {
        setSolution({ type: 'linear', values: 'بدون جواب', steps });
      }
      return;
    }

    const result = (c - b) / a;
    steps.push(`${b} را از دو طرف کم می‌کنیم: ${a}x = ${c - b}`);
    steps.push(`دو طرف را بر ${a} تقسیم می‌کنیم: x = ${result}`);

    setSolution({ type: 'linear', values: [result], steps });
    addToHistory(equation, `x = ${result}`);
  };

  const solveQuadratic = () => {
    setError('');
    setSolution(null);

    let eq = persianToEnglish(equation).replace(/\s/g, '').toLowerCase();
    
    // Parse ax² + bx + c = 0
    const match = eq.match(/^([+-]?\d*\.?\d*)x[²2]([+-]\d*\.?\d*)x([+-]\d*\.?\d*)=0$/);
    
    if (!match) {
      setError('فرمت معادله صحیح نیست. مثال: x²-4x+3=0');
      return;
    }

    const a = parseFloat(match[1]) || 1;
    const b = parseFloat(match[2]) || 0;
    const c = parseFloat(match[3]) || 0;

    const steps: string[] = [];
    steps.push(`معادله: ${a}x² + (${b})x + (${c}) = 0`);

    const discriminant = b * b - 4 * a * c;
    steps.push(`دلتا: Δ = b² - 4ac = ${b}² - 4×${a}×${c} = ${discriminant}`);

    if (discriminant < 0) {
      steps.push('چون Δ < 0، معادله جواب حقیقی ندارد');
      setSolution({ type: 'quadratic', values: 'بدون جواب حقیقی', steps });
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      steps.push(`چون Δ = 0، یک جواب مضاعف داریم: x = -b/2a = ${x}`);
      setSolution({ type: 'quadratic', values: [x], steps });
      addToHistory(equation, `x = ${x}`);
    } else {
      const sqrt = Math.sqrt(discriminant);
      const x1 = (-b + sqrt) / (2 * a);
      const x2 = (-b - sqrt) / (2 * a);
      steps.push(`x₁ = (-b + √Δ)/2a = ${x1.toFixed(3)}`);
      steps.push(`x₂ = (-b - √Δ)/2a = ${x2.toFixed(3)}`);
      setSolution({ type: 'quadratic', values: [x1, x2], steps });
      addToHistory(equation, `x₁=${x1.toFixed(2)}, x₂=${x2.toFixed(2)}`);
    }
  };

  const solveSystem = () => {
    setError('');
    setSolution(null);

    // Parse two equations: ax + by = c
    const eq1 = persianToEnglish(equation).replace(/\s/g, '').toLowerCase();
    const eq2 = persianToEnglish(equation2).replace(/\s/g, '').toLowerCase();

    const parseEq = (eq: string) => {
      const match = eq.match(/^([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)y=([+-]?\d*\.?\d*)$/);
      if (!match) return null;
      return {
        a: parseFloat(match[1]) || 1,
        b: parseFloat(match[2]) || 0,
        c: parseFloat(match[3]) || 0,
      };
    };

    const p1 = parseEq(eq1);
    const p2 = parseEq(eq2);

    if (!p1 || !p2) {
      setError('فرمت معادلات صحیح نیست. مثال: 2x+3y=7');
      return;
    }

    const steps: string[] = [];
    steps.push(`معادله ۱: ${p1.a}x + ${p1.b}y = ${p1.c}`);
    steps.push(`معادله ۲: ${p2.a}x + ${p2.b}y = ${p2.c}`);

    const det = p1.a * p2.b - p2.a * p1.b;
    steps.push(`دترمینان: D = ${p1.a}×${p2.b} - ${p2.a}×${p1.b} = ${det}`);

    if (det === 0) {
      steps.push('چون D = 0، دستگاه یا بی‌نهایت جواب دارد یا جوابی ندارد');
      setSolution({ type: 'system', values: 'دستگاه ناسازگار یا وابسته', steps });
      return;
    }

    const x = (p1.c * p2.b - p2.c * p1.b) / det;
    const y = (p1.a * p2.c - p2.a * p1.c) / det;

    steps.push(`x = (${p1.c}×${p2.b} - ${p2.c}×${p1.b}) / ${det} = ${x.toFixed(3)}`);
    steps.push(`y = (${p1.a}×${p2.c} - ${p2.a}×${p1.c}) / ${det} = ${y.toFixed(3)}`);

    setSolution({ type: 'system', values: [x, y], steps });
    addToHistory(`${equation}, ${equation2}`, `x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
  };

  const addToHistory = (eq: string, sol: string) => {
    setHistory((prev) => [{ eq, sol }, ...prev.slice(0, 9)]);
  };

  const handleSolve = () => {
    if (mode === 'linear') solveLinear();
    else if (mode === 'quadratic') solveQuadratic();
    else solveSystem();
  };

  const copyResult = () => {
    if (!solution || typeof solution.values === 'string') return;
    const text = solution.values.map((v, i) => `x${solution.values.length > 1 ? i + 1 : ''} = ${v}`).join(', ');
    navigator.clipboard.writeText(text);
    toast({ title: 'کپی شد!' });
  };

  // Generate graph data for quadratic
  const graphData = useMemo(() => {
    if (mode !== 'quadratic' || !solution || typeof solution.values === 'string') return [];
    
    let eq = persianToEnglish(equation).replace(/\s/g, '').toLowerCase();
    const match = eq.match(/^([+-]?\d*\.?\d*)x[²2]([+-]\d*\.?\d*)x([+-]\d*\.?\d*)=0$/);
    if (!match) return [];

    const a = parseFloat(match[1]) || 1;
    const b = parseFloat(match[2]) || 0;
    const c = parseFloat(match[3]) || 0;

    const vertex = -b / (2 * a);
    const range = 5;
    const data = [];
    
    for (let x = vertex - range; x <= vertex + range; x += 0.2) {
      data.push({ x: x.toFixed(1), y: a * x * x + b * x + c });
    }
    return data;
  }, [equation, solution, mode]);

  const examples = {
    linear: ['2x+5=11', '3x-7=14', '-x+10=5'],
    quadratic: ['x²-4x+3=0', 'x²+2x-8=0', '2x²-5x+2=0'],
    system: [['2x+3y=7', 'x-y=1'], ['3x+2y=12', 'x+y=5']],
  };

  const reset = () => {
    setEquation('');
    setEquation2('');
    setSolution(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="حل‌کننده معادلات" icon={Calculator} onReset={reset}>
        {/* Mode Tabs */}
        <Tabs value={mode} onValueChange={(v) => { setMode(v as typeof mode); reset(); }}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="linear">خطی</TabsTrigger>
            <TabsTrigger value="quadratic">درجه دوم</TabsTrigger>
            <TabsTrigger value="system">دستگاه</TabsTrigger>
          </TabsList>

          <TabsContent value="linear" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>معادله خطی (ax + b = c)</Label>
              <Input
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="مثال: 2x+5=11"
                dir="ltr"
                className="text-center font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {examples.linear.map((ex) => (
                <Badge key={ex} variant="outline" className="cursor-pointer" onClick={() => setEquation(ex)}>
                  {ex}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quadratic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>معادله درجه دوم (ax² + bx + c = 0)</Label>
              <Input
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="مثال: x²-4x+3=0"
                dir="ltr"
                className="text-center font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {examples.quadratic.map((ex) => (
                <Badge key={ex} variant="outline" className="cursor-pointer" onClick={() => setEquation(ex)}>
                  {ex}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>دستگاه دو معادله دو مجهول</Label>
              <Input
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="معادله ۱: 2x+3y=7"
                dir="ltr"
                className="text-center font-mono"
              />
              <Input
                value={equation2}
                onChange={(e) => setEquation2(e.target.value)}
                placeholder="معادله ۲: x-y=1"
                dir="ltr"
                className="text-center font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {examples.system.map((ex, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => { setEquation(ex[0]); setEquation2(ex[1]); }}
                >
                  {ex[0]}, {ex[1]}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={handleSolve} className="w-full gap-2" disabled={!equation.trim()}>
          <Calculator className="h-4 w-4" />
          حل معادله
        </Button>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}
      </CalculatorCard>

      {/* Solution */}
      <AnimatePresence>
        {solution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <VisualizationCard title="مراحل حل">
              <div className="space-y-3">
                {solution.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg"
                  >
                    <Badge variant="outline" className="shrink-0">{i + 1}</Badge>
                    <span className="text-sm font-mono" dir="ltr">{step}</span>
                  </motion.div>
                ))}
              </div>

              {/* Final Answer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-primary/10 rounded-xl border-r-4 border-primary"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <span className="font-medium">جواب:</span>
                    <span className="text-lg font-mono font-bold">
                      {typeof solution.values === 'string'
                        ? solution.values
                        : solution.type === 'system'
                        ? `x = ${solution.values[0].toFixed(3)}, y = ${solution.values[1].toFixed(3)}`
                        : solution.values.map((v, i) => `x${solution.values.length > 1 ? i + 1 : ''} = ${v.toFixed(3)}`).join(', ')}
                    </span>
                  </div>
                  {typeof solution.values !== 'string' && (
                    <Button variant="ghost" size="icon" onClick={copyResult}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </VisualizationCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graph for Quadratic */}
      {mode === 'quadratic' && graphData.length > 0 && (
        <VisualizationCard title="نمودار">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="x" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </VisualizationCard>
      )}

      {/* History */}
      {history.length > 0 && (
        <VisualizationCard title="تاریخچه">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm">
                <span className="font-mono" dir="ltr">{h.eq}</span>
                <span className="font-mono text-primary" dir="ltr">{h.sol}</span>
              </div>
            ))}
          </div>
        </VisualizationCard>
      )}
    </div>
  );
};

export default EquationSolver;
