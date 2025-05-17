
import { toast } from 'sonner';

export const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("در حافظه کپی شد");
      })
      .catch(() => {
        // Fallback method for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          toast.success("در حافظه کپی شد");
        } catch (err) {
          toast.error("کپی ناموفق بود");
          console.error('Unable to copy to clipboard', err);
        }
        
        document.body.removeChild(textArea);
      });
  } catch (err) {
    toast.error("کپی ناموفق بود");
    console.error('Copy operation failed:', err);
  }
};
