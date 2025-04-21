
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from '@/utils/pdfUtils';
import { Download, FileText, Book, Briefcase, Star } from 'lucide-react';
import { resumeFormSchema, type ResumeFormValues } from './schema';
import { PersonalInfoFields } from './components/PersonalInfoFields';
import { TextAreaField } from './components/TextAreaField';
import { ResumePreview } from './components/ResumePreview';

const ResumeBuilder = () => {
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
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
          <FormProvider {...form}>
            <form className="space-y-4 text-right">
              <PersonalInfoFields />

              <TextAreaField
                name="about"
                label="درباره من"
                placeholder="خلاصه‌ای از مهارت‌ها و تجربیات خود را بنویسید"
                icon={FileText}
              />

              <TextAreaField
                name="education"
                label="سوابق تحصیلی"
                placeholder="مقطع تحصیلی، رشته، دانشگاه و سال فارغ‌التحصیلی"
                icon={Book}
              />

              <TextAreaField
                name="experience"
                label="سوابق کاری"
                placeholder="عنوان شغلی، نام شرکت، تاریخ شروع و پایان و شرح وظایف"
                icon={Briefcase}
              />

              <TextAreaField
                name="skills"
                label="مهارت‌ها"
                placeholder="مهارت‌های خود را با کاما از هم جدا کنید"
                icon={Star}
              />

              <PDFDownloadLink
                document={<ResumePDF data={formValues as ResumeFormValues} />}
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
          </FormProvider>
        </Card>

        <ResumePreview data={formValues} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
