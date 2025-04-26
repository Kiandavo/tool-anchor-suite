
import React, { useState, useEffect } from 'react';
import {
  finglishToPersian, countCharacters, countWords, countSentences,
  countParagraphs, calculateReadingTime, reverseText, removeDuplicateLines,
  sortLines, trimLines, removeEmptyLines, removeEmojis, toUpperCase,
  toLowerCase, toTitleCase, generateSlug, correctHalfSpaces,
  persianKeyboardConverter, englishToPersianNumbers, persianToEnglishNumbers,
  standardizePersianText, removeHtmlTags, removeAccents
} from "@/utils/toolUtils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ToolInfoCard } from "./ToolInfoCard";
import { OutcomeInfoCard } from "./OutcomeInfoCard";
import { tools } from "@/data/tools";
import { Checkbox } from "./ui/checkbox";

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
  
  // Persian Text Tool Options
  const [conversionType, setConversionType] = useState<"toEnglish" | "toPersian">("toPersian");
  const [standardizeOptions, setStandardizeOptions] = useState({
    fixHalfSpaces: true,
    convertArabicChars: true,
    removeDiacritics: false,
    normalizeSpacing: true
  });

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

  const toggleStandardizeOption = (option: keyof typeof standardizeOptions) => {
    setStandardizeOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
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
      case 'remove-html-tags':
        result = removeHtmlTags(textToolInput);
        setOutcomeMsg("تمام تگ‌های HTML از متن حذف شدند.");
        break;
      case 'remove-accent-tool':
        result = removeAccents(textToolInput);
        setOutcomeMsg("علامت‌های آوایی (اِعراب) از متن حذف شدند.");
        break;
      // New Persian text tools
      case 'persian-half-space-corrector':
        result = correctHalfSpaces(textToolInput);
        setOutcomeMsg("نیم‌فاصله‌های متن با موفقیت اصلاح شدند.");
        break;
      case 'persian-keyboard-converter':
        result = persianKeyboardConverter(textToolInput);
        setOutcomeMsg("متن با موفقیت به فارسی تبدیل شد.");
        break;
      case 'persian-number-converter':
        if (conversionType === "toPersian") {
          result = englishToPersianNumbers(textToolInput);
          setOutcomeMsg("اعداد انگلیسی با موفقیت به اعداد فارسی تبدیل شدند.");
        } else {
          result = persianToEnglishNumbers(textToolInput);
          setOutcomeMsg("اعداد فارسی با موفقیت به اعداد انگلیسی تبدیل شدند.");
        }
        break;
      case 'persian-text-standardizer':
        let processedText = textToolInput;
        
        if (standardizeOptions.convertArabicChars) {
          // We need to import and use arabicToPersian here
          processedText = persianKeyboardConverter(processedText);
        }
        
        if (standardizeOptions.fixHalfSpaces) {
          processedText = correctHalfSpaces(processedText);
        }
        
        result = processedText;
        setOutcomeMsg("متن فارسی با موفقیت استاندارد شد.");
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
      ) : slug === 'persian-number-converter' ? (
        <div dir="rtl" className="flex flex-col items-stretch gap-4">
          <RadioGroup
            value={conversionType}
            onValueChange={(val) => setConversionType(val as "toEnglish" | "toPersian")}
            className="flex gap-4 mb-2"
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroup.Item value="toPersian" id="toPersian" />
              <Label htmlFor="toPersian">تبدیل اعداد انگلیسی به فارسی</Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroup.Item value="toEnglish" id="toEnglish" />
              <Label htmlFor="toEnglish">تبدیل اعداد فارسی به انگلیسی</Label>
            </div>
          </RadioGroup>
          
          <Label htmlFor="textTool">متن ورودی</Label>
          <Textarea
            id="textTool"
            placeholder={conversionType === "toPersian" ? "اعداد انگلیسی را وارد کنید... مثال: 123" : "اعداد فارسی را وارد کنید... مثال: ۱۲۳"}
            value={textToolInput}
            onChange={e => setTextToolInput(e.target.value)}
            rows={7}
          />
          <Button type="button" onClick={handleTextToolProcess}>تبدیل</Button>
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
      ) : slug === 'persian-text-standardizer' ? (
        <div dir="rtl" className="flex flex-col items-stretch gap-4">
          <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-md">
            <div className="text-lg font-semibold mb-2">گزینه‌های استانداردسازی:</div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="fixHalfSpaces" 
                checked={standardizeOptions.fixHalfSpaces} 
                onCheckedChange={() => toggleStandardizeOption('fixHalfSpaces')} 
              />
              <Label htmlFor="fixHalfSpaces">تصحیح نیم‌فاصله‌ها</Label>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="convertArabicChars" 
                checked={standardizeOptions.convertArabicChars} 
                onCheckedChange={() => toggleStandardizeOption('convertArabicChars')} 
              />
              <Label htmlFor="convertArabicChars">تبدیل حروف عربی به فارسی (ي به ی، ك به ک)</Label>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="removeDiacritics" 
                checked={standardizeOptions.removeDiacritics} 
                onCheckedChange={() => toggleStandardizeOption('removeDiacritics')} 
              />
              <Label htmlFor="removeDiacritics">حذف اِعراب (فتحه، کسره، ضمه و...)</Label>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="normalizeSpacing" 
                checked={standardizeOptions.normalizeSpacing} 
                onCheckedChange={() => toggleStandardizeOption('normalizeSpacing')} 
              />
              <Label htmlFor="normalizeSpacing">استانداردسازی فاصله‌ها (بعد از نقطه و علائم نگارشی)</Label>
            </div>
          </div>
          
          <Label htmlFor="textTool">متن ورودی</Label>
          <Textarea
            id="textTool"
            placeholder="متن فارسی خود را وارد کنید..."
            value={textToolInput}
            onChange={e => setTextToolInput(e.target.value)}
            rows={7}
          />
          <Button type="button" onClick={handleTextToolProcess}>استانداردسازی متن</Button>
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
              <RadioGroup.Item value="asc">صعودی</RadioGroup.Item>
              <RadioGroup.Item value="desc">نزولی</RadioGroup.Item>
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
