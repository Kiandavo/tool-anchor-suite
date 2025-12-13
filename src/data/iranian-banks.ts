// Iranian Banks Loan Data - Updated for 1404
export interface BankLoanProduct {
  id: string;
  bankName: string;
  bankNameEn: string;
  loanType: string;
  interestRate: number;
  maxTerm: number; // months
  maxAmount: number; // toman
  description: string;
  category: 'housing' | 'consumer' | 'car' | 'marriage' | 'gharz' | 'business' | 'agricultural';
}

export const iranianBanks: BankLoanProduct[] = [
  // بانک مسکن
  {
    id: 'maskan-housing',
    bankName: 'بانک مسکن',
    bankNameEn: 'Maskan',
    loanType: 'وام مسکن',
    interestRate: 4,
    maxTerm: 240,
    maxAmount: 5000000000,
    description: 'وام خرید و ساخت مسکن با نرخ سود دولتی',
    category: 'housing',
  },
  {
    id: 'maskan-consumer',
    bankName: 'بانک مسکن',
    bankNameEn: 'Maskan',
    loanType: 'وام جعاله',
    interestRate: 18,
    maxTerm: 60,
    maxAmount: 500000000,
    description: 'وام تعمیرات و بازسازی مسکن',
    category: 'consumer',
  },
  // بانک ملی
  {
    id: 'melli-consumer',
    bankName: 'بانک ملی',
    bankNameEn: 'Melli',
    loanType: 'وام ضروری',
    interestRate: 18,
    maxTerm: 36,
    maxAmount: 300000000,
    description: 'وام نیازهای ضروری با تضمین حقوق',
    category: 'consumer',
  },
  {
    id: 'melli-gharz',
    bankName: 'بانک ملی',
    bankNameEn: 'Melli',
    loanType: 'قرض‌الحسنه',
    interestRate: 4,
    maxTerm: 60,
    maxAmount: 200000000,
    description: 'وام قرض‌الحسنه با کارمزد حداقلی',
    category: 'gharz',
  },
  // بانک ملت
  {
    id: 'mellat-consumer',
    bankName: 'بانک ملت',
    bankNameEn: 'Mellat',
    loanType: 'وام شخصی',
    interestRate: 23,
    maxTerm: 48,
    maxAmount: 500000000,
    description: 'وام شخصی با تضمین چک یا سفته',
    category: 'consumer',
  },
  {
    id: 'mellat-car',
    bankName: 'بانک ملت',
    bankNameEn: 'Mellat',
    loanType: 'وام خودرو',
    interestRate: 20,
    maxTerm: 60,
    maxAmount: 1000000000,
    description: 'وام خرید خودرو با وثیقه سند',
    category: 'car',
  },
  // بانک تجارت
  {
    id: 'tejarat-business',
    bankName: 'بانک تجارت',
    bankNameEn: 'Tejarat',
    loanType: 'وام کسب‌وکار',
    interestRate: 23,
    maxTerm: 60,
    maxAmount: 2000000000,
    description: 'وام سرمایه در گردش برای کسب‌وکارها',
    category: 'business',
  },
  {
    id: 'tejarat-consumer',
    bankName: 'بانک تجارت',
    bankNameEn: 'Tejarat',
    loanType: 'وام مصرفی',
    interestRate: 20,
    maxTerm: 36,
    maxAmount: 400000000,
    description: 'وام مصرفی عمومی',
    category: 'consumer',
  },
  // بانک صادرات
  {
    id: 'saderat-consumer',
    bankName: 'بانک صادرات',
    bankNameEn: 'Saderat',
    loanType: 'وام مصرفی',
    interestRate: 20,
    maxTerm: 48,
    maxAmount: 400000000,
    description: 'وام مصرفی با سپرده ضمانت',
    category: 'consumer',
  },
  {
    id: 'saderat-marriage',
    bankName: 'بانک صادرات',
    bankNameEn: 'Saderat',
    loanType: 'وام ازدواج',
    interestRate: 4,
    maxTerm: 60,
    maxAmount: 500000000,
    description: 'وام ازدواج با نرخ سود دولتی',
    category: 'marriage',
  },
  // بانک پاسارگاد
  {
    id: 'pasargad-consumer',
    bankName: 'بانک پاسارگاد',
    bankNameEn: 'Pasargad',
    loanType: 'وام شخصی',
    interestRate: 18,
    maxTerm: 48,
    maxAmount: 600000000,
    description: 'وام شخصی با شرایط ویژه',
    category: 'consumer',
  },
  {
    id: 'pasargad-investment',
    bankName: 'بانک پاسارگاد',
    bankNameEn: 'Pasargad',
    loanType: 'وام سرمایه‌گذاری',
    interestRate: 20,
    maxTerm: 84,
    maxAmount: 3000000000,
    description: 'وام سرمایه‌گذاری بلندمدت',
    category: 'business',
  },
  // بانک سامان
  {
    id: 'saman-consumer',
    bankName: 'بانک سامان',
    bankNameEn: 'Saman',
    loanType: 'وام سریع',
    interestRate: 23,
    maxTerm: 36,
    maxAmount: 300000000,
    description: 'وام فوری با تأیید سریع',
    category: 'consumer',
  },
  {
    id: 'saman-business',
    bankName: 'بانک سامان',
    bankNameEn: 'Saman',
    loanType: 'وام کسب‌وکار',
    interestRate: 25,
    maxTerm: 60,
    maxAmount: 1500000000,
    description: 'تسهیلات ویژه کسب‌وکار',
    category: 'business',
  },
  // بانک کشاورزی
  {
    id: 'keshavarzi-agricultural',
    bankName: 'بانک کشاورزی',
    bankNameEn: 'Keshavarzi',
    loanType: 'وام کشاورزی',
    interestRate: 10,
    maxTerm: 84,
    maxAmount: 2000000000,
    description: 'وام بخش کشاورزی با نرخ یارانه‌ای',
    category: 'agricultural',
  },
  {
    id: 'keshavarzi-housing',
    bankName: 'بانک کشاورزی',
    bankNameEn: 'Keshavarzi',
    loanType: 'وام مسکن روستایی',
    interestRate: 5,
    maxTerm: 180,
    maxAmount: 1000000000,
    description: 'وام مسکن ویژه روستاییان',
    category: 'housing',
  },
  // صندوق قرض‌الحسنه
  {
    id: 'gharz-mehr',
    bankName: 'بانک قرض‌الحسنه مهر',
    bankNameEn: 'Mehr',
    loanType: 'قرض‌الحسنه',
    interestRate: 2,
    maxTerm: 48,
    maxAmount: 150000000,
    description: 'وام قرض‌الحسنه با کارمزد ۲ درصد',
    category: 'gharz',
  },
  {
    id: 'gharz-resalat',
    bankName: 'بانک قرض‌الحسنه رسالت',
    bankNameEn: 'Resalat',
    loanType: 'قرض‌الحسنه ازدواج',
    interestRate: 4,
    maxTerm: 60,
    maxAmount: 500000000,
    description: 'وام ازدواج قرض‌الحسنه',
    category: 'marriage',
  },
];

