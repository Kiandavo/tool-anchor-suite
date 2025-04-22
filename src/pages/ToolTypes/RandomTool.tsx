import React, { useState } from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import RandomColorGenerator from '@/components/RandomColorGenerator';
import CoinFlip from '@/components/CoinFlip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateRandomString, pickRandomFromList, getRandomQuote, quoteCategories } from '@/utils/textUtils';
import { generateRandomDate, generateRandomEmoji, rollDice, generateRandomWord, copyToClipboard } from '@/utils/randomUtils';
import { Grid2x2, CalendarDays, Dice5 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
// Removing the incorrect Dice import

interface RandomToolProps {
  slug: string;
}

export default function RandomTool({ slug }: RandomToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);
  const [stringLength, setStringLength] = useState<number>(10);
  const [randomString, setRandomString] = useState<string>('');
  const [itemsList, setItemsList] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [randomDate, setRandomDate] = useState<Date | null>(null);
  const [emoji, setEmoji] = useState<string>('');
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [randomWord, setRandomWord] = useState<string>('');

  const handleGenerateString = () => {
    const newString = generateRandomString(stringLength);
    setRandomString(newString);
    toast.success("رشته تصادفی تولید شد");
  };

  const handleRandomPick = () => {
    const items = itemsList.split('\n').filter(item => item.trim() !== '');
    if (items.length === 0) {
      toast.error("لطفاً حداقل یک مورد را وارد کنید");
      return;
    }
    const picked = pickRandomFromList(items);
    setSelectedItem(picked);
    toast.success("یک مورد به صورت تصادفی انتخاب شد");
  };

  const handleGenerateQuote = () => {
    const newQuote = getRandomQuote(selectedCategory);
    setQuote(newQuote);
    toast.success("جمله قصار جدید تولید شد");
  };

  const handleGenerateDate = () => {
    const start = new Date(1970, 0, 1);
    const end = new Date();
    const newDate = generateRandomDate(start, end);
    setRandomDate(newDate);
    toast.success("تاریخ تصادفی تولید شد");
  };

  const handleGenerateEmoji = () => {
    const newEmoji = generateRandomEmoji();
    setEmoji(newEmoji);
    toast.success("ایموجی تصادفی تولید شد");
  };

  const handleRollDice = () => {
    const result = rollDice();
    setDiceResult(result);
    toast.success(`تاس انداخته شد: ${result}`);
  };

  const handleGenerateWord = () => {
    const word = generateRandomWord();
    setRandomWord(word);
    toast.success("کلمه تصادفی تولید شد");
  };

  // New state for additional tools
  const [array, setArray] = useState<string>('');
  const [shuffledArray, setShuffledArray] = useState<string[]>([]);
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);
  const [teamMembers, setTeamMembers] = useState<string>('');
  const [teams, setTeams] = useState<string[][]>([]);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [giftSuggestion, setGiftSuggestion] = useState<string>('');

  // Function to shuffle array
  const handleArrayShuffle = () => {
    const items = array.split('\n').filter(item => item.trim() !== '');
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledArray(shuffled);
    toast.success("آرایه با موفقیت مرتب شد");
  };

  // Function to generate lottery numbers
  const generateLotteryNumbers = () => {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    setLotteryNumbers(Array.from(numbers));
    toast.success("اعداد لاتاری تولید شدند");
  };

  // Function to generate random teams
  const generateRandomTeams = () => {
    const members = teamMembers.split('\n').filter(member => member.trim() !== '');
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    const numTeams = Math.min(Math.ceil(members.length / 4), Math.floor(members.length / 2));
    const result: string[][] = Array(numTeams).fill([]).map(() => []);
    
    shuffled.forEach((member, index) => {
      result[index % numTeams].push(member);
    });
    
    setTeams(result);
    toast.success("تیم‌ها با موفقیت ایجاد شدند");
  };

  // Function to pick a random card
  const pickRandomCard = () => {
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    setSelectedCard(`${randomValue}${randomSuit}`);
    toast.success("یک کارت انتخاب شد");
  };

  // Function to suggest a random gift
  const suggestRandomGift = () => {
    const gifts = [
      "کتاب",
      "ساعت هوشمند",
      "هدفون بی‌سیم",
      "عطر",
      "کیف چرم",
      "ست لوازم نوشت‌افزار",
      "گیاه آپارتمانی",
      "ماگ سرامیکی",
      "کارت هدیه",
      "آلبوم موسیقی"
    ];
    setGiftSuggestion(gifts[Math.floor(Math.random() * gifts.length)]);
    toast.success("یک هدیه پیشنهاد شد");
  };

  if (!toolMeta) return null;

  return (
    <div className="space-y-6">
      <ToolInfoCard
        name={toolMeta.name}
        description={toolMeta.description}
        learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
      />
      
      {slug === 'random-color-generator' ? (
        <RandomColorGenerator />
      ) : slug === 'random-string' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="1"
                max="100"
                value={stringLength}
                onChange={(e) => setStringLength(Number(e.target.value))}
                className="w-32"
              />
              <Button onClick={handleGenerateString} className="flex items-center gap-2">
                <Grid2x2 size={18} />
                تولید رشته تصادفی
              </Button>
            </div>
            {randomString && (
              <div 
                className="p-4 bg-muted rounded-lg cursor-pointer font-mono"
                onClick={() => copyToClipboard(randomString)}
              >
                {randomString}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-date' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button onClick={handleGenerateDate} className="flex items-center gap-2">
              <CalendarDays size={18} />
              تولید تاریخ تصادفی
            </Button>
            {randomDate && (
              <div 
                className="p-4 bg-muted rounded-lg cursor-pointer text-center"
                onClick={() => copyToClipboard(format(randomDate, 'yyyy/MM/dd'))}
              >
                {format(randomDate, 'yyyy/MM/dd')}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-emoji-generator' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button onClick={handleGenerateEmoji} className="flex items-center gap-2">
              <Grid2x2 size={18} />
              تولید ایموجی تصادفی
            </Button>
            {emoji && (
              <div 
                className="p-4 bg-muted rounded-lg cursor-pointer text-center text-4xl"
                onClick={() => copyToClipboard(emoji)}
              >
                {emoji}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'dice-roller' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button onClick={handleRollDice} className="flex items-center gap-2">
              <Dice5 size={18} />
              پرتاب تاس
            </Button>
            {diceResult && (
              <div 
                className="p-4 bg-muted rounded-lg cursor-pointer text-center text-4xl"
                onClick={() => copyToClipboard(diceResult.toString())}
              >
                {diceResult}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-word-generator' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button onClick={handleGenerateWord} className="flex items-center gap-2">
              <Grid2x2 size={18} />
              تولید کلمه تصادفی
            </Button>
            {randomWord && (
              <div 
                className="p-4 bg-muted rounded-lg cursor-pointer text-center text-xl"
                onClick={() => copyToClipboard(randomWord)}
              >
                {randomWord}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'coin-flip' ? (
        <Card>
          <CardContent className="p-6">
            <CoinFlip />
          </CardContent>
        </Card>
      ) : slug === 'random-array-shuffler' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="هر آیتم را در یک خط جدید وارد کنید"
              value={array}
              onChange={(e) => setArray(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleArrayShuffle} className="w-full">مرتب‌سازی تصادفی</Button>
            {shuffledArray.length > 0 && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                {shuffledArray.map((item, index) => (
                  <div key={index} className="p-2 bg-background rounded">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-lottery-numbers' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button onClick={generateLotteryNumbers} className="w-full">تولید اعداد لاتاری</Button>
            {lotteryNumbers.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {lotteryNumbers.map((num, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg text-center text-2xl font-bold">
                    {num}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-team-generator' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="نام هر نفر را در یک خط جدید وارد کنید"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={generateRandomTeams} className="w-full">تولید تیم‌ها</Button>
            {teams.length > 0 && (
              <div className="space-y-4">
                {teams.map((team, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <h3 className="font-bold mb-2">تیم {index + 1}</h3>
                    <div className="space-y-1">
                      {team.map((member, memberIndex) => (
                        <div key={memberIndex} className="p-2 bg-background rounded">
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-card-picker' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button onClick={pickRandomCard} className="w-full">انتخاب کارت</Button>
            {selectedCard && (
              <div className="p-8 bg-muted rounded-lg text-center">
                <span className="text-6xl">{selectedCard}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-gift-picker' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button onClick={suggestRandomGift} className="w-full">پیشنهاد هدیه</Button>
            {giftSuggestion && (
              <div className="p-4 bg-muted rounded-lg text-center text-xl">
                {giftSuggestion}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
            <p className="text-muted-foreground">
              این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
