
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface TemplateSize {
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

const templateSizes: Record<string, TemplateSize> = {
  'instagram-post': {
    name: 'پست اینستاگرام',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1'
  },
  'instagram-story': {
    name: 'استوری اینستاگرام',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16'
  },
  'twitter-post': {
    name: 'پست توییتر',
    width: 1200,
    height: 675,
    aspectRatio: '16:9'
  },
  'facebook-post': {
    name: 'پست فیسبوک',
    width: 1200,
    height: 630,
    aspectRatio: '1.91:1'
  },
  'linkedin-post': {
    name: 'پست لینکدین',
    width: 1200,
    height: 628,
    aspectRatio: '1.91:1'
  },
  'youtube-thumbnail': {
    name: 'تامبنیل یوتیوب',
    width: 1280,
    height: 720,
    aspectRatio: '16:9'
  }
};

const colorSchemes = [
  { name: 'آبی', bg: '#1e40af', text: '#ffffff', accent: '#60a5fa' },
  { name: 'سبز', bg: '#166534', text: '#ffffff', accent: '#86efac' },
  { name: 'قرمز', bg: '#991b1b', text: '#ffffff', accent: '#fca5a5' },
  { name: 'بنفش', bg: '#5b21b6', text: '#ffffff', accent: '#c4b5fd' },
  { name: 'خنثی', bg: '#1f2937', text: '#ffffff', accent: '#9ca3af' },
  { name: 'روشن', bg: '#f9fafb', text: '#111827', accent: '#6366f1' },
];

const SocialMediaTemplate: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('instagram-post');
  const [title, setTitle] = useState<string>('عنوان اصلی');
  const [subtitle, setSubtitle] = useState<string>('عنوان فرعی');
  const [description, setDescription] = useState<string>('توضیحات اضافی برای محتوا');
  const [selectedScheme, setSelectedScheme] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [includeImage, setIncludeImage] = useState<boolean>(false);
  const [position, setPosition] = useState<'center' | 'top' | 'bottom'>('center');
  const [textAlign, setTextAlign] = useState<'center' | 'right' | 'left'>('center');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setIncludeImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = templateSizes[selectedSize];
    
    // Set canvas size
    canvas.width = size.width;
    canvas.height = size.height;
    
    // Get color scheme
    const scheme = colorSchemes[selectedScheme];

    // Draw background
    ctx.fillStyle = scheme.bg;
    ctx.fillRect(0, 0, size.width, size.height);

    // If image should be included and is available
    if (includeImage && uploadedImage) {
      const img = new Image();
      img.onload = () => {
        // Draw image
        let imgWidth, imgHeight, imgX, imgY;
        
        // Calculate image dimensions to fit or cover canvas
        const imgRatio = img.width / img.height;
        const canvasRatio = size.width / size.height;
        
        if (imgRatio > canvasRatio) {
          // Image is wider than canvas
          imgHeight = size.height;
          imgWidth = imgHeight * imgRatio;
          imgY = 0;
          imgX = (size.width - imgWidth) / 2;
        } else {
          // Image is taller than canvas
          imgWidth = size.width;
          imgHeight = imgWidth / imgRatio;
          imgX = 0;
          imgY = (size.height - imgHeight) / 2;
        }
        
        // Draw with semi-transparent overlay
        ctx.globalAlpha = 0.6;
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = scheme.bg;
        ctx.fillRect(0, 0, size.width, size.height);
        ctx.globalAlpha = 1;

        drawText();
        enableDownload();
      };
      img.src = uploadedImage;
    } else {
      // Just draw the text without an image
      drawText();
      enableDownload();
    }

    function drawText() {
      ctx.globalAlpha = 1;
      
      // Determine text positioning
      let textY;
      const padding = size.height * 0.1;
      
      if (position === 'top') {
        textY = padding;
      } else if (position === 'bottom') {
        textY = size.height - padding;
      } else { // center
        textY = size.height / 2;
      }
      
      // Adjust text position based on how many text elements we have
      const titleSize = Math.max(size.width * 0.06, 32);
      const subtitleSize = titleSize * 0.7;
      const descSize = subtitleSize * 0.85;
      
      let textOffset = 0;
      if (position === 'center') {
        textOffset = -((title ? titleSize : 0) + 
                       (subtitle ? subtitleSize + 15 : 0) + 
                       (description ? descSize + 15 : 0)) / 2;
      } else if (position === 'bottom') {
        textOffset = -((title ? titleSize : 0) + 
                      (subtitle ? subtitleSize + 15 : 0) + 
                      (description ? descSize + 15 : 0));
      }
      
      // Set text alignment
      let textX: number;
      if (textAlign === 'center') {
        ctx.textAlign = 'center';
        textX = size.width / 2;
      } else if (textAlign === 'right') {
        ctx.textAlign = 'right';
        textX = size.width - padding;
      } else { // left
        ctx.textAlign = 'left';
        textX = padding;
      }
      
      // Draw accent rectangle
      if (title) {
        const accentHeight = 8;
        const accentWidth = size.width * 0.15;
        ctx.fillStyle = scheme.accent;
        ctx.fillRect(
          textAlign === 'center' ? (size.width - accentWidth) / 2 : 
          textAlign === 'right' ? size.width - padding - accentWidth : 
          padding,
          textY + textOffset - titleSize - accentHeight - 10,
          accentWidth,
          accentHeight
        );
      }
      
      // Draw title
      if (title) {
        ctx.fillStyle = scheme.text;
        ctx.font = `bold ${titleSize}px Arial`;
        ctx.fillText(title, textX, textY + textOffset);
        textOffset += titleSize + 15;
      }
      
      // Draw subtitle
      if (subtitle) {
        ctx.fillStyle = scheme.accent;
        ctx.font = `bold ${subtitleSize}px Arial`;
        ctx.fillText(subtitle, textX, textY + textOffset);
        textOffset += subtitleSize + 15;
      }
      
      // Draw description
      if (description) {
        ctx.fillStyle = scheme.text;
        ctx.font = `${descSize}px Arial`;
        
        // Multi-line description
        const maxWidth = size.width - (padding * 2);
        const words = description.split(' ');
        let line = '';
        const lineHeight = descSize * 1.2;
        
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > maxWidth && i > 0) {
            ctx.fillText(line, textX, textY + textOffset);
            line = words[i] + ' ';
            textOffset += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, textX, textY + textOffset);
      }
    }

    function enableDownload() {
      toast({
        title: "تصویر ایجاد شد",
        description: "می‌توانید روی دکمه دانلود کلیک کنید.",
        duration: 3000,
      });
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      const size = templateSizes[selectedSize];
      downloadLink.href = dataUrl;
      downloadLink.download = `${size.name}-${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast({
        title: "دانلود شد!",
        description: "تصویر با موفقیت دانلود شد.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "خطا در دانلود",
        description: "مشکلی در دانلود تصویر رخ داد. لطفاً مجدداً تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  const selectedSizeDetails = templateSizes[selectedSize];
  
  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Image className="h-5 w-5" />
          قالب شبکه‌های اجتماعی
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="design" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="design">طراحی</TabsTrigger>
            <TabsTrigger value="preview">پیش‌نمایش</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-size">اندازه قالب</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger id="template-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(templateSizes).map(([key, size]) => (
                        <SelectItem key={key} value={key}>
                          {size.name} ({size.width}×{size.height}) - {size.aspectRatio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">عنوان اصلی</Label>
                  <Input 
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="عنوان اصلی را وارد کنید"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">عنوان فرعی</Label>
                  <Input 
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="عنوان فرعی را وارد کنید"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="توضیحات را وارد کنید"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>موقعیت متن</Label>
                  <RadioGroup 
                    value={position} 
                    onValueChange={(value) => setPosition(value as 'center' | 'top' | 'bottom')}
                    className="flex space-x-4 space-x-reverse"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="top" id="top" />
                      <Label htmlFor="top">بالا</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="center" id="center" />
                      <Label htmlFor="center">وسط</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="bottom" id="bottom" />
                      <Label htmlFor="bottom">پایین</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>تراز متن</Label>
                  <RadioGroup 
                    value={textAlign} 
                    onValueChange={(value) => setTextAlign(value as 'center' | 'right' | 'left')}
                    className="flex space-x-4 space-x-reverse"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="right" id="right" />
                      <Label htmlFor="right">راست</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="center" id="center-align" />
                      <Label htmlFor="center-align">وسط</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="left" id="left" />
                      <Label htmlFor="left">چپ</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>ترکیب رنگ</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorSchemes.map((scheme, index) => (
                      <div 
                        key={index}
                        className={`border rounded-md p-2 cursor-pointer ${
                          selectedScheme === index ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedScheme(index)}
                      >
                        <div 
                          className="h-12 rounded-md mb-1"
                          style={{ backgroundColor: scheme.bg }}
                        ></div>
                        <div className="text-xs text-center">{scheme.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>تصویر پس‌زمینه</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="checkbox" 
                        id="include-image"
                        checked={includeImage}
                        onChange={(e) => setIncludeImage(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="include-image">استفاده از تصویر پس‌زمینه</Label>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={!includeImage}
                        className="flex-1"
                      >
                        انتخاب تصویر
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    
                    {uploadedImage && includeImage && (
                      <div className="mt-2 border rounded-md p-2 bg-gray-50">
                        <img 
                          src={uploadedImage}
                          alt="تصویر انتخاب‌شده"
                          className="h-32 object-contain mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Button onClick={handleGenerateImage} className="w-full">
                    ایجاد تصویر
                  </Button>
                  <Button 
                    onClick={handleDownload} 
                    variant="outline" 
                    className="w-full"
                    disabled={!canvasRef.current}
                  >
                    دانلود تصویر
                  </Button>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  <p>اندازه قالب انتخاب‌شده: {selectedSizeDetails.width}×{selectedSizeDetails.height} پیکسل</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 flex flex-col items-center">
            <div className="relative border rounded-md max-w-full overflow-hidden bg-gray-100">
              <canvas 
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{
                  aspectRatio: selectedSizeDetails.width / selectedSizeDetails.height,
                }}
              ></canvas>
            </div>
            
            <div className="flex gap-2 w-full max-w-md">
              <Button onClick={handleGenerateImage} className="flex-1">
                ایجاد تصویر
              </Button>
              <Button 
                onClick={handleDownload} 
                variant="outline" 
                className="flex-1"
                disabled={!canvasRef.current}
              >
                دانلود تصویر
              </Button>
            </div>
            
            <p className="text-center text-sm text-gray-500">
              برای ایجاد تصویر، ابتدا روی "ایجاد تصویر" کلیک کنید.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialMediaTemplate;
