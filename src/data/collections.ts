// Curated tool collections for specific audiences

export interface Collection {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  toolSlugs: string[];
}

export const collections: Collection[] = [
  {
    id: 'students',
    title: 'ابزارهای کاربردی برای دانشجوها',
    description: 'مجموعه‌ای از ابزارهای ضروری برای دانشجویان: محاسبه معدل، تبدیل واحد، ویرایش متن، و ابزارهای مطالعه.',
    slug: 'students',
    icon: '🎓',
    toolSlugs: [
      'gpa-calculator',
      'percentage-calculator',
      'word-counter',
      'text-compare',
      'age-calculator',
      'unit-converter',
      'date-converter',
      'note-to-self',
      'pomodoro-timer',
      'random-number',
    ],
  },
  {
    id: 'ecommerce',
    title: 'ابزارهای ضروری برای فروشگاه اینترنتی',
    description: 'ابزارهای لازم برای مدیریت فروشگاه آنلاین: محاسبه تخفیف، بهینه‌سازی تصویر، سئو، و تولید QR کد.',
    slug: 'ecommerce',
    icon: '🛒',
    toolSlugs: [
      'discount-calculator',
      'percentage-calculator',
      'image-compressor',
      'image-resizer',
      'qr-generator',
      'meta-tag-generator',
      'keyword-density',
      'color-palette-generator',
      'json-formatter',
      'vat-calculator',
    ],
  },
  {
    id: 'content-creators',
    title: 'ابزارهای مفید برای تولیدکننده محتوا',
    description: 'ابزارهای کاربردی برای بلاگرها، اینفلوئنسرها و تولیدکنندگان محتوا: ویرایش متن، تصویر، و ابزارهای سئو.',
    slug: 'content-creators',
    icon: '✨',
    toolSlugs: [
      'word-counter',
      'text-formatter',
      'image-compressor',
      'image-resizer',
      'image-cropper',
      'meta-tag-generator',
      'keyword-density',
      'color-palette-generator',
      'qr-generator',
      'hafez-fortune',
      'instagram-caption-ideas',
      'hashtag-generator',
    ],
  },
];

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find(c => c.slug === slug);
};
