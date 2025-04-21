
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ToolInfoCard } from '@/components/ToolInfoCard';

const formSchema = z.object({
  fullName: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  jobTitle: z.string().min(2, "عنوان شغلی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z.string().min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد"),
  about: z.string().min(50, "درباره من باید حداقل ۵۰ کاراکتر باشد"),
  education: z.string().min(10, "سوابق تحصیلی باید حداقل ۱۰ کاراکتر باشد"),
  experience: z.string().min(10, "سوابق کاری باید حداقل ۱۰ کاراکتر باشد"),
  skills: z.string().min(5, "مهارت‌ها باید حداقل ۵ کاراکتر باشد")
})

const ResumeBuilder = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      about: "",
      education: "",
      experience: "",
      skills: ""
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    // TODO: Implement PDF generation
  }

  return (
    <div className="space-y-6">
      <ToolInfoCard
        name="ساخت رزومه حرفه‌ای"
        description="اطلاعات خود را در فرم زیر وارد کنید. پس از تکمیل فرم می‌توانید رزومه خود را دانلود کنید."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی</FormLabel>
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
                    <FormLabel>عنوان شغلی</FormLabel>
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
                    <FormLabel>ایمیل</FormLabel>
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
                    <FormLabel>شماره تماس</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>درباره من</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="خلاصه‌ای از مهارت‌ها و تجربیات خود را بنویسید"
                        className="h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سوابق تحصیلی</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="مقطع تحصیلی، رشته، دانشگاه و سال فارغ‌التحصیلی"
                        className="h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سوابق کاری</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="عنوان شغلی، نام شرکت، تاریخ شروع و پایان و شرح وظایف"
                        className="h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مهارت‌ها</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="مهارت‌های خود را با کاما از هم جدا کنید"
                        className="h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                دانلود رزومه
              </Button>
            </form>
          </Form>
        </Card>

        <Card className="p-6">
          <div className="text-right border rounded-lg p-6 min-h-[800px] relative">
            <h2 className="text-2xl font-bold mb-2">{form.watch("fullName") || "نام و نام خانوادگی"}</h2>
            <h3 className="text-lg text-muted-foreground mb-4">{form.watch("jobTitle") || "عنوان شغلی"}</h3>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{form.watch("email") || "example@domain.com"}</span>
                <span>{form.watch("phone") || "۰۹۱۲۳۴۵۶۷۸۹"}</span>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h4 className="font-semibold border-b pb-2 mb-2">درباره من</h4>
                <p className="text-sm whitespace-pre-wrap">{form.watch("about") || "توضیحات درباره خودتان را اینجا وارد کنید..."}</p>
              </section>

              <section>
                <h4 className="font-semibold border-b pb-2 mb-2">سوابق تحصیلی</h4>
                <p className="text-sm whitespace-pre-wrap">{form.watch("education") || "سوابق تحصیلی خود را اینجا وارد کنید..."}</p>
              </section>

              <section>
                <h4 className="font-semibold border-b pb-2 mb-2">سوابق کاری</h4>
                <p className="text-sm whitespace-pre-wrap">{form.watch("experience") || "سوابق کاری خود را اینجا وارد کنید..."}</p>
              </section>

              <section>
                <h4 className="font-semibold border-b pb-2 mb-2">مهارت‌ها</h4>
                <p className="text-sm whitespace-pre-wrap">{form.watch("skills") || "مهارت‌های خود را اینجا وارد کنید..."}</p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
