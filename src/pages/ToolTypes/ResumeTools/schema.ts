
import * as z from "zod";

export const resumeFormSchema = z.object({
  fullName: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  jobTitle: z.string().min(2, "عنوان شغلی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z.string().min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد"),
  about: z.string().min(50, "درباره من باید حداقل ۵۰ کاراکتر باشد"),
  education: z.string().min(10, "سوابق تحصیلی باید حداقل ۱۰ کاراکتر باشد"),
  experience: z.string().min(10, "سوابق کاری باید حداقل ۱۰ کاراکتر باشد"),
  skills: z.string().min(5, "مهارت‌ها باید حداقل ۵ کاراکتر باشد")
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>;
