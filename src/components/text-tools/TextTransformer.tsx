
import React from 'react';
import { TextToolForm } from './TextToolForm';
import { 
  convertToUppercase, 
  convertToLowercase, 
  reverseText, 
  capitalizeText 
} from '@/utils/text';

interface TextTransformerProps {
  type: string;
  text: string;
  setText: (text: string) => void;
  outcomeMsg: string | null;
  setOutcomeMsg: (msg: string | null) => void;
}

export function TextTransformer({ type, text, setText, outcomeMsg, setOutcomeMsg }: TextTransformerProps) {
  const [output, setOutput] = React.useState("");

  const handleProcess = () => {
    let result = text;
    switch (type) {
      case "text-to-uppercase":
        result = convertToUppercase(text);
        setOutcomeMsg("متن به حروف بزرگ تبدیل شد!");
        break;
      case "text-to-lowercase":
        result = convertToLowercase(text);
        setOutcomeMsg("متن به حروف کوچک تبدیل شد!");
        break;
      case "text-reverser":
        result = reverseText(text);
        setOutcomeMsg("متن معکوس شد!");
        break;
      case "capitalize-text":
        result = capitalizeText(text);
        setOutcomeMsg("متن کپیتالایز شد!");
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
