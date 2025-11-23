import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HafezPoem } from '@/data/hafez-ghazals';
import { ChevronDown, ChevronUp, BookOpen, Calendar, Link2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PoemAnalysisProps {
  poem: HafezPoem & {
    keywords?: string[];
    theme?: string;
    emotion?: string;
    historicalContext?: string;
    yearWritten?: string;
    symbols?: { term: string; meaning: string; category: string }[];
  };
  intention: string;
  highlightKeywords?: boolean;
}

export const PoemAnalysis: React.FC<PoemAnalysisProps> = ({
  poem,
  intention,
  highlightKeywords = true,
}) => {
  const [showContext, setShowContext] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Highlight keywords in poem text
  const renderHighlightedText = (text: string) => {
    if (!highlightKeywords || !poem.keywords || poem.keywords.length === 0) {
      return <p className="text-base leading-loose">{text}</p>;
    }

    const lines = text.split('\n');
    return (
      <div className="space-y-2">
        {lines.map((line, lineIndex) => {
          let processedLine = line;
          const elements: React.ReactNode[] = [];
          let lastIndex = 0;

          // Find all keywords in this line
          poem.keywords?.forEach((keyword) => {
            const index = processedLine.indexOf(keyword, lastIndex);
            if (index !== -1) {
              // Add text before keyword
              if (index > lastIndex) {
                elements.push(
                  <span key={`text-${lineIndex}-${lastIndex}`}>
                    {processedLine.slice(lastIndex, index)}
                  </span>
                );
              }
              // Add highlighted keyword
              const symbol = poem.symbols?.find((s) => s.term === keyword);
              elements.push(
                <span
                  key={`keyword-${lineIndex}-${index}`}
                  className="relative inline-block cursor-pointer"
                  onMouseEnter={() => setHoveredWord(keyword)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  <span className="bg-amber-100 text-[#5c3f14] px-1 rounded font-semibold border-b-2 border-amber-300">
                    {keyword}
                  </span>
                  {hoveredWord === keyword && symbol && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-white border-2 border-amber-200 rounded-lg shadow-lg"
                    >
                      <p className="text-xs text-[#5c3f14] font-semibold mb-1">{symbol.term}</p>
                      <p className="text-[10px] text-[#5c3f14]/80">{symbol.meaning}</p>
                    </motion.div>
                  )}
                </span>
              );
              lastIndex = index + keyword.length;
            }
          });

          // Add remaining text
          if (lastIndex < processedLine.length) {
            elements.push(
              <span key={`text-${lineIndex}-${lastIndex}`}>
                {processedLine.slice(lastIndex)}
              </span>
            );
          }

          return (
            <p key={lineIndex} className="text-base leading-loose">
              {elements.length > 0 ? elements : line}
            </p>
          );
        })}
      </div>
    );
  };

  // Connection to intention
  const getIntentionConnection = () => {
    if (!intention) return null;

    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200 mb-4">
        <div className="flex items-start gap-2">
          <Link2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[#5c3f14] mb-1">ارتباط با نیت شما:</p>
            <p className="text-xs text-[#5c3f14]/80 leading-relaxed">
              این غزل به طور خاص به موضوع شما پاسخ می‌دهد. حافظ در این ابیات راهنمایی می‌دهد که با صبر و توکل، راه‌حل پیدا خواهید کرد.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Connection to Intention */}
      {getIntentionConnection()}

      {/* Poem Text with Highlights */}
      <Card className="bg-white/80 backdrop-blur-sm border-[#5c3f14]/20">
        <CardContent className="pt-4">
          <div className="text-center text-[#5c3f14] font-vazir" dir="rtl">
            {renderHighlightedText(poem.text)}
          </div>
        </CardContent>
      </Card>

      {/* Symbols Guide */}
      {poem.symbols && poem.symbols.length > 0 && (
        <Card className="bg-white/60 backdrop-blur-sm border-[#5c3f14]/20">
          <CardContent className="pt-4">
            <button
              onClick={() => setShowSymbols(!showSymbols)}
              className="w-full flex items-center justify-between text-[#5c3f14] hover:text-[#5c3f14]/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">راهنمای نمادها</span>
              </div>
              {showSymbols ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {showSymbols && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 space-y-2"
                >
                  {poem.symbols.map((symbol, idx) => (
                    <div key={idx} className="p-2 bg-amber-50 rounded-lg">
                      <p className="text-xs font-semibold text-[#5c3f14]">{symbol.term}</p>
                      <p className="text-[10px] text-[#5c3f14]/70">{symbol.meaning}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* Historical Context */}
      {poem.historicalContext && (
        <Card className="bg-white/60 backdrop-blur-sm border-[#5c3f14]/20">
          <CardContent className="pt-4">
            <button
              onClick={() => setShowContext(!showContext)}
              className="w-full flex items-center justify-between text-[#5c3f14] hover:text-[#5c3f14]/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-semibold">درباره این غزل</span>
              </div>
              {showContext ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {showContext && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 space-y-3"
                >
                  {poem.yearWritten && (
                    <div className="flex items-center gap-2 text-xs text-[#5c3f14]/70">
                      <Calendar className="w-3 h-3" />
                      <span>زمان سرایش: {poem.yearWritten}</span>
                    </div>
                  )}
                  <p className="text-xs text-[#5c3f14]/80 leading-relaxed">
                    {poem.historicalContext}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
