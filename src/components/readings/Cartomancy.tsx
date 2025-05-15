
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Layers, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

// Define playing card data
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Meanings for cards
const CARD_MEANINGS: Record<string, Record<string, string>> = {
  'hearts': {
    'A': 'عشق جدید یا آغاز روابط عاطفی',
    '2': 'هماهنگی و تعادل در روابط',
    '3': 'شادی و خوشحالی در میان دوستان',
    '4': 'ناپایداری در روابط عاطفی',
    '5': 'احساسات مبهم و تصمیمات سخت',
    '6': 'خوش‌شانسی در روابط و عاطفه',
    '7': 'خیال‌پردازی بیش از حد',
    '8': 'عشق و دلتنگی برای یک رابطه',
    '9': 'آرزوهای عاطفی که برآورده می‌شوند',
    '10': 'خوشبختی و تکمیل در خانواده',
    'J': 'فردی مهربان و عاطفی در زندگی شما',
    'Q': 'زنی با محبت و درک بالا در اطراف شما',
    'K': 'مردی با قلبی بزرگ که می‌تواند مشاور شما باشد'
  },
  'diamonds': {
    'A': 'خبر خوب در مورد مسائل مالی',
    '2': 'تصمیم مالی مهم',
    '3': 'موفقیت در کار گروهی و همکاری',
    '4': 'امنیت مالی و ثبات',
    '5': 'تغییرات مثبت در وضعیت مالی',
    '6': 'هدیه یا کمک از سوی دیگران',
    '7': 'کار سخت و تلاش برای پیشرفت',
    '8': 'خلاقیت و فرصت‌های جدید کاری',
    '9': 'موفقیت مالی و حرفه‌ای',
    '10': 'ثروت و رفاه در آینده نزدیک',
    'J': 'فردی پرانرژی با ایده‌های نو',
    'Q': 'زنی موفق با ذهنی خلاق',
    'K': 'مردی موفق و متمول در ارتباط با شما'
  },
  'clubs': {
    'A': 'شروع موفق در یک پروژه یا کار جدید',
    '2': 'موانع موقتی در راه پیشرفت',
    '3': 'موفقیت از طریق تلاش مشترک',
    '4': 'دستاوردهای پایدار و ثبات',
    '5': 'بحث و چالش‌های جزئی',
    '6': 'پیشرفت و موفقیت در کار',
    '7': 'غلبه بر مشکلات با پشتکار',
    '8': 'کار سخت که نتیجه مثبت خواهد داشت',
    '9': 'موفقیت بزرگ پس از تلاش فراوان',
    '10': 'ثروت و موفقیت در کسب و کار',
    'J': 'دوستی قابل اعتماد و وفادار',
    'Q': 'زنی با هوش و موفق در کسب و کار',
    'K': 'مردی بانفوذ که می‌تواند به شما کمک کند'
  },
  'spades': {
    'A': 'پایان یک مرحله و آغاز دوره‌ای جدید',
    '2': 'تصمیمی دشوار و سرنوشت‌ساز',
    '3': 'جدایی یا پایان یک ارتباط',
    '4': 'استراحت و تجدید قوا',
    '5': 'نگرانی و اضطراب موقتی',
    '6': 'بهبود تدریجی پس از دوره‌ای سخت',
    '7': 'چالش و آزمون مهم',
    '8': 'محدودیت‌ها و موانع موقتی',
    '9': 'ترس‌ها و نگرانی‌های عمیق',
    '10': 'پایان یک دوره همراه با درس‌های مهم',
    'J': 'فردی با افکار عمیق و شاید منفی در اطراف شما',
    'Q': 'زنی با بینش عمیق که می‌تواند مشاور خوبی باشد',
    'K': 'مردی جدی که ممکن است چالش‌هایی ایجاد کند'
  }
};

// Card appearance
const SUIT_SYMBOLS: Record<string, { symbol: string, color: string }> = {
  'hearts': { symbol: '♥', color: 'text-red-500' },
  'diamonds': { symbol: '♦', color: 'text-red-500' },
  'clubs': { symbol: '♣', color: 'text-gray-800' },
  'spades': { symbol: '♠', color: 'text-gray-800' }
};

// Reading type definitions
const READING_TYPES = [
  { id: 'single', name: 'تک کارت', description: 'یک کارت برای پاسخ به یک سوال مشخص', count: 1 },
  { id: 'past-present-future', name: 'گذشته، حال، آینده', description: 'سه کارت برای نشان دادن مسیر', count: 3 },
  { id: 'cross', name: 'چهارراه', description: 'چهار کارت برای نشان دادن عوامل مؤثر', count: 4 }
];

