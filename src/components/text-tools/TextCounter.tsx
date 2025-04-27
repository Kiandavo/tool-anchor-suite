
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { countChars, countWords, countSentences, countParagraphs, calculateReadingTime } from "@/utils/text";

interface TextCounterProps {
  textInput: string;
  setTextInput: (text: string) => void;
}

export function TextCounter({ textInput, setTextInput }: TextCounterProps) {
  const textStats = {
    characters: countChars(textInput),
    charactersNoSpaces: countChars(textInput.replace(/\s+/g, '')),
    words: countWords(textInput),
    sentences: countSentences(textInput),
    paragraphs: countParagraphs(textInput),
    readingTimeMinutes: calculateReadingTime(textInput)
  };

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
