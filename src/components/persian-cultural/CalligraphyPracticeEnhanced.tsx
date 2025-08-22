import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalligraphySettings } from '@/components/persian-cultural/CalligraphySettings';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  PenTool, 
  Download, 
  RotateCcw, 
  Save, 
  Palette, 
  Type,
  Grid3X3,
  Trash2,
  BookOpen
} from 'lucide-react';

interface CalligraphySettings {
  paperSize: string;
  lineSpacing: number;
  marginSize: number;
  showGuideLines: boolean;
  practiceMode: string;
  fontStyle: string;
  penWidth: number;
  penColor: string;
  showGrid: boolean;
}

const persianTexts = {
  letters: [
    { text: 'الف ب پ ت ث ج چ ح خ د', translation: 'Persian Alphabet' },
    { text: 'ذ ر ز ژ س ش ص ض ط ظ', translation: 'Persian Alphabet Continued' },
    { text: 'ع غ ف ق ک گ ل م ن و ه ی', translation: 'Persian Alphabet Final' }
  ],
  words: [
    { text: 'سلام - درود - خوش آمدید', translation: 'Hello - Greetings - Welcome' },
    { text: 'عشق - محبت - دوستی', translation: 'Love - Affection - Friendship' },
    { text: 'خانواده - مادر - پدر', translation: 'Family - Mother - Father' },
    { text: 'زیبایی - نور - ستاره', translation: 'Beauty - Light - Star' }
  ],
  sentences: [
    { text: 'به نام خداوند جان و خرد', translation: 'In the name of God of soul and wisdom' },
    { text: 'ایران زمین مهد تمدن', translation: 'Iran, the cradle of civilization' },
    { text: 'دوستی گنجی است گرانبها', translation: 'Friendship is a precious treasure' }
  ],
  poetry: [
    { text: 'بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند', translation: 'Listen to the reed, how it tells a tale\nComplaining of separations' },
    { text: 'الا یا ایها الساقی ادر کأسا و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها', translation: 'O Cupbearer, bring forth the cup and put it to my lips\nLove seemed easy at first, but difficulties arose' }
  ]
};

