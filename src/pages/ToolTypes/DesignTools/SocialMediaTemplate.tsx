import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const SocialMediaTemplate = () => {
  const [templateText, setTemplateText] = useState("عنوان خود را اینجا بنویسید");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateText(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader(""); // Pass empty string to fix TS error

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setIsLoading(false);
      };

      reader.onerror = () => {
        toast.error("خطا در بارگذاری تصویر");
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } else {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!templateRef.current) {
      toast.error("مشکلی در ایجاد فایل وجود دارد");
      return;
    }

    try {
      const canvas = await html2canvas(templateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', [canvas.width, canvas.height]);
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save("social-media-template.pdf");
      toast.success("دانلود با موفقیت انجام شد!");
    } catch (error) {
      toast.error("خطا در ایجاد PDF");
    }
  };

  const resetTemplate = () => {
    setTemplateText("عنوان خود را اینجا بنویسید");
    setImageSrc(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-lg shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-3">
        <h2 className="font-semibold text-lg flex items-center justify-center">
          <Sparkles className="mr-2" size={16} />
          ایجاد قالب پست شبکه‌های اجتماعی
        </h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <label htmlFor="templateText" className="block text-sm font-medium text-gray-700">متن:</label>
          <input
            type="text"
            id="templateText"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-sm"
            value={templateText}
            onChange={handleTextChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">تصویر:</label>
          <input
            type="file"
            id="imageUpload"
            className="mt-1 text-sm"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="border rounded-md overflow-hidden mb-4" ref={templateRef}>
          <div className="relative">
            {imageSrc ? (
              <img src={imageSrc} alt="Uploaded" className="w-full h-auto object-cover" style={{ maxHeight: '300px' }} />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                <span>تصویر پیش‌نمایش</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4">
              <h3 className="text-lg font-semibold">{templateText}</h3>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handleDownload}
            disabled={isLoading}
            className="bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 animate-spin" size={16} />
                در حال بارگذاری...
              </>
            ) : (
              <>
                <Download className="mr-2" size={16} />
                دانلود PDF
              </>
            )}
          </Button>
          <Button
            onClick={resetTemplate}
            variant="outline"
            className="border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200 text-sm"
          >
            بازنشانی
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaTemplate;
