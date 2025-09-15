import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Binary, Copy } from "lucide-react";
import { toast } from "sonner";

interface BinaryResult {
  decimal1: number;
  decimal2: number;
  binary1: string;
  binary2: string;
  and: { decimal: number; binary: string };
  or: { decimal: number; binary: string };
  xor: { decimal: number; binary: string };
  not1: { decimal: number; binary: string };
  not2: { decimal: number; binary: string };
}

export const BinaryOperations: React.FC = () => {
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [inputMode, setInputMode] = useState<'decimal' | 'binary'>('decimal');
  const [result, setResult] = useState<BinaryResult | null>(null);

  const decimalToBinary = (decimal: number): string => {
    return (decimal >>> 0).toString(2);
  };

  const binaryToDecimal = (binary: string): number => {
    return parseInt(binary, 2);
  };

  const padBinary = (binary: string, length: number): string => {
    return binary.padStart(length, '0');
  };

  const performOperations = () => {
    let dec1: number, dec2: number;

    if (inputMode === 'decimal') {
      dec1 = parseInt(number1);
      dec2 = parseInt(number2);
      
      if (isNaN(dec1) || isNaN(dec2) || dec1 < 0 || dec2 < 0) {
        toast.error('لطفاً اعداد صحیح غیرمنفی معتبر وارد کنید');
        return;
      }
    } else {
      if (!/^[01]+$/.test(number1) || !/^[01]+$/.test(number2)) {
        toast.error('لطفاً اعداد دودویی معتبر (فقط 0 و 1) وارد کنید');
        return;
      }
      
      dec1 = binaryToDecimal(number1);
      dec2 = binaryToDecimal(number2);
    }

    const bin1 = decimalToBinary(dec1);
    const bin2 = decimalToBinary(dec2);
    const maxLength = Math.max(bin1.length, bin2.length);

    const andResult = dec1 & dec2;
    const orResult = dec1 | dec2;
    const xorResult = dec1 ^ dec2;
    const not1Result = ~dec1 >>> 0; // Use unsigned right shift to get positive result
    const not2Result = ~dec2 >>> 0;

    setResult({
      decimal1: dec1,
      decimal2: dec2,
      binary1: padBinary(bin1, maxLength),
      binary2: padBinary(bin2, maxLength),
      and: {
        decimal: andResult,
        binary: padBinary(decimalToBinary(andResult), maxLength)
      },
      or: {
        decimal: orResult,
        binary: padBinary(decimalToBinary(orResult), maxLength)
      },
      xor: {
        decimal: xorResult,
        binary: padBinary(decimalToBinary(xorResult), maxLength)
      },
      not1: {
        decimal: not1Result,
        binary: decimalToBinary(not1Result)
      },
      not2: {
        decimal: not2Result,
        binary: decimalToBinary(not2Result)
      }
    });
  };

  const copyResult = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${type} کپی شد`);
  };

  const reset = () => {
    setNumber1('');
    setNumber2('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Binary className="w-5 h-5 text-primary" />
            عملیات‌های دودویی
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={inputMode === 'decimal' ? 'default' : 'outline'}
                onClick={() => setInputMode('decimal')}
              >
                ورودی دهدهی
              </Button>
              <Button
                variant={inputMode === 'binary' ? 'default' : 'outline'}
                onClick={() => setInputMode('binary')}
              >
                ورودی دودویی
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  عدد اول {inputMode === 'decimal' ? '(دهدهی)' : '(دودویی)'}:
                </label>
                <Input
                  type={inputMode === 'decimal' ? 'number' : 'text'}
                  value={number1}
                  onChange={(e) => setNumber1(e.target.value)}
                  placeholder={inputMode === 'decimal' ? 'مثال: 15' : 'مثال: 1111'}
                  className="text-lg font-mono"
                  min={inputMode === 'decimal' ? '0' : undefined}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  عدد دوم {inputMode === 'decimal' ? '(دهدهی)' : '(دودویی)'}:
                </label>
                <Input
                  type={inputMode === 'decimal' ? 'number' : 'text'}
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                  placeholder={inputMode === 'decimal' ? 'مثال: 10' : 'مثال: 1010'}
                  className="text-lg font-mono"
                  min={inputMode === 'decimal' ? '0' : undefined}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={performOperations} disabled={!number1.trim() || !number2.trim()}>
                انجام عملیات‌ها
              </Button>
              {result && (
                <Button onClick={reset} variant="outline">
                  شروع دوباره
                </Button>
              )}
            </div>
          </div>

          {result && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <Tabs defaultValue="results" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="results">نتایج عملیات</TabsTrigger>
                    <TabsTrigger value="details">جزئیات بیت به بیت</TabsTrigger>
                  </TabsList>

                  <TabsContent value="results" className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">اعداد ورودی:</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-background rounded">
                              <span>عدد ۱:</span>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {result.decimal1} (دهدهی)
                                </Badge>
                                <Badge variant="secondary" className="font-mono">
                                  {result.binary1} (دودویی)
                                </Badge>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-background rounded">
                              <span>عدد ۲:</span>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {result.decimal2} (دهدهی)
                                </Badge>
                                <Badge variant="secondary" className="font-mono">
                                  {result.binary2} (دودویی)
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">نتایج عملیات:</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-background rounded">
                              <span>AND:</span>
                              <div className="flex gap-2">
                                <Badge variant="default" className="font-mono">
                                  {result.and.decimal}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyResult(result.and.binary, 'نتیجه AND')}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-background rounded">
                              <span>OR:</span>
                              <div className="flex gap-2">
                                <Badge variant="default" className="font-mono">
                                  {result.or.decimal}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyResult(result.or.binary, 'نتیجه OR')}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-background rounded">
                              <span>XOR:</span>
                              <div className="flex gap-2">
                                <Badge variant="default" className="font-mono">
                                  {result.xor.decimal}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyResult(result.xor.binary, 'نتیجه XOR')}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-background rounded border font-mono text-sm">
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <span>عدد ۱:</span>
                            <span>{result.binary1}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>عدد ۲:</span>
                            <span>{result.binary2}</span>
                          </div>
                          <hr />
                          <div className="flex justify-between text-blue-600">
                            <span>AND:</span>
                            <span>{result.and.binary}</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>OR:</span>
                            <span>{result.or.binary}</span>
                          </div>
                          <div className="flex justify-between text-purple-600">
                            <span>XOR:</span>
                            <span>{result.xor.binary}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">NOT عدد اول:</h4>
                          <div className="p-3 bg-background rounded border">
                            <div className="flex justify-between items-center">
                              <span className="font-mono">{result.not1.binary}</span>
                              <Badge variant="outline">{result.not1.decimal}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">NOT عدد دوم:</h4>
                          <div className="p-3 bg-background rounded border">
                            <div className="flex justify-between items-center">
                              <span className="font-mono">{result.not2.binary}</span>
                              <Badge variant="outline">{result.not2.decimal}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>توضیحات عملیات‌های دودویی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              عملیات‌های دودویی روی بیت‌های اعداد انجام می‌شوند و در برنامه‌نویسی و پردازش داده بسیار مفید هستند.
            </p>
            
            <h4>انواع عملیات:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-blue-600 font-medium">AND (&)</h5>
                <p>نتیجه ۱ است فقط وقتی هر دو بیت ۱ باشند</p>
                <code>1 & 1 = 1, 1 & 0 = 0, 0 & 1 = 0, 0 & 0 = 0</code>
              </div>
              <div>
                <h5 className="text-green-600 font-medium">OR (|)</h5>
                <p>نتیجه ۱ است اگر حداقل یکی از بیت‌ها ۱ باشد</p>
                <code>1 | 1 = 1, 1 | 0 = 1, 0 | 1 = 1, 0 | 0 = 0</code>
              </div>
              <div>
                <h5 className="text-purple-600 font-medium">XOR (^)</h5>
                <p>نتیجه ۱ است فقط وقتی بیت‌ها متفاوت باشند</p>
                <code>1 ^ 1 = 0, 1 ^ 0 = 1, 0 ^ 1 = 1, 0 ^ 0 = 0</code>
              </div>
              <div>
                <h5 className="text-red-600 font-medium">NOT (~)</h5>
                <p>همه بیت‌ها را معکوس می‌کند</p>
                <code>~1 = 0, ~0 = 1</code>
              </div>
            </div>

            <h4>کاربردها:</h4>
            <ul>
              <li>پردازش تصویر و صدا</li>
              <li>رمزنگاری و امنیت</li>
              <li>بهینه‌سازی الگوریتم‌ها</li>
              <li>کار با پرچم‌ها (Flags)</li>
              <li>عملیات سریع ریاضی</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};