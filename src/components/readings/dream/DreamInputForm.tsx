
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";

interface DreamInputFormProps {
  dreamText: string;
  setDreamText: (text: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const DreamInputForm: React.FC<DreamInputFormProps> = ({
  dreamText,
  setDreamText,
  onAnalyze,
  isAnalyzing
}) => {
  return (
    <div className="space-y-3">
      <div className="bg-white/60 p-3 rounded-lg border border-indigo-200">
        <p className="text-indigo-800 text-sm font-medium mb-2">
          خواب خود را با جزئیات شرح دهید:
        </p>
        <Textarea
          placeholder="مثال: دیشب خواب دیدم که در باغی پر از گل‌های سرخ قدم می‌زدم و ناگهان پرنده‌ای سفید آمد و روی دستم نشست..."
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          className="border-indigo-200 focus:border-indigo-400 min-h-[120px]"
        />
      </div>

      <Button
        onClick={onAnalyze}
        disabled={isAnalyzing || !dreamText.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {isAnalyzing ? (
          <>
            <Search className="animate-pulse ml-2" size={16} />
            در حال تحلیل خواب...
          </>
        ) : (
          <>
            <Star className="ml-2" size={16} />
            تعبیر خواب
          </>
        )}
      </Button>
    </div>
  );
};

export default DreamInputForm;
