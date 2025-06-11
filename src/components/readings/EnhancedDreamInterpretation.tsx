
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sparkles, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { DreamInterpretationEngine, DreamInterpretationResult } from './dream/DreamInterpretationEngine';
import DreamResultDisplay from './dream/DreamResultDisplay';

export default function EnhancedDreamInterpretation() {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<DreamInterpretationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDream = () => {
    if (!dreamText.trim()) {
      toast.error("لطفاً خواب خود را وارد کنید");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const result = DreamInterpretationEngine.generateInterpretation(dreamText);
      setInterpretation(result);
      setIsAnalyzing(false);
      toast.success("تعبیر خواب شما آماده شد!");
    }, 2000);
  };

  const copyResult = () => {
    if (interpretation) {
      const text = `🌙 تعبیر خواب\n\n📝 خواب: ${dreamText}\n\n🔮 تفسیر: ${interpretation.summary}\n\n🗝️ نمادها:\n${interpretation.symbols.map(s => `• ${s.symbol}: ${s.meaning}`).join('\n')}\n\n💡 توصیه: ${interpretation.advice}\n\n✨ معنای معنوی: ${interpretation.spiritual}`;
      
      copyToClipboard(text);
      toast.success("تعبیر خواب کپی شد!");
    }
  };

  const resetForm = () => {
    setDreamText('');
    setInterpretation(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-indigo-800">
            <Moon className="text-indigo-600" size={28} />
            تعبیر خواب هوشمند
          </CardTitle>
          <p className="text-indigo-600 mt-2">خواب خود را تعریف کنید تا معنای آن را بدانید</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-indigo-800">خواب خود را به تفصیل بنویسید:</label>
            <Textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="مثال: من در خوابم دیدم که در خانه قدیمی‌مان بودم و یک پرنده سفید وارد اتاق شد..."
              rows={4}
              className="border-indigo-200 focus:border-indigo-400"
            />
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={analyzeDream}
              disabled={isAnalyzing || !dreamText.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="animate-spin mr-2" size={16} />
                  در حال تجزیه و تحلیل...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" size={16} />
                  تعبیر خواب
                </>
              )}
            </Button>

            {interpretation && (
              <>
                <Button
                  variant="outline"
                  onClick={copyResult}
                  className="border-indigo-400 text-indigo-700 hover:bg-indigo-50"
                >
                  <Copy className="mr-2" size={16} />
                  کپی نتیجه
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-gray-400 text-gray-700 hover:bg-gray-50"
                >
                  خواب جدید
                </Button>
              </>
            )}
          </div>

          {interpretation && <DreamResultDisplay interpretation={interpretation} />}
        </CardContent>
      </Card>
    </div>
  );
}
