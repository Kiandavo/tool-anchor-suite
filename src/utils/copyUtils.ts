
import { toast } from "sonner";

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.success("متن کپی شد!");
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      toast.error("کپی ناموفق بود!");
    });
};
