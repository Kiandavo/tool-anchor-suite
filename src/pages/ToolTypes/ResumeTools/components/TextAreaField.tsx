
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
}

export const TextAreaField = ({ name, label, placeholder, icon: Icon }: TextAreaFieldProps) => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder={placeholder}
              className="min-h-[100px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
