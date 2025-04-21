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
import { List, "grid-2x2" as Grid2x2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

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
              <Calendar size={18} />
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
              <Dice size={18} />
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
