
import React from 'react';
import { TextToolForm } from './TextToolForm';
import { 
  removeExtraSpaces,
  calculateWordCount,
  calculateCharacterCount,
  countParagraphs
} from '@/utils/text';

interface TextFormattingProps {
  type: string;
  text: string;
  setText: (text: string) => void;
  outcomeMsg: string | null;
  setOutcomeMsg: (msg: string | null) => void;
}

export function TextFormatting({ type, text, setText, outcomeMsg, setOutcomeMsg }: TextFormattingProps) {
  const [output, setOutput] = React.useState("");

  const handleProcess = () => {
    let result = "";
    switch (type) {
      case "remove-empty-lines":
        result = removeExtraSpaces(text);
        setOutcomeMsg("خطوط خالی حذف شدند!");
        break;
      case "word-counter":
        result = `تعداد کلمات: ${calculateWordCount(text)}`;
        setOutcomeMsg("شمارش کلمات انجام شد!");
        break;
      case "character-counter":
        result = `تعداد کاراکترها: ${calculateCharacterCount(text)}`;
        setOutcomeMsg("شمارش کاراکترها انجام شد!");
        break;
      case "paragraph-counter":
        result = `تعداد پاراگراف‌ها: ${countParagraphs(text)}`;
        setOutcomeMsg("شمارش پاراگراف‌ها انجام شد!");
        break;
    }
    setOutput(result);
  };

  return (
    <TextToolForm
      textInput={text}
      textOutput={output}
      setTextInput={setText}
      handleProcess={handleProcess}
      setOutcomeMsg={setOutcomeMsg}
    />
  );
}
