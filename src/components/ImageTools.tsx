
import React, { useState } from 'react';
import { compressImage, resizeImage, convertToFormat, rotateImage, flipImage, applyGrayscale, applyBlur, invertImage, adjustContrast, adjustBrightness, adjustSaturation, adjustHueRotate } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUploader } from "./ImageUploader";
import { OutcomeInfoCard } from "./OutcomeInfoCard";
import { ImageProcessingControls } from "./image-tools/ImageProcessingControls";
import { ProcessedImageResult } from "./image-tools/ProcessedImageResult";

interface ImageToolsProps {
  slug: string;
}

export default function ImageTools({ slug }: ImageToolsProps) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImageURL, setProcessedImageURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  // Control states
  const [imageQuality, setImageQuality] = useState(70);
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  const [rotationDegrees, setRotationDegrees] = useState(90);
  const [flipDirection, setFlipDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [blurAmount, setBlurAmount] = useState(5);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);

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
      setOutcomeMsg("هیچ عکسی برای پردازش انتخاب نشده است.");
      return;
    }

    setIsProcessing(true);
    try {
      let processedBlob: Blob | null = null;

      switch (slug) {
        case 'image-compressor':
          processedBlob = await compressImage(selectedFile, imageQuality / 100);
          setOutcomeMsg("تصویر با موفقیت فشرده شد.");
          break;
        case 'image-resizer':
          processedBlob = await resizeImage(selectedFile, imageWidth, imageHeight);
          setOutcomeMsg("اندازه تصویر با موفقیت تغییر یافت.");
          break;
        case 'image-to-webp':
          processedBlob = await convertToFormat(selectedFile, 'webp');
          setOutcomeMsg("فرمت تصویر به WebP تغییر یافت.");
          break;
        case 'image-to-jpg':
          processedBlob = await convertToFormat(selectedFile, 'jpg');
          setOutcomeMsg("فرمت تصویر به JPG تغییر یافت.");
          break;
        case 'image-to-png':
          processedBlob = await convertToFormat(selectedFile, 'png');
          setOutcomeMsg("فرمت تصویر به PNG تغییر یافت.");
          break;
        case 'image-rotate':
          processedBlob = await rotateImage(selectedFile, rotationDegrees);
          setOutcomeMsg(`تصویر ${rotationDegrees} درجه چرخیده شد.`);
          break;
        case 'image-flip':
          processedBlob = await flipImage(selectedFile, flipDirection);
          setOutcomeMsg(`تصویر به صورت ${flipDirection === "horizontal" ? "افقی" : "عمودی"} وارونه شد.`);
          break;
        case 'image-grayscale':
          processedBlob = await applyGrayscale(selectedFile);
          setOutcomeMsg("تصویر سیاه و سفید شد.");
          break;
        case 'image-blur':
          processedBlob = await applyBlur(selectedFile, blurAmount);
          setOutcomeMsg(`افکت محوشدگی (${blurAmount}px) روی تصویر اعمال شد.`);
          break;
        case 'image-invert':
          processedBlob = await invertImage(selectedFile);
          setOutcomeMsg("رنگ‌های تصویر معکوس شد.");
          break;
        case 'image-contrast':
          processedBlob = await adjustContrast(selectedFile, contrast);
          setOutcomeMsg(`کنتراست تصویر به ${contrast}% تغییر یافت.`);
          break;
        case 'image-brightness':
          processedBlob = await adjustBrightness(selectedFile, brightness);
          setOutcomeMsg(`روشنایی تصویر به ${brightness}% تغییر یافت.`);
          break;
        case 'image-saturate':
          processedBlob = await adjustSaturation(selectedFile, saturation);
          setOutcomeMsg(`اشباع رنگ تصویر به ${saturation}% تغییر یافت.`);
          break;
        case 'image-hue-rotate':
          processedBlob = await adjustHueRotate(selectedFile, hueRotate);
          setOutcomeMsg(`چرخش رنگ تصویر به ${hueRotate} درجه تغییر یافت.`);
          break;
        default:
          toast({
            title: "خطا",
            description: "این ابزار هنوز پیاده‌سازی نشده است.",
            duration: 2000,
          });
          setOutcomeMsg("ابزار مورد نظر پیاده‌سازی نشده است.");
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
      setOutcomeMsg("هنگام پردازش تصویر خطایی رخ داد.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pt-6">
          <ImageUploader
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        </CardContent>
      </Card>

      <ImageProcessingControls
        slug={slug}
        imageQuality={imageQuality}
        setImageQuality={setImageQuality}
        imageWidth={imageWidth}
        setImageWidth={setImageWidth}
        imageHeight={imageHeight}
        setImageHeight={setImageHeight}
        rotationDegrees={rotationDegrees}
        setRotationDegrees={setRotationDegrees}
        flipDirection={flipDirection}
        setFlipDirection={setFlipDirection}
        blurAmount={blurAmount}
        setBlurAmount={setBlurAmount}
        contrast={contrast}
        setContrast={setContrast}
        brightness={brightness}
        setBrightness={setBrightness}
        saturation={saturation}
        setSaturation={setSaturation}
        hueRotate={hueRotate}
        setHueRotate={setHueRotate}
      />

      <Button
        onClick={handleImageProcess}
        disabled={!selectedFile || isProcessing}
      >
        {isProcessing ? "در حال پردازش..." : "پردازش"}
      </Button>

      <ProcessedImageResult
        processedImageURL={processedImageURL}
        selectedFile={selectedFile}
        onOutcomeUpdate={setOutcomeMsg}
      />

      {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
    </div>
  );
}
