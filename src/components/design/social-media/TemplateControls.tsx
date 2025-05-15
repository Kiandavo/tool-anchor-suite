
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TemplateSize {
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

interface TemplateControlsProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  description: string;
  setDescription: (description: string) => void;
  position: 'center' | 'top' | 'bottom';
  setPosition: (position: 'center' | 'top' | 'bottom') => void;
  textAlign: 'center' | 'right' | 'left';
  setTextAlign: (textAlign: 'center' | 'right' | 'left') => void;
  templateSizes: Record<string, TemplateSize>;
}

export const TemplateControls: React.FC<TemplateControlsProps> = ({
  selectedSize,
  setSelectedSize,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  description,
  setDescription,
  position,
  setPosition,
  textAlign,
  setTextAlign,
  templateSizes
}) => {
  return (
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
  );
};