export const loanCategories = [
  { id: 'all', name: 'همه', icon: '📋' },
  { id: 'housing', name: 'مسکن', icon: '🏠' },
  { id: 'consumer', name: 'مصرفی', icon: '🛒' },
  { id: 'car', name: 'خودرو', icon: '🚗' },
  { id: 'marriage', name: 'ازدواج', icon: '💍' },
  { id: 'gharz', name: 'قرض‌الحسنه', icon: '🤝' },
  { id: 'business', name: 'کسب‌وکار', icon: '💼' },
  { id: 'agricultural', name: 'کشاورزی', icon: '🌾' },
] as const;

export type LoanCategory = typeof loanCategories[number]['id'];

export const getBanksByCategory = (category: LoanCategory): BankLoanProduct[] => {
  if (category === 'all') return iranianBanks;
  return iranianBanks.filter(bank => bank.category === category);
};

export const getBankColor = (bankName: string): string => {
  const colors: Record<string, string> = {
    'بانک مسکن': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'بانک ملی': 'bg-green-500/10 text-green-600 border-green-500/20',
    'بانک ملت': 'bg-red-500/10 text-red-600 border-red-500/20',
    'بانک تجارت': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    'بانک صادرات': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    'بانک پاسارگاد': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    'بانک سامان': 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    'بانک کشاورزی': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    'بانک قرض‌الحسنه مهر': 'bg-teal-500/10 text-teal-600 border-teal-500/20',
    'بانک قرض‌الحسنه رسالت': 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  };
  return colors[bankName] || 'bg-secondary text-secondary-foreground';
};
