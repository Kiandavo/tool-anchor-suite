
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Copy, RefreshCw, Eye } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { AuraReadingEngine, AuraReadingResult } from './aura/AuraReadingEngine';
import AuraResultDisplay from './aura/AuraResultDisplay';

export default function EnhancedAuraReading() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [auraReading, setAuraReading] = useState<AuraReadingResult | null>(null);
  const [isReading, setIsReading] = useState(false);

  const generateAuraReading = () => {
    if (!name.trim()) {
      toast.error("لطفاً نام خود را وارد کنید");
      return;
    }

    setIsReading(true);

    setTimeout(() => {
      const result = AuraReadingEngine.generateReading(name, birthDate);
      setAuraReading(result);
      setIsReading(false);
      toast.success("هاله‌ی شما خوانده شد!");
    }, 2500);
  };

  const copyResult = () => {
    if (auraReading) {
      const text = `✨ خواندن هاله ${name}\n\n🎨 رنگ اصلی: ${auraReading.primaryColor.name}\nمعنی: ${auraReading.primaryColor.meaning}\nویژگی‌ها: ${auraReading.primaryColor.traits.join(', ')}\n\n🌈 رنگ فرعی: ${auraReading.secondaryColor.name}\nمعنی: ${auraReading.secondaryColor.meaning}\n\n⚡ سطح انرژی: ${auraReading.energy}%\n🧘 سطح معنویت: ${auraReading.spiritualLevel}%\n\n💡 راهنمایی: ${auraReading.advice}\n\n🔮 توصیه اصلی: ${auraReading.primaryColor.advice}`;
      
      copyToClipboard(text);
      toast.success("نتیجه هاله‌خوانی کپی شد!");
    }
  };

  const resetForm = () => {
    setName('');
    setBirthDate('');
    setAuraReading(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-purple-800">
            <Eye className="text-purple-600" size={28} />
            خواندن هاله
          </CardTitle>
          <p className="text-purple-600 mt-2">انرژی و رنگ هاله‌ی شما را کشف کنید</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-800">نام:</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام کامل خود را وارد کنید"
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-800">تاریخ تولد (اختیاری):</label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={generateAuraReading}
              disabled={isReading || !name.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
            >
              {isReading ? (
                <>
                  <RefreshCw className="animate-spin mr-2" size={16} />
                  در حال خواندن هاله...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" size={16} />
                  خواندن هاله
                </>
              )}
            </Button>

            {auraReading && (
              <>
                <Button
                  variant="outline"
                  onClick={copyResult}
                  className="border-purple-400 text-purple-700 hover:bg-purple-50"
                >
                  <Copy className="mr-2" size={16} />
                  کپی نتیجه
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-gray-400 text-gray-700 hover:bg-gray-50"
                >
                  شروع مجدد
                </Button>
              </>
            )}
          </div>

          {auraReading && <AuraResultDisplay name={name} auraReading={auraReading} />}
        </CardContent>
      </Card>
    </div>
  );
}
