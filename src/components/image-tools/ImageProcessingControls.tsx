
import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ImageProcessingControlsProps {
  slug: string;
  imageQuality: number;
  setImageQuality: (value: number) => void;
  imageWidth: number;
  setImageWidth: (value: number) => void;
  imageHeight: number;
  setImageHeight: (value: number) => void;
  rotationDegrees: number;
  setRotationDegrees: (value: number) => void;
  flipDirection: 'horizontal' | 'vertical';
  setFlipDirection: (value: 'horizontal' | 'vertical') => void;
  blurAmount: number;
  setBlurAmount: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  hueRotate: number;
  setHueRotate: (value: number) => void;
}

export function ImageProcessingControls({
  slug,
  imageQuality,
  setImageQuality,
  imageWidth,
  setImageWidth,
  imageHeight,
  setImageHeight,
  rotationDegrees,
  setRotationDegrees,
  flipDirection,
  setFlipDirection,
  blurAmount,
  setBlurAmount,
  contrast,
  setContrast,
  brightness,
  setBrightness,
  saturation,
  setSaturation,
  hueRotate,
  setHueRotate,
}: ImageProcessingControlsProps) {
  return (
    <div className="space-y-4">
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
      {slug === "image-contrast" && (
        <div className="flex items-center gap-4">
          <Label>کنتراست:</Label>
          <Slider min={0} max={200} step={1} value={[contrast]} onValueChange={values => setContrast(values[0])} />
          <span>{contrast}%</span>
        </div>
      )}
      {slug === "image-brightness" && (
        <div className="flex items-center gap-4">
          <Label>روشنایی:</Label>
          <Slider min={0} max={200} step={1} value={[brightness]} onValueChange={values => setBrightness(values[0])} />
          <span>{brightness}%</span>
        </div>
      )}
      {slug === "image-saturate" && (
        <div className="flex items-center gap-4">
          <Label>اشباع رنگ:</Label>
          <Slider min={0} max={200} step={1} value={[saturation]} onValueChange={values => setSaturation(values[0])} />
          <span>{saturation}%</span>
        </div>
      )}
      {slug === "image-hue-rotate" && (
        <div className="flex items-center gap-4">
          <Label>چرخش رنگ:</Label>
          <Slider min={0} max={360} step={1} value={[hueRotate]} onValueChange={values => setHueRotate(values[0])} />
          <span>{hueRotate}°</span>
        </div>
      )}
    </div>
  );
}
