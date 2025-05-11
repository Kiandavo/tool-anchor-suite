
import React, { useState, useEffect } from 'react';
import { Type, Minus, Plus, SlidersHorizontal, Bold, Italic, Underline, Settings, Check, Copy, Plus as PlusIcon, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

// Font categories and available fonts
interface FontCategory {
  id: string;
  name: string;
  fonts: Font[];
}

interface Font {
  id: string;
  name: string;
  family: string;
  source: 'google' | 'local' | 'persian';
  arabicSupport?: boolean;
}

const fontCategories: FontCategory[] = [
  {
    id: 'persian',
    name: 'فونت‌های فارسی',
    fonts: [
      { id: 'iransans', name: 'ایران سنس', family: 'IRANSans, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'vazir', name: 'وزیر', family: 'Vazir, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'yekan', name: 'یکان', family: 'Yekan, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'shabnam', name: 'شبنم', family: 'Shabnam, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'sahel', name: 'ساحل', family: 'Sahel, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'gandom', name: 'گندم', family: 'Gandom, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'samim', name: 'صمیم', family: 'Samim, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'tanha', name: 'تنها', family: 'Tanha, sans-serif', source: 'persian', arabicSupport: true },
      { id: 'parastoo', name: 'پرستو', family: 'Parastoo, sans-serif', source: 'persian', arabicSupport: true }
    ]
  },
  {
    id: 'sans-serif',
    name: 'بدون سِریف',
    fonts: [
      { id: 'arial', name: 'Arial', family: 'Arial, sans-serif', source: 'local' },
      { id: 'helvetica', name: 'Helvetica', family: 'Helvetica, sans-serif', source: 'local' },
      { id: 'opensans', name: 'Open Sans', family: 'Open Sans, sans-serif', source: 'google' },
      { id: 'roboto', name: 'Roboto', family: 'Roboto, sans-serif', source: 'google' },
      { id: 'montserrat', name: 'Montserrat', family: 'Montserrat, sans-serif', source: 'google' },
      { id: 'lato', name: 'Lato', family: 'Lato, sans-serif', source: 'google' },
      { id: 'poppins', name: 'Poppins', family: 'Poppins, sans-serif', source: 'google' }
    ]
  },
  {
    id: 'serif',
    name: 'سِریف‌دار',
    fonts: [
      { id: 'times', name: 'Times New Roman', family: 'Times New Roman, serif', source: 'local' },
      { id: 'georgia', name: 'Georgia', family: 'Georgia, serif', source: 'local' },
      { id: 'playfair', name: 'Playfair Display', family: 'Playfair Display, serif', source: 'google' },
      { id: 'merriweather', name: 'Merriweather', family: 'Merriweather, serif', source: 'google' },
      { id: 'lora', name: 'Lora', family: 'Lora, serif', source: 'google' }
    ]
  },
  {
    id: 'display',
    name: 'نمایشی',
    fonts: [
      { id: 'comicsans', name: 'Comic Sans MS', family: 'Comic Sans MS, cursive, sans-serif', source: 'local' },
      { id: 'pacifico', name: 'Pacifico', family: 'Pacifico, cursive', source: 'google' },
      { id: 'dancing', name: 'Dancing Script', family: 'Dancing Script, cursive', source: 'google' },
      { id: 'lobster', name: 'Lobster', family: 'Lobster, cursive', source: 'google' }
    ]
  },
  {
    id: 'monospace',
    name: 'مونواسپیس',
    fonts: [
      { id: 'courier', name: 'Courier New', family: 'Courier New, monospace', source: 'local' },
      { id: 'consolas', name: 'Consolas', family: 'Consolas, monospace', source: 'local' },
      { id: 'roboto-mono', name: 'Roboto Mono', family: 'Roboto Mono, monospace', source: 'google' },
      { id: 'source-code', name: 'Source Code Pro', family: 'Source Code Pro, monospace', source: 'google' }
    ]
  }
];

// Sample text options
interface SampleText {
  id: string;
  name: string;
  text: string;
  lang: 'fa' | 'en';
}

const sampleTexts: SampleText[] = [
  {
    id: 'pangram-fa',
    name: 'پنگرام فارسی',
    text: 'نجیب زاده کمتر گوید با فشار سخن، ژاژ خواست میمون غذا، چه پی آقا فرخ، از هم اکنون بدقت می‌پزد.',
    lang: 'fa'
  },
  {
    id: 'poem-fa',
    name: 'شعر فارسی',
    text: 'به نام خداوند جان و خرد\nکزین برتر اندیشه برنگذرد\nخداوند نام و خداوند جای\nخداوند روزی ده رهنمای',
    lang: 'fa'
  },
  {
    id: 'prose-fa',
    name: 'متن فارسی',
    text: 'ما برای آن که بتوانیم وارد زندگی‌های بزرگ شویم، باید به افکار بزرگ عادت کنیم. زیرا ما همان‌گونه زندگی می‌کنیم که فکر می‌کنیم.',
    lang: 'fa'
  },
  {
    id: 'pangram-en',
    name: 'پنگرام انگلیسی',
    text: 'The quick brown fox jumps over the lazy dog.',
    lang: 'en'
  },
  {
    id: 'lorem-en',
    name: 'لورم ایپسوم',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
    lang: 'en'
  }
];

// Default CSS properties
interface TextStyle {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'right' | 'left' | 'center' | 'justify';
  color: string;
  italic: boolean;
  underline: boolean;
}

// Saved font settings
interface SavedFontSetting {
  id: string;
  name: string;
  font: Font;
  style: TextStyle;
}

export default function FontPreview() {
  const { toast } = useToast();
  
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('persian');
  const [selectedFontId, setSelectedFontId] = useState<string>('iransans');
  const [comparisonFontId, setComparisonFontId] = useState<string>('');
  const [text, setText] = useState<string>(sampleTexts[0].text);
  const [customName, setCustomName] = useState<string>('');
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [savedSettings, setSavedSettings] = useState<SavedFontSetting[]>([]);
  
  // Find the selected font
  const selectedFont = fontCategories
    .flatMap(category => category.fonts)
    .find(font => font.id === selectedFontId) || fontCategories[0].fonts[0];
  
  // Find the comparison font
  const comparisonFont = comparisonFontId 
    ? fontCategories.flatMap(category => category.fonts).find(font => font.id === comparisonFontId)
    : null;
  
  // Text styling
  const [style, setStyle] = useState<TextStyle>({
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0,
    textAlign: 'right',
    color: '#000000',
    italic: false,
    underline: false
  });
  
  // Load saved settings from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('fontPreviewSettings');
    if (savedData) {
      try {
        setSavedSettings(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to parse saved font settings:', error);
      }
    }
  }, []);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    if (savedSettings.length > 0) {
      localStorage.setItem('fontPreviewSettings', JSON.stringify(savedSettings));
    }
  }, [savedSettings]);
  
  // Load Google Fonts
  useEffect(() => {
    const loadGoogleFonts = () => {
      const googleFonts = fontCategories
        .flatMap(category => category.fonts)
        .filter(font => font.source === 'google')
        .map(font => font.name.replace(/\s+/g, '+'));
      
      if (googleFonts.length > 0) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?${googleFonts.map(font => `family=${font}:wght@400;700&display=swap`).join('&')}`;
        document.head.appendChild(link);
      }
    };
    
    loadGoogleFonts();
  }, []);
  
  // Update a specific style property
  const updateStyle = (property: keyof TextStyle, value: any) => {
    setStyle({
      ...style,
      [property]: value
    });
  };
  
  // Save current font setting
  const saveCurrentSetting = () => {
    if (!customName.trim()) {
      toast({
        title: "خطا",
        description: "لطفا یک نام برای ذخیره تنظیمات وارد کنید.",
        variant: "destructive"
      });
      return;
    }
    
    const newSetting: SavedFontSetting = {
      id: Date.now().toString(),
      name: customName.trim(),
      font: selectedFont,
      style: { ...style }
    };
    
    setSavedSettings([...savedSettings, newSetting]);
    setCustomName('');
    
    toast({
      title: "ذخیره شد",
      description: `تنظیمات «${newSetting.name}» با موفقیت ذخیره شد.`,
    });
  };
  
  // Load a saved setting
  const loadSavedSetting = (setting: SavedFontSetting) => {
    // Find the font category
    const category = fontCategories.find(cat => 
      cat.fonts.some(font => font.id === setting.font.id)
    )?.id || 'persian';
    
    setSelectedCategory(category);
    setSelectedFontId(setting.font.id);
    setStyle(setting.style);
    
    toast({
      title: "بارگذاری شد",
      description: `تنظیمات «${setting.name}» بارگذاری شد.`,
    });
  };
  
  // Delete a saved setting
  const deleteSavedSetting = (id: string) => {
    setSavedSettings(savedSettings.filter(setting => setting.id !== id));
    
    toast({
      title: "حذف شد",
      description: "تنظیمات با موفقیت حذف شد.",
    });
  };
  
  // Copy CSS code to clipboard
  const copyCssCode = () => {
    const cssCode = `font-family: ${selectedFont.family};
font-size: ${style.fontSize}px;
font-weight: ${style.fontWeight};
line-height: ${style.lineHeight};
letter-spacing: ${style.letterSpacing}px;
text-align: ${style.textAlign};
color: ${style.color};
${style.italic ? 'font-style: italic;' : ''}
${style.underline ? 'text-decoration: underline;' : ''}`;
    
    navigator.clipboard.writeText(cssCode);
    
    toast({
      title: "کپی شد",
      description: "کد CSS در کلیپ‌بورد کپی شد.",
    });
  };
  
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-b from-sky-50 to-white">
          <div className="flex items-center gap-3">
            <Type className="w-6 h-6 text-sky-600" />
            <CardTitle>پیش‌نمایش فونت</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="preview">پیش‌نمایش</TabsTrigger>
              <TabsTrigger value="compare">مقایسه فونت‌ها</TabsTrigger>
              <TabsTrigger value="saved">فونت‌های ذخیره شده</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {/* Text Preview Area */}
                  <div className="mb-4">
                    <Label htmlFor="sample-text" className="mb-2 block">متن نمونه</Label>
                    <div className="flex gap-2 mb-2">
                      {sampleTexts.map(sample => (
                        <Button
                          key={sample.id}
                          variant="outline"
                          size="sm"
                          onClick={() => setText(sample.text)}
                          className="text-xs"
                        >
                          {sample.name}
                        </Button>
                      ))}
                    </div>
                    <Textarea
                      id="sample-text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[120px]"
                      dir={selectedFont.source === 'persian' ? 'rtl' : 'auto'}
                    />
                  </div>
                  
                  <div 
                    className="border rounded-md p-6 min-h-[200px] relative"
                    style={{
                      direction: selectedFont.arabicSupport || selectedFont.source === 'persian' ? 'rtl' : 'ltr',
                    }}
                  >
                    <p 
                      style={{
                        fontFamily: selectedFont.family,
                        fontSize: `${style.fontSize}px`,
                        fontWeight: style.fontWeight,
                        lineHeight: style.lineHeight,
                        letterSpacing: `${style.letterSpacing}px`,
                        textAlign: style.textAlign,
                        color: style.color,
                        fontStyle: style.italic ? 'italic' : 'normal',
                        textDecoration: style.underline ? 'underline' : 'none',
                      }}
                    >
                      {text || 'لطفا یک متن برای پیش‌نمایش وارد کنید.'}
                    </p>
                    
                    <Badge 
                      variant="outline" 
                      className="absolute bottom-2 right-2 text-xs bg-white/80"
                    >
                      {selectedFont.name}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                  {/* Font Selection */}
                  <div>
                    <Label htmlFor="font-category" className="mb-2 block">دسته‌بندی فونت</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="font-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="font-select" className="mb-2 block">انتخاب فونت</Label>
                    <Select
                      value={selectedFontId}
                      onValueChange={setSelectedFontId}
                    >
                      <SelectTrigger id="font-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontCategories.find(c => c.id === selectedCategory)?.fonts.map((font) => (
                          <SelectItem key={font.id} value={font.id}>
                            <span style={{ fontFamily: font.family }}>{font.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  {/* Font Properties */}
                  <div className="space-y-4">
                    {/* Font Size */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="font-size">اندازه فونت: {style.fontSize}px</Label>
                        <div className="flex">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-r-none"
                            onClick={() => updateStyle('fontSize', Math.max(8, style.fontSize - 1))}
                          >
                            <Minus size={12} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-l-none"
                            onClick={() => updateStyle('fontSize', style.fontSize + 1)}
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                      <Slider
                        id="font-size"
                        min={8}
                        max={72}
                        step={1}
                        value={[style.fontSize]}
                        onValueChange={(value) => updateStyle('fontSize', value[0])}
                      />
                    </div>
                    
                    {/* Font Weight */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="font-weight">وزن فونت: {style.fontWeight}</Label>
                      </div>
                      <RadioGroup
                        value={style.fontWeight.toString()}
                        onValueChange={(value) => updateStyle('fontWeight', parseInt(value))}
                        className="flex"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="400" id="fw-400" />
                          <Label htmlFor="fw-400">معمولی</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse mr-4">
                          <RadioGroupItem value="700" id="fw-700" />
                          <Label htmlFor="fw-700">ضخیم</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Line Height */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="line-height">ارتفاع خط: {style.lineHeight}</Label>
                      </div>
                      <Slider
                        id="line-height"
                        min={1}
                        max={3}
                        step={0.1}
                        value={[style.lineHeight]}
                        onValueChange={(value) => updateStyle('lineHeight', value[0])}
                      />
                    </div>
                    
                    {/* Letter Spacing */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="letter-spacing">فاصله حروف: {style.letterSpacing}px</Label>
                      </div>
                      <Slider
                        id="letter-spacing"
                        min={-2}
                        max={10}
                        step={0.5}
                        value={[style.letterSpacing]}
                        onValueChange={(value) => updateStyle('letterSpacing', value[0])}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Text Color */}
                      <div>
                        <Label htmlFor="text-color">رنگ متن</Label>
                        <div className="flex mt-2">
                          <Input
                            id="text-color"
                            type="color"
                            value={style.color}
                            onChange={(e) => updateStyle('color', e.target.value)}
                            className="w-10 h-10 p-1"
                          />
                        </div>
                      </div>
                      
                      {/* Text Align */}
                      <div>
                        <Label htmlFor="text-align">ترازبندی</Label>
                        <div className="flex gap-1 mt-2">
                          <Button
                            variant={style.textAlign === 'right' ? 'default' : 'outline'}
                            size="icon"
                            className="flex-1 h-10"
                            onClick={() => updateStyle('textAlign', 'right')}
                          >
                            راست
                          </Button>
                          <Button
                            variant={style.textAlign === 'center' ? 'default' : 'outline'}
                            size="icon"
                            className="flex-1 h-10"
                            onClick={() => updateStyle('textAlign', 'center')}
                          >
                            وسط
                          </Button>
                          <Button
                            variant={style.textAlign === 'left' ? 'default' : 'outline'}
                            size="icon"
                            className="flex-1 h-10"
                            onClick={() => updateStyle('textAlign', 'left')}
                          >
                            چپ
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Text Styles */}
                    <div className="flex gap-2">
                      <Button
                        variant={style.italic ? 'default' : 'outline'}
                        size="icon"
                        className="flex-1"
                        onClick={() => updateStyle('italic', !style.italic)}
                      >
                        <Italic size={16} className="mr-1" /> ایتالیک
                      </Button>
                      <Button
                        variant={style.underline ? 'default' : 'outline'}
                        size="icon"
                        className="flex-1"
                        onClick={() => updateStyle('underline', !style.underline)}
                      >
                        <Underline size={16} className="mr-1" /> زیرخط
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Save Settings */}
                  <div className="space-y-2">
                    <Label htmlFor="save-name">ذخیره تنظیمات</Label>
                    <div className="flex gap-2">
                      <Input
                        id="save-name"
                        placeholder="نام تنظیمات"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                      />
                      <Button
                        onClick={saveCurrentSetting}
                        disabled={!customName.trim()}
                      >
                        ذخیره
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={copyCssCode}
                    className="w-full mt-2"
                  >
                    <Copy size={16} className="mr-2" /> کپی کد CSS
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compare" className="space-y-6">
              <div className="flex gap-4 items-center mb-4">
                <div className="flex-1">
                  <Label htmlFor="comparison-font" className="mb-2 block">انتخاب فونت برای مقایسه</Label>
                  <Select
                    value={comparisonFontId}
                    onValueChange={setComparisonFontId}
                  >
                    <SelectTrigger id="comparison-font">
                      <SelectValue placeholder="یک فونت انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontCategories.flatMap(cat => (
                        <React.Fragment key={cat.id}>
                          <SelectItem value="" disabled>
                            --- {cat.name} ---
                          </SelectItem>
                          {cat.fonts.map(font => (
                            <SelectItem key={font.id} value={font.id} disabled={font.id === selectedFontId}>
                              <span style={{ fontFamily: font.family }}>{font.name}</span>
                            </SelectItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse pt-6">
                  <Switch
                    id="show-comparison"
                    checked={showComparison}
                    onCheckedChange={setShowComparison}
                    disabled={!comparisonFontId}
                  />
                  <Label htmlFor="show-comparison">نمایش مقایسه</Label>
                </div>
              </div>
              
              {showComparison && comparisonFont && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-center mb-2 font-medium">{selectedFont.name}</h3>
                    <div 
                      className="border rounded-md p-4 min-h-[200px]"
                      dir={selectedFont.source === 'persian' ? 'rtl' : 'ltr'}
                    >
                      <p 
                        style={{
                          fontFamily: selectedFont.family,
                          fontSize: `${style.fontSize}px`,
                          fontWeight: style.fontWeight,
                          lineHeight: style.lineHeight,
                          letterSpacing: `${style.letterSpacing}px`,
                          textAlign: style.textAlign,
                          color: style.color,
                          fontStyle: style.italic ? 'italic' : 'normal',
                          textDecoration: style.underline ? 'underline' : 'none',
                        }}
                      >
                        {text || 'لطفا یک متن برای پیش‌نمایش وارد کنید.'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-center mb-2 font-medium">{comparisonFont.name}</h3>
                    <div 
                      className="border rounded-md p-4 min-h-[200px]"
                      dir={comparisonFont.source === 'persian' ? 'rtl' : 'ltr'}
                    >
                      <p 
                        style={{
                          fontFamily: comparisonFont.family,
                          fontSize: `${style.fontSize}px`,
                          fontWeight: style.fontWeight,
                          lineHeight: style.lineHeight,
                          letterSpacing: `${style.letterSpacing}px`,
                          textAlign: style.textAlign,
                          color: style.color,
                          fontStyle: style.italic ? 'italic' : 'normal',
                          textDecoration: style.underline ? 'underline' : 'none',
                        }}
                      >
                        {text || 'لطفا یک متن برای پیش‌نمایش وارد کنید.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {(!comparisonFontId || !showComparison) && (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-gray-500">لطفاً یک فونت برای مقایسه انتخاب کنید</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-6">
              {savedSettings.length === 0 ? (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-gray-500">هنوز هیچ تنظیماتی ذخیره نکرده‌اید</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      const tabElements = document.querySelectorAll('[data-value="preview"]');
                      if (tabElements.length > 0) {
                        (tabElements[0] as HTMLButtonElement).click();
                      }
                    }}
                  >
                    <PlusIcon size={16} className="mr-1" /> ایجاد تنظیمات جدید
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {savedSettings.map(setting => (
                    <div 
                      key={setting.id}
                      className="border rounded-md overflow-hidden hover:border-primary transition-colors"
                    >
                      <div 
                        className="p-4 min-h-[100px] cursor-pointer"
                        style={{
                          fontFamily: setting.font.family,
                          direction: setting.font.source === 'persian' ? 'rtl' : 'ltr',
                        }}
                        onClick={() => loadSavedSetting(setting)}
                      >
                        <p 
                          style={{
                            fontSize: `${setting.style.fontSize}px`,
                            fontWeight: setting.style.fontWeight,
                            lineHeight: setting.style.lineHeight,
                            letterSpacing: `${setting.style.letterSpacing}px`,
                            textAlign: setting.style.textAlign,
                            color: setting.style.color,
                            fontStyle: setting.style.italic ? 'italic' : 'normal',
                            textDecoration: setting.style.underline ? 'underline' : 'none',
                          }}
                        >
                          نمونه متن برای {setting.font.name}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 flex justify-between items-center">
                        <div className="font-medium text-sm">{setting.name}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteSavedSetting(setting.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="bg-gray-50 text-xs text-gray-500 py-3">
          <p>با این ابزار می‌توانید فونت‌های مختلف را با تنظیمات دلخواه مشاهده و مقایسه کنید.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
