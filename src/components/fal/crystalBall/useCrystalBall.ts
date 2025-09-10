import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface CrystalVision {
  timeframe: string;
  category: string;
  prediction: string;
  symbols: string[];
  guidance: string;
  probability: string;
}

export const useCrystalBall = () => {
  const [question, setQuestion] = useState('');
  const [vision, setVision] = useState<CrystalVision | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showVision, setShowVision] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('crystalBallVision');
    if (saved) {
      try {
        const { question: savedQuestion, vision: savedVision } = JSON.parse(saved);
        setQuestion(savedQuestion);
        setVision(savedVision);
        setShowVision(!!savedVision);
      } catch (error) {
        console.error('Error loading crystal ball vision:', error);
      }
    }
  }, []);

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
  };

  const gazIntoFuture = async () => {
    if (!question.trim()) {
      toast.error('لطفاً سوال خود را بپرسید');
      return;
    }

    setIsLoading(true);
    setIsAnimating(true);

    try {
      // Simulate crystal ball gazing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newVision = generateCrystalVision(question);
      setVision(newVision);
      setShowVision(true);
      
      // Save to session storage
      sessionStorage.setItem('crystalBallVision', JSON.stringify({
        question,
        vision: newVision
      }));

      toast.success('گوی کریستال آینده را نشان داد');
    } catch (error) {
      toast.error('خطا در نگاه به گوی کریستال');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const copyVision = () => {
    if (!vision) return;
    
    const text = `🔮 پیش‌بینی گوی کریستالی

❓ سوال: ${question}

⏰ بازه زمانی: ${vision.timeframe}
📊 احتمال: ${vision.probability}

🔮 پیش‌بینی:
${vision.prediction}

🧭 راهنمایی:
${vision.guidance}

✨ نمادهای دیده شده: ${vision.symbols.join(' • ')}

🔗 ToolsLand.ir`;

    navigator.clipboard.writeText(text);
    toast.success('پیش‌بینی کپی شد');
  };

  const resetVision = () => {
    setQuestion('');
    setVision(null);
    setShowVision(false);
    sessionStorage.removeItem('crystalBallVision');
  };

  return {
    question,
    vision,
    isLoading,
    isAnimating,
    showVision,
    handleQuestionChange,
    gazIntoFuture,
    copyVision,
    resetVision
  };
};

const generateCrystalVision = (question: string): CrystalVision => {
  const questionLower = question.toLowerCase();
  
  // Categorize question
  let category = 'عمومی';
  let timeframe = 'آینده نزدیک';
  
  if (questionLower.includes('عشق') || questionLower.includes('ازدواج') || questionLower.includes('رابطه')) {
    category = 'عشق و روابط';
  } else if (questionLower.includes('کار') || questionLower.includes('شغل') || questionLower.includes('پول')) {
    category = 'کار و مال';
  } else if (questionLower.includes('سلامت') || questionLower.includes('بیماری')) {
    category = 'سلامت';
  } else if (questionLower.includes('سفر') || questionLower.includes('مسافرت')) {
    category = 'سفر و حرکت';
  }
  
  // Determine timeframe
  if (questionLower.includes('امسال') || questionLower.includes('سال')) {
    timeframe = 'یک سال آینده';
  } else if (questionLower.includes('ماه')) {
    timeframe = 'ماه آینده';
  } else if (questionLower.includes('هفته')) {
    timeframe = 'هفته آینده';
  }

  const visions = {
    'عشق و روابط': [
      'در آینده نزدیک، فرصت‌های جدیدی برای ملاقات با افراد مهم در زندگی شما پدیدار می‌شود. گوی کریستال نشان می‌دهد که احساسات عمیق‌تری در راه است.',
      'رابطه‌ای که اکنون در ذهن شماست، تحولات مثبتی خواهد داشت. صبر و درک متقابل کلید موفقیت خواهد بود.',
      'زمان مناسبی برای اظهار احساسات فرا رسیده است. گوی کریستال نشان می‌دهد که پاسخ مثبت در انتظار شماست.'
    ],
    'کار و مال': [
      'فرصت‌های شغلی جدیدی در راه است که می‌تواند وضعیت مالی شما را بهبود بخشد. به توانایی‌هایتان اعتماد کنید.',
      'سرمایه‌گذاری یا تصمیم مالی که در نظر دارید، نتایج مطلوبی خواهد داشت. اما هوشیاری لازم است.',
      'تغییرات مثبتی در محیط کار شما رخ خواهد داد. موقعیت بهتری در افق است.'
    ],
    'سلامت': [
      'انرژی مثبت جدیدی به بدن شما جاری خواهد شد. توجه بیشتر به تغذیه و ورزش پیشنهاد می‌شود.',
      'بهبودی و تعادل در راه است. گوی کریستال نشان می‌دهد که نگرانی‌های سلامتی برطرف خواهد شد.',
      'زمان مناسبی برای شروع رژیم سالم و تغییر سبک زندگی است.'
    ],
    'سفر و حرکت': [
      'سفری مهم در آینده نزدیک شما منتظر است که تجربه‌های ارزشمندی به همراه خواهد داشت.',
      'تغییر مکان یا حرکت به مقصد جدیدی که در نظر دارید، موفقیت‌آمیز خواهد بود.',
      'فرصت‌های جدیدی از طریق سفر یا ارتباط با افراد از مناطق دیگر پیش خواهد آمد.'
    ],
    'عمومی': [
      'تغییرات مثبت و غیرمنتظره‌ای در زندگی شما در راه است. آماده پذیرش فرصت‌های جدید باشید.',
      'انرژی کیهانی به نفع شما در حال تغییر است. زمان مناسبی برای شروع پروژه‌های جدید.',
      'راهی که پیش روی شماست، به موفقیت منجر خواهد شد. اعتماد به نفس خود را حفظ کنید.'
    ]
  };

  const guidances = {
    'عشق و روابط': [
      'قلب خود را باز نگه دارید و از ترس رها شوید.',
      'صداقت و صبر کلید موفقیت در روابط است.',
      'به احساسات درونی خود گوش دهید.'
    ],
    'کار و مال': [
      'تلاش مستمر و برنامه‌ریزی دقیق ضروری است.',
      'از فرصت‌های طلایی غافل نشوید.',
      'به توانایی‌های خود اعتماد کنید.'
    ],
    'سلامت': [
      'تعادل بین روح و جسم را رعایت کنید.',
      'از طبیعت و انرژی آن استفاده کنید.',
      'مراقبت از خود را در اولویت قرار دهید.'
    ],
    'سفر و حرکت': [
      'آماده تجربه‌های جدید باشید.',
      'برنامه‌ریزی دقیق اما انعطاف‌پذیری نیز مهم است.',
      'از تغییرات نترسید.'
    ],
    'عمومی': [
      'به جریان طبیعی زندگی اعتماد کنید.',
      'فرصت‌ها معمولاً در لباس چالش می‌آیند.',
      'انرژی مثبت منتشر کنید تا انرژی مثبت دریافت کنید.'
    ]
  };

  const symbols = [
    '⭐', '🌙', '🔮', '🌟', '✨', '🌊', '🔥', '🌸', '🦋', '🕊️',
    '🌈', '🔑', '📿', '🎭', '🎪', '🎨', '🏛️', '⚡', '🌺', '🍀'
  ];

  const probabilities = ['بالا', 'متوسط تا بالا', 'متوسط', 'قابل توجه'];

  const selectedVisions = visions[category as keyof typeof visions] || visions['عمومی'];
  const selectedGuidances = guidances[category as keyof typeof guidances] || guidances['عمومی'];
  
  const prediction = selectedVisions[Math.floor(Math.random() * selectedVisions.length)];
  const guidance = selectedGuidances[Math.floor(Math.random() * selectedGuidances.length)];
  const selectedSymbols = symbols.sort(() => 0.5 - Math.random()).slice(0, 4);
  const probability = probabilities[Math.floor(Math.random() * probabilities.length)];

  return {
    timeframe,
    category,
    prediction,
    symbols: selectedSymbols,
    guidance,
    probability
  };
};