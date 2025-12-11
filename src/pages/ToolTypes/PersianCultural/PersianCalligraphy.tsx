import React, { useState, useRef } from 'react';
import { Pen, Grid, Download, Settings, Eye, Printer, Eraser, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Sample Phrases for Practice
const samplePhrases = [
  "به نام خداوند جان و خرد • کزین برتر اندیشه برنگذرد",
  "سعدیا گر عاشقی کن و جوانی • به شیوه‌ای که دانی",
  "چو فردا شود فکر فردا کنیم • همه عمر عالم کجا باشد این",
  "به چشم بصیرت به خود درنگر • تو را تا در آیینه زنگار نیست",
  "فرقی نمی‌کند که کجای جهانی • ماه همیشه ماه است و حافظ همان حافظ است",
  "گلبرگی شکفت و شد چمن زیبا • انسان چه را گرفت که از دست داد خود را",
  "سحر با باد می‌گفتم حدیث آرزومندی • خطاب آمد که واثق شو به الطاف خداوندی"
];

// Calligraphy styles
const calligraphyStyles = [
  { id: 'nastaliq', name: 'نستعلیق', fontFamily: 'IranNastaliq, serif' },
  { id: 'naskh', name: 'نسخ', fontFamily: 'B Badr, serif' },
  { id: 'shekasteh', name: 'شکسته نستعلیق', fontFamily: 'IranShekasteh, serif' },
  { id: 'thuluth', name: 'ثلث', fontFamily: 'B Ferdosi, serif' },
  { id: 'diwani', name: 'دیوانی', fontFamily: 'B Kamran, serif' }
];

export default function PersianCalligraphy() {
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("به نام خداوند جان و خرد");
  const [style, setStyle] = useState(calligraphyStyles[0]);
  const [fontSize, setFontSize] = useState(32);
  const [lineHeight, setLineHeight] = useState(2.5);
  const [showGrid, setShowGrid] = useState(true);
  const [showGuideLines, setShowGuideLines] = useState(true);
  const [repetitions, setRepetitions] = useState(3);
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');
  
  // Generate practice sheet content
  const generatePracticeLines = () => {
    const lines = [];
    for (let i = 0; i < repetitions; i++) {
      lines.push(
        <div 
          key={i}
          className={`${i === 0 ? 'text-black' : 'text-gray-400'} mb-${lineHeight} relative`}
          style={{ 
            fontFamily: style.fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            direction: direction,
            marginBottom: `${fontSize * 0.5}px`
          }}
        >
          {text}
          {showGuideLines && i === 0 && (
            <div 
              className="absolute top-1/2 left-0 right-0 border-b border-dashed border-red-300"
              style={{ transform: 'translateY(-50%)' }}
            ></div>
          )}
          {i === 0 && <Separator className="my-2" />}
        </div>
      );
    }
    return lines;
  };

  // Generate a blank line for practice
  const generateBlankLine = () => {
    return (
      <div 
        className="relative mb-8 h-12 border-b border-gray-300"
        style={{ 
          height: `${fontSize}px`, 
          marginBottom: `${fontSize * 0.7}px`
        }}
      >
        {showGuideLines && (
          <>
            <div className="absolute top-1/2 left-0 right-0 border-b border-dashed border-red-300" style={{ transform: 'translateY(-50%)' }}></div>
            <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300"></div>
          </>
        )}
      </div>
    );
  };

  const handlePrint = () => {
    if (!previewRef.current) return;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) {
      toast({
        title: "خطا",
        description: "مرورگر شما پنجره‌های بازشو را مسدود کرده است",
        variant: "destructive"
      });
      return;
    }
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @media print {
        body { 
          direction: rtl;
          font-family: ${style.fontFamily};
          padding: 20px;
        }
        .practice-line {
          margin-bottom: ${fontSize}px;
          font-size: ${fontSize}px;
          line-height: ${lineHeight};
        }
        .model-line {
          color: black;
        }
        .practice-line {
          color: #cccccc;
        }
        .guide-line {
          border-bottom: 1px dashed #ffcccc;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }
        .grid {
          background: linear-gradient(#eee 1px, transparent 1px),
                    linear-gradient(90deg, #eee 1px, transparent 1px);
          background-size: 20px 20px;
        }
      }
    `;
    
    printWindow.document.head.appendChild(styleElement);
    
    let content = '<div class="practice-sheet">';
    
    // Add title
    content += `<h1 style="text-align: center; margin-bottom: 20px;">تمرین خوشنویسی فارسی</h1>`;
    
    // Add date
    const today = new Date();
    content += `<p style="text-align: left; margin-bottom: 20px;">${today.toLocaleDateString('fa-IR')}</p>`;
    
    // Create content similar to the preview
    for (let i = 0; i < 5; i++) {
      content += `<div class="practice-set" style="margin-bottom: 40px;">`;
      content += `<div class="model-line practice-line" style="font-weight: bold;">${text}</div>`;
      
      if (showGuideLines) {
        content += `<div class="guide-line"></div>`;
      }
      
      for (let j = 0; j < repetitions - 1; j++) {
        content += `<div class="practice-line" style="color: #cccccc;">${text}</div>`;
      }
      
      content += `<div style="height: ${fontSize * 2}px; position: relative;">`;
      if (showGuideLines) {
        content += `<div class="guide-line"></div>`;
      }
      content += `</div>`;
      
      content += `</div>`;
    }
    
    content += '</div>';
    
    printWindow.document.body.innerHTML = content;
    printWindow.document.title = "تمرین خوشنویسی فارسی";
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handleDownload = () => {
    if (!previewRef.current) return;
    
    const element = document.createElement('a');
    const content = `
      <html>
        <head>
          <title>تمرین خوشنویسی فارسی</title>
          <meta charset="UTF-8">
          <style>
            body { 
              direction: rtl;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .practice-sheet {
              max-width: 800px;
              margin: 0 auto;
            }
            .practice-line {
              margin-bottom: ${fontSize}px;
              font-size: ${fontSize}px;
              line-height: ${lineHeight};
              position: relative;
            }
            .model-line {
              color: black;
            }
            .trace-line {
              color: #cccccc;
            }
            .guide-line {
              border-bottom: 1px dashed #ffcccc;
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              transform: translateY(-50%);
            }
            .blank-line {
              height: ${fontSize}px;
              margin-bottom: ${fontSize * 0.7}px;
              border-bottom: 1px solid #ccc;
              position: relative;
            }
          </style>
        </head>
        <body>
          <div class="practice-sheet">
            <h1 style="text-align: center; margin-bottom: 20px;">تمرین خوشنویسی فارسی</h1>
            <p style="text-align: left; margin-bottom: 20px;">${new Date().toLocaleDateString('fa-IR')}</p>
            ${Array(5).fill(0).map(() => `
              <div class="practice-set" style="margin-bottom: 40px;">
                <div class="practice-line model-line">${text}</div>
                ${showGuideLines ? '<div class="guide-line"></div>' : ''}
                ${Array(repetitions - 1).fill(0).map(() => `<div class="practice-line trace-line">${text}</div>`).join('')}
                <div class="blank-line">
                  ${showGuideLines ? '<div class="guide-line"></div>' : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;
    
    const file = new Blob([content], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "persian-calligraphy-practice.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * samplePhrases.length);
    setText(samplePhrases[randomIndex]);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="p-4">
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-b from-indigo-50 to-white">
          <div className="flex items-center gap-3">
            <Pen className="w-6 h-6 text-indigo-600" />
            <CardTitle>تمرین خوشنویسی فارسی</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="settings">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={16} />
                تنظیمات
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye size={16} />
                پیش‌نمایش
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="text">متن تمرین</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRandomPhrase}
                        className="h-7 px-2 text-xs flex items-center gap-1"
                      >
                        <Sparkles size={14} />
                        متن نمونه
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClear}
                        className="h-7 px-2 text-xs flex items-center gap-1"
                      >
                        <Eraser size={14} />
                        پاک کردن
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="متن مورد نظر برای تمرین خوشنویسی را وارد کنید..."
                    className="h-24"
                    dir="rtl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="style">سبک خط</Label>
                    <Select
                      value={style.id}
                      onValueChange={(value) => setStyle(calligraphyStyles.find(s => s.id === value) || calligraphyStyles[0])}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {calligraphyStyles.map((style) => (
                          <SelectItem key={style.id} value={style.id}>
                            <span style={{ fontFamily: style.fontFamily }}>{style.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="direction">جهت نوشتار</Label>
                    <Select
                      value={direction}
                      onValueChange={(value: 'rtl' | 'ltr') => setDirection(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rtl">راست به چپ</SelectItem>
                        <SelectItem value="ltr">چپ به راست</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="fontSize">اندازه فونت: {fontSize}px</Label>
                      </div>
                      <Slider
                        id="fontSize"
                        min={16}
                        max={72}
                        step={1}
                        value={[fontSize]}
                        onValueChange={(value) => setFontSize(value[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="lineHeight">فاصله خطوط: {lineHeight}</Label>
                      </div>
                      <Slider
                        id="lineHeight"
                        min={1}
                        max={4}
                        step={0.1}
                        value={[lineHeight]}
                        onValueChange={(value) => setLineHeight(value[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="repetitions">تعداد تکرار: {repetitions}</Label>
                      </div>
                      <Slider
                        id="repetitions"
                        min={1}
                        max={10}
                        step={1}
                        value={[repetitions]}
                        onValueChange={(value) => setRepetitions(value[0])}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Switch
                          id="showGrid"
                          checked={showGrid}
                          onCheckedChange={setShowGrid}
                        />
                        <Label htmlFor="showGrid">نمایش خطوط شطرنجی</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Switch
                          id="showGuideLines"
                          checked={showGuideLines}
                          onCheckedChange={setShowGuideLines}
                        />
                        <Label htmlFor="showGuideLines">خط راهنما</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="default"
                    onClick={handlePrint}
                    className="flex items-center gap-2"
                  >
                    <Printer size={16} />
                    چاپ برگه تمرین
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    دانلود فایل
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="p-4 border rounded-lg" ref={previewRef}>
                <div className={`${showGrid ? 'bg-grid' : ''} p-4 border rounded`}>
                  <h2 className="text-center mb-4 font-bold">تمرین خوشنویسی فارسی</h2>
                  <Badge className="mb-4" variant="outline">سبک: {style.name}</Badge>
                  
                  <div className="practice-set mb-8">
                    {generatePracticeLines()}
                    {generateBlankLine()}
                  </div>
                  
                  <div className="practice-set">
                    {generatePracticeLines()}
                    {generateBlankLine()}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button
                  variant="default"
                  onClick={handlePrint}
                  className="flex items-center gap-2"
                >
                  <Printer size={16} />
                  چاپ برگه تمرین
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="bg-gray-50 flex flex-col text-xs text-gray-500 text-right py-3">
          <p>این ابزار برای تمرین خوشنویسی فارسی طراحی شده است. برای بهترین نتیجه از چاپگر با کیفیت استفاده کنید.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
