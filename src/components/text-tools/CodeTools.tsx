
import React from 'react';
import { TextToolForm } from './TextToolForm';
import { 
  htmlEncode,
  htmlDecode,
  textToBinary,
  binaryToText
} from '@/utils/text';

interface CodeToolsProps {
  type: string;
  text: string;
  setText: (text: string) => void;
  outcomeMsg: string | null;
  setOutcomeMsg: (msg: string | null) => void;
}

export function CodeTools({ type, text, setText, outcomeMsg, setOutcomeMsg }: CodeToolsProps) {
  const [output, setOutput] = React.useState("");

  const handleProcess = () => {
    let result = "";
    switch (type) {
      case "html-encoder":
        result = htmlEncode(text);
        setOutcomeMsg("HTML Encode انجام شد!");
        break;
      case "html-decoder":
        result = htmlDecode(text);
        setOutcomeMsg("HTML Decode انجام شد!");
        break;
      case "text-to-binary":
        result = textToBinary(text);
        setOutcomeMsg("متن به باینری تبدیل شد!");
        break;
      case "binary-to-text":
        result = binaryToText(text);
        setOutcomeMsg("باینری به متن تبدیل شد!");
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
