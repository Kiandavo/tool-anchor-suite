import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface BirthData {
  date: string;
  time: string;
  location: string;
  latitude?: number;
  longitude?: number;
}

export interface BirthChart {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planets: PlanetPosition[];
  interpretation: string;
  compatibility: string[];
  elements: ElementAnalysis;
}

interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
  aspect: string;
}

interface ElementAnalysis {
  fire: number;
  earth: number;
  air: number;
  water: number;
  dominant: string;
}

export const useBirthChart = () => {
  const [birthData, setBirthData] = useState<BirthData>({
    date: '',
    time: '',
    location: ''
  });
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('birthChart');
    if (saved) {
      try {
        const { birthData: savedData, chart: savedChart } = JSON.parse(saved);
        setBirthData(savedData);
        setChart(savedChart);
      } catch (error) {
        console.error('Error loading saved birth chart:', error);
      }
    }
  }, []);

  const handleBirthDataChange = (field: keyof BirthData, value: string) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  const generateChart = async () => {
    if (!birthData.date || !birthData.time || !birthData.location) {
      toast.error('لطفاً تمام اطلاعات را وارد کنید');
      return;
    }

    setIsLoading(true);
    setIsAnimating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newChart = generateBirthChart(birthData);
      setChart(newChart);
      
      // Save to session storage
      sessionStorage.setItem('birthChart', JSON.stringify({
        birthData,
        chart: newChart
      }));

      toast.success('نقشه تولد با موفقیت برآورد شد');
    } catch (error) {
      toast.error('خطا در برآورد نقشه تولد');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const copyChart = () => {
    if (!chart) return;
    
    const text = `🌟 نقشه آسمان تولد

📅 تاریخ: ${birthData.date}
🕐 زمان: ${birthData.time}
📍 مکان: ${birthData.location}

☀️ خورشید: ${chart.sunSign}
🌙 ماه: ${chart.moonSign}
⬆️ طالع: ${chart.ascendant}

${chart.interpretation}

🔗 ToolsLand.ir`;

    navigator.clipboard.writeText(text);
    toast.success('نقشه تولد کپی شد');
  };

  return {
    birthData,
    chart,
    isLoading,
    isAnimating,
    handleBirthDataChange,
    generateChart,
    copyChart
  };
};

const generateBirthChart = (birthData: BirthData): BirthChart => {
  // Convert birth date to zodiac signs and planetary positions
  const date = new Date(birthData.date + 'T' + birthData.time);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  
  const sunSign = getSunSign(month, day);
  const moonSign = getMoonSign(month, day, hour);
  const ascendant = getAscendant(month, day, hour);
  
  const planets = generatePlanetPositions(date);
  const elements = calculateElements(planets);
  
  const interpretation = generateInterpretation(sunSign, moonSign, ascendant, elements);
  const compatibility = getCompatibleSigns(sunSign);

  return {
    sunSign,
    moonSign,
    ascendant,
    planets,
    interpretation,
    compatibility,
    elements
  };
};

const getSunSign = (month: number, day: number): string => {
  const signs = [
    { name: 'جدی', start: [12, 22], end: [1, 19] },
    { name: 'دلو', start: [1, 20], end: [2, 18] },
    { name: 'حوت', start: [2, 19], end: [3, 20] },
    { name: 'حمل', start: [3, 21], end: [4, 19] },
    { name: 'ثور', start: [4, 20], end: [5, 20] },
    { name: 'جوزا', start: [5, 21], end: [6, 20] },
    { name: 'سرطان', start: [6, 21], end: [7, 22] },
    { name: 'اسد', start: [7, 23], end: [8, 22] },
    { name: 'سنبله', start: [8, 23], end: [9, 22] },
    { name: 'میزان', start: [9, 23], end: [10, 22] },
    { name: 'عقرب', start: [10, 23], end: [11, 21] },
    { name: 'قوس', start: [11, 22], end: [12, 21] }
  ];

  for (const sign of signs) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if ((month === startMonth && day >= startDay) || 
        (month === endMonth && day <= endDay)) {
      return sign.name;
    }
  }
  
  return 'جدی';
};

const getMoonSign = (month: number, day: number, hour: number): string => {
  // Simplified moon sign calculation
  const signs = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];
  const index = ((month * 30 + day + Math.floor(hour / 2)) * 13) % 12;
  return signs[Math.floor(index)];
};

const getAscendant = (month: number, day: number, hour: number): string => {
  // Simplified ascendant calculation
  const signs = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];
  const index = (hour * 2 + Math.floor(month / 2)) % 12;
  return signs[index];
};

const generatePlanetPositions = (date: Date): PlanetPosition[] => {
  const planets = ['مریخ', 'زهره', 'عطارد', 'مشتری', 'زحل', 'اورanus', 'نپتون'];
  const signs = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];
  const aspects = ['اتصال', 'تثلیث', 'تربیع', 'تضاد', 'شش ضلعی'];
  
  return planets.map((planet, index) => ({
    planet,
    sign: signs[(date.getMonth() + index * 2) % 12],
    degree: Math.floor(Math.random() * 30) + 1,
    house: (index % 12) + 1,
    aspect: aspects[index % aspects.length]
  }));
};

