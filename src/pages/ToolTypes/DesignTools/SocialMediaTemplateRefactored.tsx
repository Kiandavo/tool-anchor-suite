
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { TemplateControls } from '@/components/design/social-media/TemplateControls';
import { ColorSchemeSelector } from '@/components/design/social-media/ColorSchemeSelector';
import { BackgroundImageUploader } from '@/components/design/social-media/BackgroundImageUploader';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

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

const SocialMediaTemplateRefactored: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('instagram-post');
  const [title, setTitle] = useState<string>('عنوان اصلی');
  const [subtitle, setSubtitle] = useState<string>('عنوان فرعی');
  const [description, setDescription] = useState<string>('توضیحات اضافی برای محتوا');
  const [selectedScheme, setSelectedScheme] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [includeImage, setIncludeImage] = useState<boolean>(false);
  const [position, setPosition] = useState<'center' | 'top' | 'bottom'>('center');
  const [textAlign, setTextAlign] = useState<'center' | 'right' | 'left'>('center');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isImageGenerated, setIsImageGenerated] = useState<boolean>(false);
  
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
    setIsGenerating(true);
    setTimeout(() => {
      generateImage();
      setIsGenerating(false);
      setIsImageGenerated(true);
    }, 600); // Add a small delay to show the loading state
  };

  const generateImage = () => {
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
        ctx.font = `bold ${titleSize}px Vazirmatn`;
        ctx.fillText(title, textX, textY + textOffset);
        textOffset += titleSize + 15;
      }
      
      // Draw subtitle
      if (subtitle) {
        ctx.fillStyle = scheme.accent;
        ctx.font = `bold ${subtitleSize}px Vazirmatn`;
        ctx.fillText(subtitle, textX, textY + textOffset);
        textOffset += subtitleSize + 15;
      }
      
      // Draw description
      if (description) {
        ctx.fillStyle = scheme.text;
        ctx.font = `${descSize}px Vazirmatn`;
        
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

  // Reset the generated image state when parameters change
  useEffect(() => {
    if (isImageGenerated) {
      setIsImageGenerated(false);
    }
  }, [title, subtitle, description, selectedSize, selectedScheme, position, textAlign, includeImage, uploadedImage]);

  const selectedSizeDetails = templateSizes[selectedSize];
  
  return (
    <Card className="w-full shadow-md bg-white dark:bg-gray-800 border-white/20 backdrop-blur-sm transition-all duration-300" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-xl">
        <CardTitle className="flex items-center justify-center gap-2 text-gradient">
          <Image className="h-5 w-5" />
          قالب شبکه‌های اجتماعی
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="design" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 rounded-lg">
            <TabsTrigger value="design" className="rounded-lg">طراحی</TabsTrigger>
            <TabsTrigger value="preview" className="rounded-lg">پیش‌نمایش</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TemplateControls 
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                title={title}
                setTitle={setTitle}
                subtitle={subtitle}
                setSubtitle={setSubtitle}
                description={description}
                setDescription={setDescription}
                position={position}
                setPosition={setPosition}
                textAlign={textAlign}
                setTextAlign={setTextAlign}
                templateSizes={templateSizes}
              />

              <div className="space-y-4">
                <ColorSchemeSelector 
                  colorSchemes={colorSchemes}
                  selectedScheme={selectedScheme}
                  setSelectedScheme={setSelectedScheme}
                />

                <BackgroundImageUploader 
                  includeImage={includeImage}
                  setIncludeImage={setIncludeImage}
                  uploadedImage={uploadedImage}
                  onImageUpload={handleImageUpload}
                />

                <div className="space-y-2 mt-4">
                  <Button 
                    onClick={handleGenerateImage} 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <LoadingSpinner size="sm" text="در حال ایجاد..." />
                    ) : (
                      "ایجاد تصویر"
                    )}
                  </Button>
                  <Button 
                    onClick={handleDownload} 
                    variant="outline" 
                    className="w-full"
                    disabled={!isImageGenerated}
                  >
                    دانلود تصویر
                  </Button>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <p>اندازه قالب انتخاب‌شده: {selectedSizeDetails.width}×{selectedSizeDetails.height} پیکسل</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 flex flex-col items-center animate-fade-in">
            <div className="relative border rounded-md max-w-full overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-inner">
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                  <LoadingSpinner size="lg" text="در حال ایجاد تصویر..." />
                </div>
              )}
              <canvas 
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{
                  aspectRatio: selectedSizeDetails.width / selectedSizeDetails.height,
                }}
              ></canvas>
            </div>
            
            <div className="flex gap-2 w-full max-w-md">
              <Button 
                onClick={handleGenerateImage} 
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <LoadingSpinner size="sm" text="در حال ایجاد..." />
                ) : (
                  "ایجاد تصویر"
                )}
              </Button>
              <Button 
                onClick={handleDownload} 
                variant="outline" 
                className="flex-1"
                disabled={!isImageGenerated}
              >
                دانلود تصویر
              </Button>
            </div>
            
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              برای ایجاد تصویر، ابتدا روی "ایجاد تصویر" کلیک کنید.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialMediaTemplateRefactored;
