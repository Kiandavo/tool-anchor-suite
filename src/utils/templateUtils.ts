
import { toast } from '@/hooks/use-toast';

/**
 * Helper function to handle template downloads
 * @param templateId 
 * @param templateName 
 * @param format 
 */
export const downloadTemplate = (templateId: string, templateName: string, format: string) => {
  // In a real application, this would make an API call or directly download a file
  // For demo purposes, we're just showing a toast notification
  
  toast({
    title: "فایل در حال دانلود",
    description: `دانلود ${templateName} با فرمت ${format} آغاز شد.`,
  });
  
  // Simulate completion after a delay
  setTimeout(() => {
    toast({
      title: "دانلود تکمیل شد",
      description: "فایل با موفقیت دانلود شد.",
    });
    
    // Here you'd typically increment download count in the database
  }, 1500);
};

/**
 * Helper function to track template views 
 * @param templateId 
 */
export const trackTemplateView = (templateId: string) => {
  // In a real application, this would increment view count in the database
  console.log(`Template ${templateId} viewed`);
};

/**
 * Helper function to get file type icon based on format
 * @param format 
 * @returns icon name
 */
export const getFormatIcon = (format: string): string => {
  format = format.toLowerCase();
  
  if (format.includes('word')) return 'file-text';
  if (format.includes('excel') || format.includes('xlsx')) return 'file-text';
  if (format.includes('pdf')) return 'file-text';
  if (format.includes('psd') || format.includes('photoshop')) return 'image';
  if (format.includes('indesign')) return 'file-text';
  if (format.includes('notion')) return 'file-text';
  
  return 'file-text';
};