const calculateElements = (planets: PlanetPosition[]): ElementAnalysis => {
  const elementMap: Record<string, string> = {
    'حمل': 'fire', 'اسد': 'fire', 'قوس': 'fire',
    'ثور': 'earth', 'سنبله': 'earth', 'جدی': 'earth',
    'جوزا': 'air', 'میزان': 'air', 'دلو': 'air',
    'سرطان': 'water', 'عقرب': 'water', 'حوت': 'water'
  };
  
  const counts = { fire: 0, earth: 0, air: 0, water: 0 };
  
  planets.forEach(planet => {
    const element = elementMap[planet.sign];
    if (element) counts[element as keyof typeof counts]++;
  });
  
  const dominant = Object.entries(counts).reduce((a, b) => counts[a[0] as keyof typeof counts] > counts[b[0] as keyof typeof counts] ? a : b)[0];
  
  return { ...counts, dominant };
};

const generateInterpretation = (sun: string, moon: string, ascendant: string, elements: ElementAnalysis): string => {
  const interpretations = {
    'حمل': 'شخصیتی پرانرژی و رهبر طبیعی هستید. جسارت و شجاعت از ویژگی‌های بارز شماست.',
    'ثور': 'ثبات و استقامت از نقاط قوت شماست. عاشق زیبایی و آسایش هستید.',
    'جوزا': 'ذهنی چابک و کنجکاو دارید. در برقراری ارتباط استعداد فوق‌العاده‌ای دارید.',
    'سرطان': 'احساسات عمیق و غریزه مادری قوی دارید. خانواده برایتان بسیار مهم است.',
    'اسد': 'اعتماد به نفس بالا و کاریزمای طبیعی دارید. دوست دارید در مرکز توجه باشید.',
    'سنبله': 'دقیق و تحلیلگر هستید. کمال‌گرایی و خدمت به دیگران از ویژگی‌هایتان است.',
    'میزان': 'عدالت‌خواه و مهربان هستید. تعادل و هارمونی برایتان اهمیت زیادی دارد.',
    'عقرب': 'عمق احساسات و قدرت تحول شخصی از ویژگی‌های منحصربه‌فرد شماست.',
    'قوس': 'آزادی‌خواه و ماجراجو هستید. فلسفه و جستجوی حقیقت برایتان مهم است.',
    'جدی': 'هدفمند و مسئولیت‌پذیر هستید. موفقیت و احترام اجتماعی برایتان اهمیت دارد.',
    'دلو': 'مستقل و نوآور هستید. علاقه زیادی به پیشرفت بشریت دارید.',
    'حوت': 'حساس و خلاق هستید. عمق روحانی و همدلی از ویژگی‌های بارز شماست.'
  };
  
  const elementDescriptions = {
    fire: 'عنصر آتش در شما غالب است - پرانرژی، خلاق و پیشرو.',
    earth: 'عنصر خاک در شما غالب است - عملی، قابل اعتماد و با ثبات.',
    air: 'عنصر هوا در شما غالب است - فکور، اجتماعی و انطباق‌پذیر.',
    water: 'عنصر آب در شما غالب است - احساساتی، شهودی و همدل.'
  };
  
  return `☀️ خورشید در ${sun}: ${interpretations[sun] || 'شخصیت منحصربه‌فردی دارید.'}

🌙 ماه در ${moon}: احساسات درونی شما تحت تأثیر انرژی ${moon} است.

⬆️ طالع ${ascendant}: نحوه نمایش شما به دنیا از طریق ${ascendant} تعریف می‌شود.

🌟 تحلیل عناصر: ${elementDescriptions[elements.dominant as keyof typeof elementDescriptions]}

این ترکیب منحصربه‌فرد از انرژی‌های نجومی، شخصیت پیچیده و جذابی را در شما ایجاد کرده است.`;
};

const getCompatibleSigns = (sunSign: string): string[] => {
  const compatibility: Record<string, string[]> = {
    'حمل': ['اسد', 'قوس', 'جوزا', 'دلو'],
    'ثور': ['سنبله', 'جدی', 'سرطان', 'حوت'],
    'جوزا': ['میزان', 'دلو', 'حمل', 'اسد'],
    'سرطان': ['عقرب', 'حوت', 'ثور', 'سنبله'],
    'اسد': ['قوس', 'حمل', 'جوزا', 'میزان'],
    'سنبله': ['جدی', 'ثور', 'سرطان', 'عقرب'],
    'میزان': ['دلو', 'جوزا', 'اسد', 'قوس'],
    'عقرب': ['حوت', 'سرطان', 'سنبله', 'جدی'],
    'قوس': ['حمل', 'اسد', 'میزان', 'دلو'],
    'جدی': ['ثور', 'سنبله', 'عقرب', 'حوت'],
    'دلو': ['جوزا', 'میزان', 'قوس', 'حمل'],
    'حوت': ['سرطان', 'عقرب', 'جدی', 'ثور']
  };
  
  return compatibility[sunSign] || [];
};