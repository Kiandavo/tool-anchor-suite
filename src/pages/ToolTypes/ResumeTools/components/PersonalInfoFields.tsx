
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { User, Briefcase, Mail, Phone } from "lucide-react";

export const PersonalInfoFields = () => {
  const form = useFormContext();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="w-4 h-4" />
              نام و نام خانوادگی
            </FormLabel>
            <FormControl>
              <Input placeholder="مثال: علی محمدی" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              عنوان شغلی
            </FormLabel>
            <FormControl>
              <Input placeholder="مثال: توسعه‌دهنده وب" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              ایمیل
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="example@domain.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              شماره تماس
            </FormLabel>
            <FormControl>
              <Input type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
