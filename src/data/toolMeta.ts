/**
 * Tool metadata registry
 * Stores job titles, use cases, and FAQs for each tool
 * This pattern will be reused across all tools
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolMeta {
  jobTitle: string;
  useCases: string;
  faq: FAQItem[];
}

export const toolMetaRegistry: Record<string, ToolMeta> = {
  'discount-calculator': {
    jobTitle: 'محاسبه درصد تخفیف و قیمت نهایی کالا',
    useCases: 'مناسب برای فروشگاه‌ها، فروش آنلاین و محاسبات سریع تخفیف',
    faq: [
      {
        question: 'دقت محاسبات این ابزار چقدر است؟',
        answer: 'محاسبات دقیق ریاضی انجام می‌شود و نتایج تا یک تومان دقت دارند.'
      },
      {
        question: 'آیا محدودیتی در مبلغ وارد شده وجود دارد؟',
        answer: 'خیر، می‌توانید هر مبلغی را وارد کنید. سیستم اعداد بزرگ را نیز پردازش می‌کند.'
      },
      {
        question: 'واحد پول چیست؟',
        answer: 'نتایج به تومان نمایش داده می‌شوند. می‌توانید برای ارزهای دیگر هم استفاده کنید.'
      },
      {
        question: 'آیا اطلاعات من ذخیره می‌شود؟',
        answer: 'خیر، تمام محاسبات در مرورگر شما انجام می‌شود و هیچ داده‌ای به سرور ارسال نمی‌شود.'
      },
      {
        question: 'چگونه نتیجه را کپی کنم؟',
        answer: 'پس از محاسبه، روی دکمه "کپی نتیجه" کلیک کنید تا جزئیات کامل کپی شود.'
      }
    ]
  }
};