export function CalligraphyPracticeEnhanced() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  
  const [settings, setSettings] = useState<CalligraphySettings>({
    paperSize: 'a4',
    lineSpacing: 40,
    marginSize: 20,
    showGuideLines: true,
    practiceMode: 'letters',
    fontStyle: 'nastaliq',
    penWidth: 2,
    penColor: '#000000',
    showGrid: false
  });

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);
        initializeCanvas(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      drawGuidelines();
    }
  }, [settings, context]);

  const initializeCanvas = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 800;
      canvas.height = 600;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGuidelines();
    }
  };

  const drawGuidelines = () => {
    if (!context || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Clear and redraw background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    if (settings.showGuideLines) {
      context.strokeStyle = '#e0e0e0';
      context.lineWidth = 1;
      
      // Horizontal lines
      for (let y = settings.marginSize; y < canvas.height - settings.marginSize; y += settings.lineSpacing) {
        context.beginPath();
        context.moveTo(settings.marginSize, y);
        context.lineTo(canvas.width - settings.marginSize, y);
        context.stroke();
      }
      
      // Vertical margin lines
      context.beginPath();
      context.moveTo(settings.marginSize, 0);
      context.lineTo(settings.marginSize, canvas.height);
      context.moveTo(canvas.width - settings.marginSize, 0);
      context.lineTo(canvas.width - settings.marginSize, canvas.height);
      context.stroke();
    }

    if (settings.showGrid) {
      context.strokeStyle = '#f0f0f0';
      context.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = settings.marginSize; x < canvas.width - settings.marginSize; x += 20) {
        context.beginPath();
        context.moveTo(x, settings.marginSize);
        context.lineTo(x, canvas.height - settings.marginSize);
        context.stroke();
      }
    }
    
    // Display practice text
    if (selectedText) {
      context.fillStyle = '#ccc';
      context.font = '24px Arial';
      context.textAlign = 'right';
      context.fillText(selectedText, canvas.width - settings.marginSize - 20, 30);
    }
  };

  const getCurrentTexts = () => {
    return persianTexts[settings.practiceMode as keyof typeof persianTexts] || [];
  };

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      context.strokeStyle = settings.penColor;
      context.lineWidth = settings.penWidth;
      context.beginPath();
      context.moveTo(x, y);
    }
  }, [context, settings.penColor, settings.penWidth]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      context.lineTo(x, y);
      context.stroke();
    }
  }, [isDrawing, context]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      initializeCanvas(context);
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'persian-calligraphy.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleSettingsChange = (newSettings: CalligraphySettings) => {
    setSettings(newSettings);
  };

  const selectText = (text: string) => {
    setSelectedText(text);
  };

  const nextText = () => {
    const texts = getCurrentTexts();
    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    setSelectedText(texts[(currentTextIndex + 1) % texts.length]?.text || '');
  };

  const prevText = () => {
    const texts = getCurrentTexts();
    const newIndex = currentTextIndex === 0 ? texts.length - 1 : currentTextIndex - 1;
    setCurrentTextIndex(newIndex);
    setSelectedText(texts[newIndex]?.text || '');
  };

  const currentTexts = getCurrentTexts();
  const currentText = currentTexts[currentTextIndex];

  return (
    <div className="space-y-6">
      <Card className="gradient-persian text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <PenTool size={28} />
            تمرین خوشنویسی فارسی
          </CardTitle>
          <p className="text-white/90">
            تمرین خط و خوشنویسی فارسی با ابزار دیجیتال پیشرفته
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">صفحه تمرین</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearCanvas}>
                    <Trash2 size={16} />
                    پاک کردن
                  </Button>
                  <Button variant="outline" size="sm" onClick={saveCanvas}>
                    <Download size={16} />
                    ذخیره
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  className="border border-gray-300 rounded cursor-crosshair w-full"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Practice Text Selection */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} />
                متن تمرین
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={settings.practiceMode} onValueChange={(value) => 
                setSettings({...settings, practiceMode: value})
              }>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="letters">حروف</TabsTrigger>
                  <TabsTrigger value="words">کلمات</TabsTrigger>
                  <TabsTrigger value="sentences">جملات</TabsTrigger>
                  <TabsTrigger value="poetry">شعر</TabsTrigger>
                </TabsList>

                {Object.keys(persianTexts).map((mode) => (
                  <TabsContent key={mode} value={mode}>
                    <div className="space-y-4">
                      {currentText && (
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <CardContent className="p-4">
                            <div className="text-right mb-3">
                              <p className="text-xl font-medium leading-relaxed">
                                {currentText.text}
                              </p>
                            </div>
                            {showTranslation && (
                              <div className="text-left text-sm text-muted-foreground border-t pt-2">
                                {currentText.translation}
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-3">
                              <Button variant="outline" size="sm" onClick={prevText}>
                                قبلی
                              </Button>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={showTranslation}
                                  onCheckedChange={setShowTranslation}
                                />
                                <Label>ترجمه</Label>
                              </div>
                              <Button variant="outline" size="sm" onClick={nextText}>
                                بعدی
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      <div className="grid grid-cols-1 gap-2">
                        {persianTexts[mode as keyof typeof persianTexts].map((item, index) => (
                          <Button
                            key={index}
                            variant={selectedText === item.text ? "default" : "outline"}
                            className="text-right justify-end p-3 h-auto"
                            onClick={() => selectText(item.text)}
                          >
                            <div>
                              <div className="font-medium">{item.text}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.translation}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Drawing Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette size={20} />
                ابزار نقاشی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>ضخامت قلم: {settings.penWidth}px</Label>
                <Slider
                  value={[settings.penWidth]}
                  onValueChange={(value) => setSettings({...settings, penWidth: value[0]})}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full mt-2"
                />
              </div>
              
              <div>
                <Label>رنگ قلم</Label>
                <div className="flex gap-2 mt-2">
                  {['#000000', '#333333', '#666666', '#0066cc', '#cc0000'].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded border-2 ${
                        settings.penColor === color ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSettings({...settings, penColor: color})}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>نمایش شبکه</Label>
                <Switch
                  checked={settings.showGrid}
                  onCheckedChange={(checked) => setSettings({...settings, showGrid: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>خطوط راهنما</Label>
                <Switch
                  checked={settings.showGuideLines}
                  onCheckedChange={(checked) => setSettings({...settings, showGuideLines: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Calligraphy Settings */}
          <CalligraphySettings
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>نکات خوشنویسی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium mb-1">نگهداری قلم</p>
                <p className="text-muted-foreground">قلم را در زاویه 45 درجه نسبت به کاغذ نگه دارید.</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-medium mb-1">حرکت دست</p>
                <p className="text-muted-foreground">از حرکت کل دست استفاده کنید، نه فقط انگشتان.</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="font-medium mb-1">تنفس</p>
                <p className="text-muted-foreground">هنگام نوشتن نفس خود را کنترل کنید.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}