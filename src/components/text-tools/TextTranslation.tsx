
import React from 'react';
import { TextToolForm } from './TextToolForm';
import {
  persianNumberToEnglish,
  englishNumberToPersian,
  removeNonPersianCharacters,
  normalizePersianText
} from '@/utils/text';

interface TextTranslationProps {
  type: string;
  text: string;
  setText: (text: string) => void;
  outcomeMsg: string | null;
  setOutcomeMsg: (msg: string | null) => void;
}

export function TextTranslation({ type, text, setText, outcomeMsg, setOutcomeMsg }: TextTranslationProps) {
  const [output, setOutput] = React.useState("");

  const handleProcess = () => {
    let result = "";
    switch (type) {
      case "persian-number-to-english":
        result = persianNumberToEnglish(text);
        setOutcomeMsg("اعداد فارسی به انگلیسی تبدیل شدند!");
        break;
      case "english-number-to-persian":
        result = englishNumberToPersian(text);
        setOutcomeMsg("اعداد انگلیسی به فارسی تبدیل شدند!");
        break;
      case "non-persian-remover":
        result = removeNonPersianCharacters(text);
        setOutcomeMsg("کاراکترهای غیر فارسی حذف شدند!");
        break;
      case "persian-text-normalizer":
        result = normalizePersianText(text);
        setOutcomeMsg("متن فارسی نرمالایز شد!");
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
