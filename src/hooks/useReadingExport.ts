import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';

export interface ReadingData {
  title: string;
  content: string;
  timestamp: Date;
  type: string;
  metadata?: Record<string, any>;
}

export const useReadingExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToPDF = async (elementId: string, readingData: ReadingData) => {
    setIsExporting(true);
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error('Element not found');

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${readingData.type}-${Date.now()}.pdf`);

      toast({
        title: 'خروجی PDF',
        description: 'فایل PDF با موفقیت ذخیره شد',
      });
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در ایجاد فایل PDF',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToImage = async (elementId: string, readingData: ReadingData) => {
    setIsExporting(true);
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error('Element not found');

      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${readingData.type}-${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);
      });

      toast({
        title: 'خروجی تصویر',
        description: 'تصویر با موفقیت ذخیره شد',
      });
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در ایجاد تصویر',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generateShareLink = (readingData: ReadingData): string => {
    const encodedData = btoa(JSON.stringify({
      title: readingData.title,
      content: readingData.content,
      type: readingData.type,
      timestamp: readingData.timestamp.getTime(),
    }));
    
    return `${window.location.origin}/shared-reading?data=${encodedData}`;
  };

  const shareReading = async (readingData: ReadingData) => {
    const shareLink = generateShareLink(readingData);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: readingData.title,
          text: readingData.content,
          url: shareLink,
        });
        toast({
          title: 'اشتراک‌گذاری موفق',
          description: 'فال با موفقیت اشتراک‌گذاری شد',
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      await navigator.clipboard.writeText(shareLink);
      toast({
        title: 'لینک کپی شد',
        description: 'لینک اشتراک‌گذاری در کلیپبورد کپی شد',
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'کپی شد',
        description: 'متن در کلیپبورد کپی شد',
      });
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در کپی کردن متن',
        variant: 'destructive',
      });
    }
  };

  return {
    isExporting,
    exportToPDF,
    exportToImage,
    shareReading,
    copyToClipboard,
    generateShareLink,
  };
};
