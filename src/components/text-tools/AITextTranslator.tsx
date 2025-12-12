import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Copy, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { code: 'fa', name: 'فارسی' },
  { code: 'en', name: 'انگلیسی' },
  { code: 'ar', name: 'عربی' },
  { code: 'fr', name: 'فرانسوی' },
  { code: 'de', name: 'آلمانی' },
  { code: 'es', name: 'اسپانیایی' },
  { code: 'tr', name: 'ترکی' },
  { code: 'ru', name: 'روسی' },
  { code: 'zh', name: 'چینی' },
  { code: 'ja', name: 'ژاپنی' },
  { code: 'ko', name: 'کره‌ای' },
];

export function AITextTranslator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('fa');
  const [targetLang, setTargetLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'متن خالی است',
        description: 'لطفاً متنی برای ترجمه وارد کنید',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setOutputText('');

    try {
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: {
          text: inputText,
          sourceLang,
          targetLang,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setOutputText(data.translatedText);
      toast({
        title: 'ترجمه انجام شد',
        description: 'متن با موفقیت ترجمه شد',
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: 'خطا در ترجمه',
        description: 'مشکلی در ترجمه متن رخ داد. لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'کپی شد',
      description: 'متن ترجمه شده در کلیپ‌بورد کپی شد',
    });
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <div className="flex items-center gap-3 justify-center flex-wrap">
        <Select value={sourceLang} onValueChange={setSourceLang}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={handleSwapLanguages}
          className="shrink-0"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>

        <Select value={targetLang} onValueChange={setTargetLang}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Input/Output Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            متن اصلی
          </label>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="متن خود را اینجا وارد کنید..."
            className="min-h-[200px] resize-none"
            dir="auto"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{inputText.length} کاراکتر</span>
            {inputText && (
              <button
                onClick={handleClear}
                className="text-destructive hover:underline"
              >
                پاک کردن
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            ترجمه
          </label>
          <div className="relative">
            <Textarea
              value={outputText}
              readOnly
              placeholder={isLoading ? 'در حال ترجمه...' : 'ترجمه اینجا نمایش داده می‌شود'}
              className="min-h-[200px] resize-none bg-muted/50"
              dir="auto"
            />
            {outputText && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="absolute top-2 left-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {outputText.length} کاراکتر
          </div>
        </div>
      </div>

      {/* Translate Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleTranslate}
          disabled={isLoading || !inputText.trim()}
          size="lg"
          className="min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              در حال ترجمه...
            </>
          ) : (
            'ترجمه کن'
          )}
        </Button>
      </div>

      {/* Examples */}
      <div className="border-t pt-4">
        <p className="text-sm text-muted-foreground mb-3">نمونه‌های آماده:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'سلام، حال شما چطور است؟',
            'امروز هوا خیلی خوب است.',
            'من عاشق یادگیری زبان‌های جدید هستم.',
          ].map((example) => (
            <button
              key={example}
              onClick={() => setInputText(example)}
              className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
