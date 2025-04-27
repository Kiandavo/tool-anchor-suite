
import React, { useState } from 'react';
import { TextCounter } from './TextCounter';
import { TextTransformer } from './TextTransformer';
import { TextFormatting } from './TextFormatting';
import { CodeTools } from './CodeTools';
import { TextTranslation } from './TextTranslation';
import { TextAnalysis } from './TextAnalysis';
import { FinglishConverter, EnhancedFinglishConverter } from '@/components/text-tools';

export default function TextToolContainer({ slug }: { slug: string }) {
  const [text, setText] = useState("");
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {(() => {
        switch (slug) {
          case "text-counter":
            return <TextCounter textInput={text} setTextInput={setText} />;
          
          // Basic text transformations
          case "text-to-uppercase":
          case "text-to-lowercase":
          case "text-reverser":
          case "capitalize-text":
            return <TextTransformer type={slug} text={text} setText={setText} outcomeMsg={outcomeMsg} setOutcomeMsg={setOutcomeMsg} />;
          
          // Formatting tools
          case "remove-empty-lines":
          case "text-repeater":
          case "word-counter":
          case "character-counter":
          case "line-counter":
          case "paragraph-counter":
            return <TextFormatting type={slug} text={text} setText={setText} outcomeMsg={outcomeMsg} setOutcomeMsg={setOutcomeMsg} />;
          
          // Code-related tools
          case "html-encoder":
          case "html-decoder":
          case "url-encoder":
          case "url-decoder":
          case "base64-encoder":
          case "base64-decoder":
          case "text-to-binary":
          case "binary-to-text":
            return <CodeTools type={slug} text={text} setText={setText} outcomeMsg={outcomeMsg} setOutcomeMsg={setOutcomeMsg} />;
          
          // Translation and conversion
          case "text-translator":
          case "persian-number-to-english":
          case "english-number-to-persian":
          case "non-persian-remover":
          case "persian-text-normalizer":
            return <TextTranslation type={slug} text={text} setText={setText} outcomeMsg={outcomeMsg} setOutcomeMsg={setOutcomeMsg} />;

          // Analysis tools
          case "text-analysis":
            return <TextAnalysis text={text} />;
            
          // Finglish converters
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
      })()}
    </div>
  );
}
