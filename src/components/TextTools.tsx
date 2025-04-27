import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  calculateWordCount,
  calculateCharacterCount,
  convertToUppercase,
  convertToLowercase,
  capitalizeText,
  reverseText,
  removeExtraSpaces,
  generateRandomText,
  replaceText,
  extractEmails,
  extractUrls,
  countSentences,
  removeHtmlTags,
  slugifyText,
  censorText,
  wordWrap,
  textToBinary,
  binaryToText,
  removeAccents,
  htmlEncode,
  htmlDecode,
  findAndReplace,
  persianNumberToEnglish,
  englishNumberToPersian,
  removeNonPersianCharacters,
  normalizePersianText,
  generateLoremIpsum
} from "@/utils/text";
import { TextAnalysis } from "@/components/text-tools/TextAnalysis";
import { FinglishConverter } from "@/components/text-tools/FinglishConverter";
import { EnhancedFinglishConverter } from "@/components/text-tools/EnhancedFinglishConverter";

export default function TextTools({ slug }: { slug: string }) {
  const { toast } = useToast();
  const [text, setText] = React.useState("");
  const [outcomeMsg, setOutcomeMsg] = React.useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setOutcomeMsg(null);
  };

  const handleCalculateWordCount = () => {
    const wordCount = calculateWordCount(text);
    setOutcomeMsg(`تعداد کلمات: ${wordCount}`);
  };

  const handleCalculateCharacterCount = () => {
    const characterCount = calculateCharacterCount(text);
    setOutcomeMsg(`تعداد کاراکترها: ${characterCount}`);
  };

  const handleConvertToUppercase = () => {
    setText(convertToUppercase(text));
    setOutcomeMsg("متن به حروف بزرگ تبدیل شد!");
  };

  const handleConvertToLowercase = () => {
    setText(convertToLowercase(text));
    setOutcomeMsg("متن به حروف کوچک تبدیل شد!");
  };

  const handleCapitalizeText = () => {
    setText(capitalizeText(text));
    setOutcomeMsg("متن کپیتالایز شد!");
  };

  const handleReverseText = () => {
    setText(reverseText(text));
    setOutcomeMsg("متن معکوس شد!");
  };

  const handleRemoveExtraSpaces = () => {
    setText(removeExtraSpaces(text));
    setOutcomeMsg("فاصله‌های اضافی حذف شدند!");
  };

  const handleGenerateRandomText = () => {
    const randomText = generateRandomText(50);
    setText(randomText);
    setOutcomeMsg("متن تصادفی تولید شد!");
  };

  const handleReplaceText = (oldText: string, newText: string) => {
    const replacedText = replaceText(text, oldText, newText);
    setText(replacedText);
    setOutcomeMsg("متن جایگزین شد!");
  };

  const handleExtractEmails = () => {
    const emails = extractEmails(text);
    setText(emails.join(", "));
    setOutcomeMsg("ایمیل‌ها استخراج شدند!");
  };

  const handleExtractUrls = () => {
    const urls = extractUrls(text);
    setText(urls.join(", "));
    setOutcomeMsg("URLها استخراج شدند!");
  };

  const handleCountSentences = () => {
    const sentenceCount = countSentences(text);
    setOutcomeMsg(`تعداد جملات: ${sentenceCount}`);
  };

  const handleRemoveHtmlTags = () => {
    setText(removeHtmlTags(text));
    setOutcomeMsg("تگ‌های HTML حذف شدند!");
  };

  const handleSlugifyText = () => {
    setText(slugifyText(text));
    setOutcomeMsg("متن Slugify شد!");
  };

  const handleCensorText = (badWords: string[]) => {
    const censoredText = censorText(text, badWords);
    setText(censoredText);
    setOutcomeMsg("متن سانسور شد!");
  };

  const handleWordWrap = (maxLength: number) => {
    const wrappedText = wordWrap(text, maxLength);
    setText(wrappedText);
    setOutcomeMsg("متن Word Wrap شد!");
  };

  const handleTextToBinary = () => {
    setText(textToBinary(text));
    setOutcomeMsg("متن به باینری تبدیل شد!");
  };

  const handleBinaryToText = () => {
    try {
      setText(binaryToText(text));
      setOutcomeMsg("باینری به متن تبدیل شد!");
    } catch (error) {
      toast({
        title: "خطا!",
        description: "ورودی باینری معتبر نیست.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveAccents = () => {
    setText(removeAccents(text));
    setOutcomeMsg("حذف لهجه‌ها انجام شد!");
  };

  const handleHtmlEncode = () => {
    setText(htmlEncode(text));
    setOutcomeMsg("HTML Encode انجام شد!");
  };

  const handleHtmlDecode = () => {
    setText(htmlDecode(text));
    setOutcomeMsg("HTML Decode انجام شد!");
  };

  const handleFindAndReplace = (find: string, replace: string) => {
    const replacedText = findAndReplace(text, find, replace);
    setText(replacedText);
    setOutcomeMsg("جایگزینی انجام شد!");
  };

  const handlePersianNumberToEnglish = () => {
    setText(persianNumberToEnglish(text));
    setOutcomeMsg("اعداد فارسی به انگلیسی تبدیل شدند!");
  };

  const handleEnglishNumberToPersian = () => {
    setText(englishNumberToPersian(text));
    setOutcomeMsg("اعداد انگلیسی به فارسی تبدیل شدند!");
  };

  const handleRemoveNonPersianCharacters = () => {
    setText(removeNonPersianCharacters(text));
    setOutcomeMsg("کاراکترهای غیر فارسی حذف شدند!");
  };

  const handleNormalizePersianText = () => {
    setText(normalizePersianText(text));
    setOutcomeMsg("متن فارسی نرمالایز شد!");
  };

  const handleGenerateLoremIpsum = (wordCount: number) => {
    setText(generateLoremIpsum(wordCount));
    setOutcomeMsg("متن Lorem Ipsum تولید شد!");
  };
  
  const renderToolContent = () => {
    switch (slug) {
      case "text-counter":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCalculateWordCount}>
                شمارش کلمات
              </Button>
              <Button onClick={handleCalculateCharacterCount}>
                شمارش کاراکترها
              </Button>
            </div>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "text-to-uppercase":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleConvertToUppercase}>
              تبدیل به حروف بزرگ
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "text-to-lowercase":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleConvertToLowercase}>
              تبدیل به حروف کوچک
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "capitalize-text":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleCapitalizeText}>
              کپیتالایز کردن متن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "reverse-text":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleReverseText}>
              معکوس کردن متن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "remove-extra-spaces":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleRemoveExtraSpaces}>
              حذف فاصله‌های اضافی
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "random-text-generator":
        return (
          <>
            <Textarea
              placeholder="متن تصادفی تولید شده اینجا نمایش داده می‌شود..."
              value={text}
              readOnly
            />
            <Button onClick={handleGenerateRandomText}>
              تولید متن تصادفی
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "text-replacer":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="متن قدیمی"
                className="border rounded p-2"
                onChange={(e) =>
                  handleReplaceText(e.target.value, "")
                }
              />
              <input
                type="text"
                placeholder="متن جدید"
                className="border rounded p-2"
                onChange={(e) =>
                  handleReplaceText("", e.target.value)
                }
              />
            </div>
            <Button onClick={() => handleReplaceText("", "")}>
              جایگزینی متن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "email-extractor":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleExtractEmails}>
              استخراج ایمیل‌ها
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "url-extractor":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleExtractUrls}>
              استخراج URLها
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "sentence-counter":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleCountSentences}>
              شمارش جملات
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "html-tag-remover":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleRemoveHtmlTags}>
              حذف تگ‌های HTML
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "text-slugifier":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleSlugifyText}>
              Slugify کردن متن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "text-censor":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={() => handleCensorText([])}>
              سانسور کردن متن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "word-wrapper":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={() => handleWordWrap(50)}>
              Word Wrap کردن متن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "text-to-binary":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleTextToBinary}>
              تبدیل متن به باینری
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "binary-to-text":
        return (
          <>
            <Textarea
              placeholder="کد باینری خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleBinaryToText}>
              تبدیل باینری به متن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "accent-remover":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleRemoveAccents}>
              حذف لهجه‌ها
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "html-encoder":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleHtmlEncode}>
              HTML Encode
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "html-decoder":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleHtmlDecode}>
              HTML Decode
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "find-and-replace":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="متنی که باید پیدا شود"
                className="border rounded p-2"
                onChange={(e) =>
                  handleFindAndReplace(e.target.value, "")
                }
              />
              <input
                type="text"
                placeholder="متنی که جایگزین می‌شود"
                className="border rounded p-2"
                onChange={(e) =>
                  handleFindAndReplace("", e.target.value)
                }
              />
            </div>
            <Button onClick={() => handleFindAndReplace("", "")}>
              پیدا و جایگزین کن
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "persian-number-to-english":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handlePersianNumberToEnglish}>
              تبدیل اعداد فارسی به انگلیسی
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "english-number-to-persian":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleEnglishNumberToPersian}>
              تبدیل اعداد انگلیسی به فارسی
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "non-persian-remover":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleRemoveNonPersianCharacters}>
              حذف کاراکترهای غیر فارسی
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "persian-text-normalizer":
        return (
          <>
            <Textarea
              placeholder="متن خود را اینجا وارد کنید..."
              value={text}
              onChange={handleTextChange}
            />
            <Button onClick={handleNormalizePersianText}>
              نرمالایز کردن متن فارسی
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "lorem-ipsum-generator":
        return (
          <>
            <Textarea
              placeholder="متن Lorem Ipsum تولید شده اینجا نمایش داده می‌شود..."
              value={text}
              readOnly
            />
            <Button onClick={() => handleGenerateLoremIpsum(50)}>
              تولید متن Lorem Ipsum
            </Button>
            {outcomeMsg && <p>{outcomeMsg}</p>}
          </>
        );
      case "text-analysis":
        return (
          <TextAnalysis text={text} />
        );
      case "finglish-converter":
        return <FinglishConverter outcomeMsg={outcomeMsg} setOutcomeMsg={setOutcomeMsg} />;
      case "enhanced-finglish-converter":
        return <EnhancedFinglishConverter />;
      
      default:
        return (
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
              <p className="text-muted-foreground">
                این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderToolContent()}
    </div>
  );
}
