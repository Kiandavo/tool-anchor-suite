
import React, { useRef, useState } from 'react';
import {
  compressImage, resizeImage, convertToFormat, rotateImage, flipImage,
  applyGrayscale, applyBlur
} from "@/utils/toolUtils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ImageToolsProps {
  slug: string;
}

const TOOLS_WITH_PARAMS = [
  'image-compressor', 'image-resizer', 'image-rotate', 'image-flip', 'image-blur'
];

export default function ImageTools({ slug }: ImageToolsProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImageURL, setProcessedImageURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageQuality, setImageQuality] = useState(70);
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  const [rotationDegrees, setRotationDegrees] = useState(90);
  const [flipDirection, setFlipDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [blurAmount, setBlurAmount] = useState(5);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setProcessedImageURL(null);
    }
  };

  const handleImageProcess = async () => {
    if (!selectedFile) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا یک تصویر انتخاب کنید.",
        duration: 2000,
      });
      return;
    }
    setIsProcessing(true);
    let processedBlob: Blob | null = null;
    try {
      switch (slug) {
        case 'image-compressor':
          processedBlob = await compressImage(selectedFile, imageQuality / 100); break;
        case 'image-resizer':
          processedBlob = await resizeImage(selectedFile, imageWidth, imageHeight); break;
        case 'image-to-webp':
          processedBlob = await convertToFormat(selectedFile, 'webp'); break;
        case 'image-to-jpg':
          processedBlob = await convertToFormat(selectedFile, 'jpg'); break;
        case 'image-to-png':
          processedBlob = await convertToFormat(selectedFile, 'png'); break;
        case 'image-rotate':
          processedBlob = await rotateImage(selectedFile, rotationDegrees); break;
        case 'image-flip':
          processedBlob = await flipImage(selectedFile, flipDirection); break;
        case 'image-grayscale':
          processedBlob = await applyGrayscale(selectedFile); break;
        case 'image-blur':
          processedBlob = await applyBlur(selectedFile, blurAmount); break;
        default:
          toast({
            title: "خطا",
            description: "این ابزار هنوز پیاده‌سازی نشده است.",
            duration: 2000,
          });
      }
      if (processedBlob) {
        const url = URL.createObjectURL(processedBlob);
        setProcessedImageURL(url);
        toast({
          title: "موفقیت",
          description: "تصویر با موفقیت پردازش شد.",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در پردازش تصویر. لطفاً دوباره تلاش کنید.",
        duration: 2000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="mb-3"
          />
        </CardContent>
      </Card>
      {/* Tool-dependent parameters */}
      {slug === "image-compressor" && (
        <div className="flex items-center gap-4">
          <Label>کیفیت:</Label>
          <Slider min={10} max={100} step={1} value={[imageQuality]} onValueChange={values => setImageQuality(values[0])} />
          <span>{imageQuality}</span>
        </div>
      )}
      {slug === "image-resizer" && (
        <div className="flex items-center gap-4">
          <Label>عرض:</Label>
          <input type="number" min={2} max={8000} value={imageWidth} onChange={e => setImageWidth(Number(e.target.value))} className="w-20" />
          <Label>ارتفاع:</Label>
          <input type="number" min={2} max={8000} value={imageHeight} onChange={e => setImageHeight(Number(e.target.value))} className="w-20" />
        </div>
      )}
      {slug === "image-rotate" && (
        <div className="flex items-center gap-4">
          <Label>درجه:</Label>
          <input type="number" min={-360} max={360} value={rotationDegrees} onChange={e => setRotationDegrees(Number(e.target.value))} className="w-20" />
        </div>
      )}
      {slug === "image-flip" && (
        <div className="flex items-center gap-4">
          <Label>جهت:</Label>
          <RadioGroup value={flipDirection} onValueChange={val => setFlipDirection(val as 'horizontal' | 'vertical')} className="flex gap-4">
            <RadioGroupItem value="horizontal">افقی</RadioGroupItem>
            <RadioGroupItem value="vertical">عمودی</RadioGroupItem>
          </RadioGroup>
        </div>
      )}
      {slug === "image-blur" && (
        <div className="flex items-center gap-4">
          <Label>میزان تاری:</Label>
          <Slider min={1} max={30} step={1} value={[blurAmount]} onValueChange={values => setBlurAmount(values[0])} />
          <span>{blurAmount}px</span>
        </div>
      )}
      <Button
        onClick={handleImageProcess}
        disabled={!selectedFile || isProcessing}
      >
        {isProcessing ? "در حال پردازش..." : "پردازش"}
      </Button>
      {processedImageURL && (
        <div className="my-4">
          <img src={processedImageURL} alt="processed result" className="max-w-full max-h-96 rounded shadow" />
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(processedImageURL);
                toast({
                  title: "کپی شد!",
                  description: "لینک تصویر در کلیپ‌بورد کپی شد.",
                  duration: 2000
                });
              }}
            >کپی لینک</Button>
            <Button
              variant="secondary"
              onClick={() => {
                const a = document.createElement('a');
                a.href = processedImageURL;
                a.download = `processed-${selectedFile?.name || "image"}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                toast({
                  title: "در حال دانلود...",
                  description: "عکس دانلود شد.",
                  duration: 2000,
                });
              }}
            >دانلود تصویر</Button>
          </div>
        </div>
      )}
    </div>
  );
}
