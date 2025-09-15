
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
      case "text-translator":
        // Basic Persian-English translation mappings
        const translations: {[key: string]: string} = {
          "سلام": "hello",
          "hello": "سلام", 
          "خوبی": "how are you",
          "how are you": "چطوری",
          "چطوری": "how are you",
          "ممنون": "thank you",
          "thank you": "ممنون",
          "خداحافظ": "goodbye",
          "goodbye": "خداحافظ",
          "بله": "yes",
          "yes": "بله",
          "نه": "no",
          "no": "نه",
          "لطفا": "please",
          "please": "لطفا",
          "ببخشید": "sorry",
          "sorry": "ببخشید",
          "دوست دارم": "I love",
          "I love": "دوست دارم",
          "خانه": "home",
          "home": "خانه",
          "آب": "water",
          "water": "آب",
          "غذا": "food",
          "food": "غذا",
          "کتاب": "book",
          "book": "کتاب"
        };
        
        const words = text.toLowerCase().split(/\s+/);
        const translatedWords = words.map(word => {
          const cleanWord = word.replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z]/g, "");
          return translations[cleanWord] || translations[word] || word;
        });
        
        result = translatedWords.join(" ");
        setOutcomeMsg("ترجمه با موفقیت انجام شد!");
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