export const Cartomancy: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Array<{suit: string, value: string}>>([]);
  const [readingType, setReadingType] = useState(READING_TYPES[0]);
  const [question, setQuestion] = useState('');
  const [interpretation, setInterpretation] = useState('');

  const shuffleDeck = () => {
    const deck = [];
    for (const suit of SUITS) {
      for (const value of VALUES) {
        deck.push({ suit, value });
      }
    }
    
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    
    return deck;
  };

  const drawCards = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const shuffled = shuffleDeck();
      const drawn = shuffled.slice(0, readingType.count);
      setSelectedCards(drawn);
      
      // Generate interpretation
      const cardInterpretation = generateInterpretation(drawn, readingType.id);
      setInterpretation(cardInterpretation);
      
      setIsLoading(false);
      setIsRevealed(true);
      toast.success("فال با کارت‌های معمولی انجام شد!");
    }, 1500);
  };
  
  const generateInterpretation = (cards: Array<{suit: string, value: string}>, type: string) => {
    let result = '';
    
    switch (type) {
      case 'single':
        const card = cards[0];
        const meaning = CARD_MEANINGS[card.suit][card.value];
        result = `کارت ${card.value} ${persianSuit(card.suit)} نشان می‌دهد: ${meaning}. ${getGeneralAdvice()}`;
        break;
        
      case 'past-present-future':
        const past = CARD_MEANINGS[cards[0].suit][cards[0].value];
        const present = CARD_MEANINGS[cards[1].suit][cards[1].value];
        const future = CARD_MEANINGS[cards[2].suit][cards[2].value];
        
        result = `گذشته (${cards[0].value} ${persianSuit(cards[0].suit)}): ${past}\n\n` +
                `حال (${cards[1].value} ${persianSuit(cards[1].suit)}): ${present}\n\n` +
                `آینده (${cards[2].value} ${persianSuit(cards[2].suit)}): ${future}`;
        break;
        
      case 'cross':
        const above = CARD_MEANINGS[cards[0].suit][cards[0].value];
        const below = CARD_MEANINGS[cards[1].suit][cards[1].value];
        const left = CARD_MEANINGS[cards[2].suit][cards[2].value];
        const right = CARD_MEANINGS[cards[3].suit][cards[3].value];
        
        result = `کارت بالا (تأثیرات آشکار) - ${cards[0].value} ${persianSuit(cards[0].suit)}: ${above}\n\n` +
                `کارت پایین (تأثیرات پنهان) - ${cards[1].value} ${persianSuit(cards[1].suit)}: ${below}\n\n` +
                `کارت چپ (گذشته اخیر) - ${cards[2].value} ${persianSuit(cards[2].suit)}: ${left}\n\n` +
                `کارت راست (آینده نزدیک) - ${cards[3].value} ${persianSuit(cards[3].suit)}: ${right}`;
        break;
    }
    
    if (question) {
      return `در پاسخ به سوال: "${question}"\n\n${result}`;
    }
    
    return result;
  };
  
  const persianSuit = (suit: string) => {
    const translations: Record<string, string> = {
      'hearts': 'دل',
      'diamonds': 'خشت',
      'clubs': 'گشنیز',
      'spades': 'پیک'
    };
    
    return translations[suit] || suit;
  };
  
  const getGeneralAdvice = () => {
    const advices = [
      "توصیه می‌شود که به ندای درون خود گوش فرا دهید و با اعتماد به نفس عمل کنید.",
      "توجه داشته باشید که گاهی لازم است کمی صبر کنید تا مسیر روشن‌تر شود.",
      "این پیام یادآور می‌شود که گاهی باید از منطقه امن خود خارج شوید.",
      "به خاطر داشته باشید که هر چالشی یک فرصت برای رشد است."
    ];
    
    return advices[Math.floor(Math.random() * advices.length)];
  };
  
  const copyReading = () => {
    if (interpretation) {
      copyToClipboard(interpretation);
      toast.success("متن فال کپی شد!");
    }
  };
  
  const resetReading = () => {
    setIsRevealed(false);
    setSelectedCards([]);
    setInterpretation('');
  };
  
  const PlayingCard: React.FC<{card: {suit: string, value: string}, position: number, total: number}> = ({ card, position, total }) => {
    const suitInfo = SUIT_SYMBOLS[card.suit];
    
    // Calculate layout positions based on reading type
    let positionStyle = {};
    if (total === 3) { // past-present-future
      positionStyle = {
        transform: `translateX(${(position - 1) * 110 - 110}%)`,
      };
    } else if (total === 4) { // cross
      if (position === 0) positionStyle = { top: '-50px' }; // top
      if (position === 1) positionStyle = { top: '50px' }; // bottom
      if (position === 2) positionStyle = { left: '-50px' }; // left
      if (position === 3) positionStyle = { left: '50px' }; // right
    }
    
    return (
      <motion.div 
        className="relative w-20 h-32 bg-white rounded-md border border-gray-300 shadow-md flex flex-col items-center justify-between p-2"
        style={positionStyle}
        initial={{ opacity: 0, y: 20, rotateY: 180 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ delay: position * 0.2, duration: 0.5 }}
      >
        <div className="absolute top-1 left-1 text-sm font-bold flex flex-col items-center">
          <span>{card.value}</span>
          <span className={suitInfo.color}>{suitInfo.symbol}</span>
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
          <span className={suitInfo.color}>{suitInfo.symbol}</span>
        </div>
        
        <div className="absolute bottom-1 right-1 text-sm font-bold flex flex-col items-center rotate-180">
          <span>{card.value}</span>
          <span className={suitInfo.color}>{suitInfo.symbol}</span>
        </div>
      </motion.div>
    );
  };
  
  return (
    <Card className="bg-gradient-to-b from-[#f1f7ff] to-[#e2f0ff] border-[#a8c7f0] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#a8c7f0] to-[#7ba7ea] text-center pb-2 py-2 relative border-b border-[#a8c7f0]">
        <h2 className="text-sm font-bold text-white flex items-center justify-center">
          <Layers className="mr-2" size={16} />
          فال ورق (کارتومنسی)
        </h2>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#a8c7f0]/30 text-center">
                <p className="text-sm text-[#3b5998]">
                  فال ورق یا کارتومنسی، روشی باستانی برای پیشگویی با استفاده از کارت‌های معمولی است. هر کارت معنای خاصی دارد و ترکیب آن‌ها می‌تواند پیام‌های مختلفی داشته باشد.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#a8c7f0]/20">
                  <label className="block text-[#3b5998] text-xs mb-1.5 font-medium">نوع خوانش:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {READING_TYPES.map(type => (
                      <Button
                        key={type.id}
                        variant={readingType.id === type.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReadingType(type)}
                        className={`text-[10px] h-auto py-2 ${readingType.id === type.id ? 
                          "bg-[#7ba7ea] hover:bg-[#6b97da] text-white" : 
                          "border-[#a8c7f0] text-[#3b5998]"}`}
                      >
                        {type.name}
                      </Button>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-[#3b5998]/80">{readingType.description}</p>
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-[#a8c7f0]/20">
                  <label className="block text-[#3b5998] text-xs mb-1.5 font-medium">سوال شما (اختیاری):</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full text-xs p-2 border border-[#a8c7f0]/30 rounded-md focus:ring-1 focus:ring-[#7ba7ea] focus:outline-none"
                    placeholder="سوال خود را اینجا بنویسید..."
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="flex justify-center py-2">
                <div className="relative w-20 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b5998] to-[#8b9dc3] rounded-md shadow-md border border-[#dfe3ee]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-opacity-20 text-3xl font-bold">?</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex justify-center items-center h-44">
                {selectedCards.map((card, index) => (
                  <PlayingCard 
                    key={index} 
                    card={card} 
                    position={index}
                    total={selectedCards.length}
                  />
                ))}
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#a8c7f0]/30 shadow-sm mt-2">
                <h3 className="text-sm font-medium text-[#3b5998] mb-2">تفسیر کارت‌ها:</h3>
                <p className="text-sm text-[#3b5998]/90 whitespace-pre-line">{interpretation}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#a8c7f0]/20">
        {!isRevealed ? (
          <Button
            onClick={drawCards}
            disabled={isLoading}
            className="bg-[#7ba7ea] hover:bg-[#6b97da] text-white text-xs h-9 px-4 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isLoading ? 
              <RefreshCw className="animate-spin mr-1" size={14} /> : 
              <Sparkles className="mr-1" size={14} />
            }
            کشیدن کارت‌ها
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#7ba7ea] text-[#3b5998] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              فال جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#7ba7ea] text-[#3b5998] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی تفسیر
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Cartomancy;
