import React, { useState } from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import RandomColorGenerator from '@/components/RandomColorGenerator';
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
import { Quote, List, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("در حافظه کپی شد");
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
                <Shuffle size={18} />
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
      ) : slug === 'random-picker' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="هر مورد را در یک خط جداگانه وارد کنید..."
              value={itemsList}
              onChange={(e) => setItemsList(e.target.value)}
              rows={5}
            />
            <Button onClick={handleRandomPick} className="flex items-center gap-2">
              <List size={18} />
              انتخاب تصادفی
            </Button>
            {selectedItem && (
              <div 
                className="p-4 bg-muted rounded-lg cursor-pointer"
                onClick={() => copyToClipboard(selectedItem)}
              >
                {selectedItem}
              </div>
            )}
          </CardContent>
        </Card>
      ) : slug === 'random-quote-generator' ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب دسته‌بندی (همه)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">همه دسته‌بندی‌ها</SelectItem>
                {quoteCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateQuote} className="flex items-center gap-2">
              <Quote size={18} />
              دریافت جمله قصار جدید
            </Button>
            {quote && (
              <div 
                className="p-4 bg-muted rounded-lg cursor-pointer text-lg text-center"
                onClick={() => copyToClipboard(quote)}
              >
                {quote}
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
