
import React, { useState, useEffect } from 'react';
import { tools } from "@/data/tools";
import { ToolInfoCard } from "./ToolInfoCard";
import { OutcomeInfoCard } from "./OutcomeInfoCard";
import { FinglishConverter } from './text-tools/FinglishConverter';
import { TextCounter } from './text-tools/TextCounter';
import { TextToolForm } from './text-tools/TextToolForm';
import {
  reverseText, removeDuplicateLines, sortLines, trimLines,
  removeEmptyLines, removeEmojis, generateSlug, toUpperCase,
  toLowerCase, toTitleCase, removeHtmlTags, removeAccents
} from "@/utils/toolUtils";

interface TextToolsProps {
  slug: string;
}

export default function TextTools({ slug }: TextToolsProps) {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  const toolMeta = tools.find((t) => t.slug === slug);

  const handleProcess = () => {
    if (!textInput.trim()) {
      setOutcomeMsg("لطفاً متن مورد نظر را وارد کنید.");
      return;
    }

    let result = "";
    switch (slug) {
      case 'text-reverse':
        result = reverseText(textInput);
        setOutcomeMsg("متن با موفقیت وارونه شد.");
        break;
      case 'remove-duplicate-lines':
        result = removeDuplicateLines(textInput);
        setOutcomeMsg("تمام خطوط تکراری حذف شدند.");
        break;
      case 'text-sorter':
        result = sortLines(textInput, sortOrder === "asc");
        setOutcomeMsg(sortOrder === "asc" ? "خطوط به صورت صعودی مرتب شدند." : "خطوط به صورت نزولی مرتب شدند.");
        break;
      case 'text-trimmer':
        result = trimLines(textInput);
        setOutcomeMsg("فاصله‌های ابتدا و انتهای خطوط حذف شد.");
        break;
      case 'remove-empty-lines':
        result = removeEmptyLines(textInput);
        setOutcomeMsg("خطوط خالی از متن حذف شدند.");
        break;
      case 'emoji-remover':
        result = removeEmojis(textInput);
        setOutcomeMsg("تمام ایموجی‌ها از متن حذف شدند.");
        break;
      case 'slug-generator':
        result = generateSlug(textInput);
        setOutcomeMsg("اسلاگ مناسب برای متن شما تولید شد.");
        break;
      case 'text-uppercasing':
        result = toUpperCase(textInput);
        setOutcomeMsg("تمام متن به حروف بزرگ تبدیل شد.");
        break;
      case 'text-lowercasing':
        result = toLowerCase(textInput);
        setOutcomeMsg("تمام متن به حروف کوچک تبدیل شد.");
        break;
      case 'text-titlecase':
        result = toTitleCase(textInput);
        setOutcomeMsg("حرف اول هر کلمه بزرگ شد.");
        break;
      case 'remove-html-tags':
        result = removeHtmlTags(textInput);
        setOutcomeMsg("تمام تگ‌های HTML از متن حذف شدند.");
        break;
      case 'remove-accent-tool':
        result = removeAccents(textInput);
        setOutcomeMsg("علامت‌های آوایی (اِعراب) از متن حذف شدند.");
        break;
      default:
        setOutcomeMsg(null);
    }
    setTextOutput(result);
  };

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
        <FinglishConverter outcomeMsg={outcomeMsg} setOutcomeMsg={setOutcomeMsg} />
      ) : slug === 'text-counter' ? (
        <TextCounter textInput={textInput} setTextInput={setTextInput} />
      ) : (
        <TextToolForm
          textInput={textInput}
          textOutput={textOutput}
          setTextInput={setTextInput}
          handleProcess={handleProcess}
          showSortOptions={slug === 'text-sorter'}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setOutcomeMsg={setOutcomeMsg}
        />
      )}
      {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
    </div>
  );
}
