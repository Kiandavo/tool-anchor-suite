
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Moon } from "lucide-react";
import { dreamSymbols, DreamSymbol } from '@/data/dream-symbols';
import DreamInputForm from './dream/DreamInputForm';
import DreamInterpretationResult from './dream/DreamInterpretationResult';
import DreamSymbolsReference from './dream/DreamSymbolsReference';
import DreamActionButtons from './dream/DreamActionButtons';

const DreamInterpretation = () => {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<string>('');
  const [foundSymbols, setFoundSymbols] = useState<DreamSymbol[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDream = () => {
    if (!dreamText.trim()) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Find symbols mentioned in the dream
      const found = dreamSymbols.filter(symbol => 
        dreamText.includes(symbol.symbol)
      );
      
      setFoundSymbols(found);
      
      // Generate interpretation
      if (found.length > 0) {
        const interpretationText = generateInterpretation(found);
        setInterpretation(interpretationText);
      } else {
        setInterpretation('در متن خواب شما نمادهای مشخصی یافت نشد. لطفاً خواب خود را با جزئیات بیشتری شرح دهید.');
      }
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateInterpretation = (symbols: DreamSymbol[]): string => {
    const intro = 'بر اساس نمادهای موجود در خواب شما:\n\n';
    const symbolInterpretations = symbols.map(symbol => 
      `🔮 ${symbol.symbol}: ${symbol.meaning}\n${symbol.details}`
    ).join('\n\n');
    
    const conclusion = '\n\nنتیجه کلی: خواب شما حاوی پیام‌های مثبت است و نشان‌دهنده تغییرات مثبت در زندگی شما می‌باشد. به نمادهای خواب خود توجه کنید.';
    
    return intro + symbolInterpretations + conclusion;
  };

  const copyInterpretation = () => {
    const text = `تعبیر خواب:\n\n${interpretation}`;
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setDreamText('');
    setInterpretation('');
    setFoundSymbols([]);
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-300 to-purple-300 text-center py-3">
        <div className="flex items-center justify-center">
          <Moon className="text-indigo-800 ml-2" size={18} />
          <h2 className="text-lg font-bold text-indigo-800">تعبیر خواب</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        <div className="space-y-4">
          {!interpretation ? (
            <DreamInputForm
              dreamText={dreamText}
              setDreamText={setDreamText}
              onAnalyze={analyzeDream}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <DreamInterpretationResult
              interpretation={interpretation}
              foundSymbols={foundSymbols}
            />
          )}

          <DreamSymbolsReference />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center gap-2 pt-3 pb-4 bg-indigo-50/50">
        <DreamActionButtons
          interpretation={interpretation}
          onCopy={copyInterpretation}
          onClear={clearAll}
        />
      </CardFooter>
    </Card>
  );
};

export default DreamInterpretation;
