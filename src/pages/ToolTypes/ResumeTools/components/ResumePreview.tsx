
import { Card } from "@/components/ui/card";
import { ResumeFormValues } from "../schema";

interface ResumePreviewProps {
  data: Partial<ResumeFormValues>;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <Card className="p-6 bg-white text-right">
      <div className="border rounded-lg p-6 min-h-[800px] relative">
        <h2 className="text-3xl font-bold mb-2">{data.fullName || "نام و نام خانوادگی"}</h2>
        <h3 className="text-xl text-primary mb-6">{data.jobTitle || "عنوان شغلی"}</h3>
        
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{data.email || "example@domain.com"}</span>
            <span>{data.phone || "۰۹۱۲۳۴۵۶۷۸۹"}</span>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">درباره من</h4>
            <p className="text-muted-foreground leading-relaxed">{data.about || "توضیحات درباره خودتان را اینجا وارد کنید..."}</p>
          </section>

          <section>
            <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">تحصیلات</h4>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.education || "سوابق تحصیلی خود را اینجا وارد کنید..."}</p>
          </section>

          <section>
            <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">تجربیات کاری</h4>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.experience || "سوابق کاری خود را اینجا وارد کنید..."}</p>
          </section>

          <section>
            <h4 className="text-lg font-semibold border-b border-primary/20 pb-2 mb-3">مهارت‌ها</h4>
            <p className="text-muted-foreground leading-relaxed">{data.skills || "مهارت‌های خود را اینجا وارد کنید..."}</p>
          </section>
        </div>
      </div>
    </Card>
  );
};
