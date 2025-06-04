
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Music, Zap, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PersianPoetryAnalysis = () => {
  const { toast } = useToast();
  const [poem, setPoem] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Persian poetry meters database
  const persianMeters = {
    'مفعولن فاعلن مفعولن فاعلن': 'هزج',
    'فاعلاتن فاعلاتن فاعلاتن فاعلن': 'رمل',
    'مستفعلن مستفعلن مستفعلن مستفعلن': 'رجز',
    'فعولن مفاعیلن فعولن مفاعیلن': 'مجتث'
  };

  const literaryDevices = [
    { name: 'تشبیه', description: 'مانند، چون، همچو' },
    { name: 'استعاره', description: 'انتقال معنا بدون ادات تشبیه' },
    { name: 'کنایه', description: 'اشاره غیرمستقیم به معنا' },
    { name: 'جناس', description: 'تشابه لفظی با تفاوت معنایی' },
    { name: 'طباق', description: 'استفاده از کلمات متضاد' },
    { name: 'تلمیح', description: 'اشاره به داستان یا شخصیت تاریخی' }
  ];

  const analyzePoetry = () => {
    if (!poem.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً متن شعر را وارد کنید.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const lines = poem.split('\n').filter(line => line.trim());
      
      const mockAnalysis = {
        meter: 'هزج (مفعولن فاعلن)',
        rhymeScheme: 'AA BB CC',
        syllableCount: lines.map(line => Math.floor(Math.random() * 5) + 12),
        literaryDevices: literaryDevices.slice(0, Math.floor(Math.random() * 4) + 2),
        sentiment: Math.random() > 0.5 ? 'عاشقانه' : 'حماسی',
        complexity: Math.random() > 0.6 ? 'پیشرفته' : 'متوسط',
        lines: lines
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const copyAnalysis = () => {
    if (analysis) {
      const text = `تحلیل شعر:
بحر: ${analysis.meter}
قافیه: ${analysis.rhymeScheme}
آرایه‌های ادبی: ${analysis.literaryDevices.map((d: any) => d.name).join('، ')}
حالت کلی: ${analysis.sentiment}`;
      
      navigator.clipboard.writeText(text);
      toast({
        title: "کپی شد",
        description: "تحلیل شعر کپی شد."
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-3xl border border-purple-200">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mr-4 shadow-lg">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">تحلیل شعر فارسی</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          تحلیل عمیق بحر، قافیه و آرایه‌های ادبی در شعر فارسی
        </p>
      </div>

      <Tabs defaultValue="analyze" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 rounded-2xl p-1">
          <TabsTrigger value="analyze" className="rounded-xl">تحلیل شعر</TabsTrigger>
          <TabsTrigger value="meters" className="rounded-xl">بحرهای شعری</TabsTrigger>
          <TabsTrigger value="devices" className="rounded-xl">آرایه‌های ادبی</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  متن شعر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="شعر خود را اینجا وارد کنید..."
                  value={poem}
                  onChange={(e) => setPoem(e.target.value)}
                  className="min-h-48 text-lg leading-relaxed"
                />
                <Button 
                  onClick={analyzePoetry}
                  disabled={isAnalyzing}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      در حال تحلیل...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      تحلیل شعر
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {analysis && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Music className="w-5 h-5 mr-2 text-indigo-600" />
                      نتایج تحلیل
                    </span>
                    <Button variant="outline" size="sm" onClick={copyAnalysis}>
                      <Copy className="w-4 h-4 mr-2" />
                      کپی
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <label className="text-sm font-medium text-purple-700">بحر شعری</label>
                      <p className="text-purple-900 font-semibold">{analysis.meter}</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl">
                      <label className="text-sm font-medium text-indigo-700">الگوی قافیه</label>
                      <p className="text-indigo-900 font-semibold">{analysis.rhymeScheme}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <label className="text-sm font-medium text-green-700">حالت کلی</label>
                      <p className="text-green-900 font-semibold">{analysis.sentiment}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <label className="text-sm font-medium text-orange-700">پیچیدگی</label>
                      <p className="text-orange-900 font-semibold">{analysis.complexity}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">آرایه‌های ادبی شناسایی شده</label>
                    <div className="flex flex-wrap gap-2">
                      {analysis.literaryDevices.map((device: any, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                          {device.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">تعداد هجا در هر مصرع</label>
                    <div className="grid grid-cols-4 gap-2">
                      {analysis.syllableCount.map((count: number, index: number) => (
                        <div key={index} className="bg-gray-100 p-2 rounded text-center text-sm">
                          مصرع {index + 1}: {count}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="meters" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(persianMeters).map(([pattern, name], index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-mono text-sm bg-gray-50 p-3 rounded-lg">
                    {pattern}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="devices" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {literaryDevices.map((device, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {device.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersianPoetryAnalysis;
