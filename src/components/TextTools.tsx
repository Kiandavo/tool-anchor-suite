
import React, { useState, useEffect } from 'react';
import {
  finglishToPersian, countCharacters, countWords, countSentences,
  countParagraphs, calculateReadingTime, reverseText, removeDuplicateLines,
  sortLines, trimLines, removeEmptyLines, removeEmojis, toUpperCase,
  toLowerCase, toTitleCase, generateSlug
} from "@/utils/toolUtils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TextToolsProps {
  slug: string;
}

export default function TextTools({ slug }: TextToolsProps) {
  const { toast } = useToast();
  const [finglishInput, setFinglishInput] = useState("");
  const [persianOutput, setPersianOutput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [textStats, setTextStats] = useState({
    characters: 0, charactersNoSpaces: 0, words: 0, sentences: 0, paragraphs: 0, readingTimeMinutes: 0
  });
  const [textToolInput, setTextToolInput] = useState("");
  const [textToolOutput, setTextToolOutput] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (slug === 'text-counter') {
      setTextStats({
        characters: countCharacters(textInput),
        charactersNoSpaces: countCharacters(textInput.replace(/\s+/g, '')),
        words: countWords(textInput),
        sentences: countSentences(textInput),
        paragraphs: countParagraphs(textInput),
        readingTimeMinutes: calculateReadingTime(textInput)
      });
    }
  }, [textInput, slug]);

  const handleConvertFinglish = () => {
    setPersianOutput(finglishToPersian(finglishInput));
  };

  const handleCopyFarsi = () => {
    if (persianOutput) {
      navigator.clipboard.writeText(persianOutput);
      toast({
        title: "کپی شد!",
        description: "متن فارسی در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
    }
  };

  const handleTextToolProcess = () => {
    let result = "";
    switch (slug) {
      case 'text-reverse':
        result = reverseText(textToolInput);
        break;
      case 'remove-duplicate-lines':
        result = removeDuplicateLines(textToolInput);
        break;
      case 'text-sorter':
        result = sortLines(textToolInput, sortOrder === "asc");
        break;
      case 'text-trimmer':
        result = trimLines(textToolInput);
        break;
      case 'remove-empty-lines':
        result = removeEmptyLines(textToolInput);
        break;
      case 'emoji-remover':
        result = removeEmojis(textToolInput);
        break;
      case 'slug-generator':
        result = generateSlug(textToolInput);
        break;
      case 'text-uppercasing':
        result = toUpperCase(textToolInput);
        break;
      case 'text-lowercasing':
        result = toLowerCase(textToolInput);
        break;
      case 'text-titlecase':
        result = toTitleCase(textToolInput);
        break;
    }
    setTextToolOutput(result);
  };

  // UI rendering per tool
  if (slug === 'latin-to-persian-convertor') {
    return (
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="مثال: salam doste man"
          value={finglishInput}
          onChange={e => setFinglishInput(e.target.value)}
        />
        <Button type="button" onClick={handleConvertFinglish}>تبدیل</Button>
        <Textarea
          placeholder="متن فارسی معادل"
          value={persianOutput}
          readOnly
        />
        <Button type="button" variant="outline" onClick={handleCopyFarsi}>کپی متن فارسی</Button>
      </div>
    );
  }
  if (slug === 'text-counter') {
    return (
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="متن خود را وارد کنید..."
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
        />
        <div className="rounded bg-muted-foreground/5 p-3 text-xs grid grid-cols-2 md:grid-cols-6 gap-2">
          <div>حروف: <b>{textStats.characters}</b></div>
          <div>بدون فاصله: <b>{textStats.charactersNoSpaces}</b></div>
          <div>کلمات: <b>{textStats.words}</b></div>
          <div>جملات: <b>{textStats.sentences}</b></div>
          <div>پاراگراف: <b>{textStats.paragraphs}</b></div>
          <div>دقیقه مطالعه: <b>{textStats.readingTimeMinutes}</b></div>
        </div>
      </div>
    );
  }
  // Generic text tool UI (reverse, sorter, etc.)
  return (
    <div dir="rtl" className="flex flex-col items-stretch gap-4">
      <Label htmlFor="textTool">متن ورودی</Label>
      <Textarea
        id="textTool"
        placeholder="متن خود را وارد کنید..."
        value={textToolInput}
        onChange={e => setTextToolInput(e.target.value)}
        rows={7}
      />
      {slug === "text-sorter" && (
        <RadioGroup
          value={sortOrder}
          onValueChange={val => setSortOrder(val as "asc" | "desc")}
          className="flex gap-4"
        >
          <Label>مرتب سازی:</Label>
          <RadioGroupItem value="asc">صعودی</RadioGroupItem>
          <RadioGroupItem value="desc">نزولی</RadioGroupItem>
        </RadioGroup>
      )}
      <Button type="button" onClick={handleTextToolProcess}>اجرا</Button>
      <Label>خروجی:</Label>
      <Textarea value={textToolOutput} readOnly rows={7} />
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          if (textToolOutput) {
            navigator.clipboard.writeText(textToolOutput);
            toast({
              title: "کپی شد!", description: "نتیجه در کلیپ‌بورد کپی شد.", duration: 2000,
            });
          }
        }}>
        کپی خروجی
      </Button>
    </div>
  );
}
