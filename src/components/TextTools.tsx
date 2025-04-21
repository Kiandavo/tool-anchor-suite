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
import { ToolInfoCard } from "./ToolInfoCard";
import { OutcomeInfoCard } from "./OutcomeInfoCard";
import { tools } from "@/data/tools";

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

  // Show tool info card from the tools data (contextual help)
  const toolMeta = tools.find((t) => t.slug === slug);
  // Store outcome/info message for user after a process
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

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
    setOutcomeMsg("تبدیل با موفقیت انجام شد! متن فینگلیش به فارسی تبدیل شد.");
  };

  const handleCopyFarsi = () => {
    if (persianOutput) {
      navigator.clipboard.writeText(persianOutput);
      toast({
        title: "کپی شد!",
        description: "متن فارسی در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
      setOutcomeMsg("خروجی با موفقیت کپی شد.");
    }
  };

  const handleTextToolProcess = () => {
    let result = "";
    switch (slug) {
      case 'text-reverse':
        result = reverseText(textToolInput);
        setOutcomeMsg("متن با موفقیت وارونه شد.");
        break;
      case 'remove-duplicate-lines':
        result = removeDuplicateLines(textToolInput);
        setOutcomeMsg("تمام خطوط تکراری حذف شدند.");
        break;
      case 'text-sorter':
        result = sortLines(textToolInput, sortOrder === "asc");
        setOutcomeMsg(sortOrder === "asc" ? "خطوط به صورت صعودی مرتب شدند." : "خطوط به صورت نزولی مرتب شدند.");
        break;
      case 'text-trimmer':
        result = trimLines(textToolInput);
        setOutcomeMsg("فاصله‌های ابتدا و انتهای خطوط حذف شد.");
        break;
      case 'remove-empty-lines':
        result = removeEmptyLines(textToolInput);
        setOutcomeMsg("خطوط خالی از متن حذف شدند.");
        break;
      case 'emoji-remover':
        result = removeEmojis(textToolInput);
        setOutcomeMsg("تمام ایموجی‌ها از متن حذف شدند.");
        break;
      case 'slug-generator':
        result = generateSlug(textToolInput);
        setOutcomeMsg("اسلاگ مناسب برای متن شما تولید شد.");
        break;
      case 'text-uppercasing':
        result = toUpperCase(textToolInput);
        setOutcomeMsg("تمام متن به حروف بزرگ تبدیل شد.");
        break;
      case 'text-lowercasing':
        result = toLowerCase(textToolInput);
        setOutcomeMsg("تمام متن به حروف کوچک تبدیل شد.");
        break;
      case 'text-titlecase':
        result = toTitleCase(textToolInput);
        setOutcomeMsg("حرف اول هر کلمه بزرگ شد.");
        break;
      default:
        setOutcomeMsg(null);
    }
    setTextToolOutput(result);
  };

  // UI rendering per tool
  return (
    <div>
      {toolMeta && (
        <ToolInfoCard
          name={toolMeta.name}
          description={toolMeta.description}
          learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
        />
      )}
      {slug === 'latin-to-persian-convertor' ? (
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
          {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
        </div>
      ) : slug === 'text-counter' ? (
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
      ) : (
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
                setOutcomeMsg("خروجی پس از اجرا با موفقیت کپی شد.");
              }
            }}>
            کپی خروجی
          </Button>
          {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
        </div>
      )}
    </div>
  );
}
