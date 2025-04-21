
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from '@/utils/pdfUtils';
import { Download } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  jobTitle: z.string().min(2, "عنوان شغلی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z.string().min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد"),
  about: z.string().min(50, "درباره من باید حداقل ۵۰ کاراکتر باشد"),
  education: z.string().min(10, "سوابق تحصیلی باید حداقل ۱۰ کاراکتر باشد"),
  experience: z.string().min(10, "سوابق کاری باید حداقل ۱۰ کاراکتر باشد"),
  skills: z.string().min(5, "مهارت‌ها باید حداقل ۵ کاراکتر باشد")
});

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
  });

  const formValues = form.watch();

  return (
    <div className="space-y-6">
      <ToolInfoCard
        name="ساخت رزومه حرفه‌ای"
        description="اطلاعات خود را در فرم زیر وارد کنید. پس از تکمیل فرم می‌توانید رزومه خود را دانلود کنید."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 h-fit sticky top-6">
          <Form {...form}>
            <form className="space-y-4 text-right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>درباره من</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="خلاصه‌ای از مهارت‌ها و تجربیات خود را بنویسید"
                        className="min-h-[100px]"
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
                        className="min-h-[100px]"
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
                        className="min-h-[100px]"
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
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <PDFDownloadLink
                document={<ResumePDF data={formValues} />}
                fileName={`${formValues.fullName || 'resume'}.pdf`}
                className="block w-full"
              >
                {({ loading }) => (
                  <Button 
                    type="button" 
                    className="w-full" 
                    disabled={loading || !form.formState.isValid}
                  >
                    <Download className="ml-2" />
                    {loading ? "در حال آماده‌سازی..." : "دانلود رزومه"}
                  </Button>
                )}
              </PDFDownloadLink>
            </form>
          </Form>
        </Card>

        <Card className="p-6 bg-white text-right">
          <div className="border rounded-lg p-6 min-h-[800px] relative">
            <h2 className="text-3xl font-bold mb-2">{formValues.fullName || "نام و نام خانوادگی"}</h2>
            <h3 className="text-xl text-primary mb-6">{formValues.jobTitle || "عنوان شغلی"}</h3>
            
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{formValues.email || "example@domain.com"}</span>
                <span>{formValues.phone || "۰۹۱۲۳۴۵۶۷۸۹"}</span>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">درباره من</h4>
                <p className="text-muted-foreground leading-relaxed">{formValues.about || "توضیحات درباره خودتان را اینجا وارد کنید..."}</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">تحصیلات</h4>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formValues.education || "سوابق تحصیلی خود را اینجا وارد کنید..."}</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">تجربیات کاری</h4>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formValues.experience || "سوابق کاری خود را اینجا وارد کنید..."}</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">مهارت‌ها</h4>
                <p className="text-muted-foreground leading-relaxed">{formValues.skills || "مهارت‌های خود را اینجا وارد کنید..."}</p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
