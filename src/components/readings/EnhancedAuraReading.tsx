
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, RefreshCw, Eye, Calendar } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";

interface AuraColor {
  name: string;
  color: string;
  meaning: string;
  traits: string[];
  advice: string;
}

const auraColors: AuraColor[] = [
  {
    name: "قرمز",
    color: "bg-red-500",
    meaning: "انرژی، قدرت و اشتیاق",
    traits: ["رهبری قوی", "پرانرژی", "مصمم", "عاشق ماجراجویی"],
    advice: "انرژی خود را به صورت مثبت هدایت کنید و از عجله‌کاری بپرهیزید."
  },
  {
    name: "نارنجی",
    color: "bg-orange-500",
    meaning: "خلاقیت، شادی و اجتماعی بودن",
    traits: ["خلاق", "اجتماعی", "شاد", "انعطاف‌پذیر"],
    advice: "از خلاقیت خود بیشتر استفاده کنید و با دیگران ارتباط برقرار کنید."
  },
  {
    name: "زرد",
    color: "bg-yellow-500",
    meaning: "هوش، روشنی و تمرکز",
    traits: ["باهوش", "تحلیلگر", "خوش‌بین", "کنجکاو"],
    advice: "بر روی تعادل ذهنی تمرکز کنید و از استرس بیش از حد بپرهیزید."
  },
  {
    name: "سبز",
    color: "bg-green-500",
    meaning: "شفا، طبیعت و تعادل",
    traits: ["شفابخش", "متعادل", "مهربان", "صبور"],
    advice: "به طبیعت نزدیک شوید و انرژی شفابخش خود را تقویت کنید."
  },
  {
    name: "آبی",
    color: "bg-blue-500",
    meaning: "آرامش، ارتباطات و حقیقت",
    traits: ["آرام", "راستگو", "ارتباط‌گر خوب", "معنوی"],
    advice: "بر روی ارتباطات صادقانه تمرکز کنید و به صدای درونتان گوش دهید."
  },
  {
    name: "بنفش",
    color: "bg-purple-500",
    meaning: "معنویت، شهود و حکمت",
    traits: ["شهودی", "معنوی", "حکیم", "الهام‌بخش"],
    advice: "به قدرت شهود خود اعتماد کنید و مسیر معنوی را دنبال کنید."
  },
  {
    name: "صورتی",
    color: "bg-pink-500",
    meaning: "عشق، مهربانی و حساسیت",
    traits: ["مهربان", "عاشق", "حساس", "دلسوز"],
    advice: "از قلب بزرگ خود مراقبت کنید و مرزهای سالم تعیین کنید."
  },
  {
    name: "طلایی",
    color: "bg-yellow-400",
    meaning: "روشنایی، حکمت و الهام",
    traits: ["منور", "حکیم", "الهام‌بخش", "رهبر معنوی"],
    advice: "مأموریت زندگی خود را پیدا کنید و دیگران را راهنمایی کنید."
  }
];

export default function EnhancedAuraReading() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [auraReading, setAuraReading] = useState<{
    primaryColor: AuraColor;
    secondaryColor: AuraColor;
    energy: number;
    spiritualLevel: number;
    advice: string;
  } | null>(null);
  const [isReading, setIsReading] = useState(false);

  const generateAuraReading = () => {
    if (!name.trim()) {
      toast.error("لطفاً نام خود را وارد کنید");
      return;
    }

    setIsReading(true);

    setTimeout(() => {
      // Generate reading based on name and date
      const nameHash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const dateHash = birthDate ? new Date(birthDate).getTime() : Date.now();
      
      const primaryIndex = (nameHash + dateHash) % auraColors.length;
      let secondaryIndex = (nameHash * 2 + dateHash) % auraColors.length;
      
      // Ensure secondary is different from primary
      if (secondaryIndex === primaryIndex) {
        secondaryIndex = (secondaryIndex + 1) % auraColors.length;
      }

      const energy = 70 + (nameHash % 30);
      const spiritualLevel = 60 + ((nameHash + dateHash) % 40);

      const adviceTemplates = [
        "امروز روز مناسبی برای تمرکز بر انرژی درونی است.",
        "ارتباط با طبیعت به شما کمک خواهد کرد.",
        "به شهود خود اعتماد کنید و تصمیمات مهم بگیرید.",
        "زمان مناسبی برای شروع پروژه‌های جدید است.",
        "بر روی روابط شخصی خود کار کنید."
      ];

      setAuraReading({
        primaryColor: auraColors[primaryIndex],
        secondaryColor: auraColors[secondaryIndex],
        energy,
        spiritualLevel,
        advice: adviceTemplates[nameHash % adviceTemplates.length]
      });

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
          {/* Input form */}
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

          {/* Action buttons */}
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

          {/* Results */}
          {auraReading && (
            <div className="space-y-4 mt-6 p-4 bg-white/60 rounded-lg border border-purple-200">
              <h3 className="text-lg font-bold text-purple-800 flex items-center gap-2">
                <Eye size={20} />
                هاله‌ی {name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Primary color */}
                <div className="p-4 bg-white rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${auraReading.primaryColor.color}`}></div>
                    رنگ اصلی: {auraReading.primaryColor.name}
                  </h4>
                  <p className="text-sm text-purple-600 mb-2">{auraReading.primaryColor.meaning}</p>
                  <div className="space-y-1">
                    {auraReading.primaryColor.traits.map((trait, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Secondary color */}
                <div className="p-4 bg-white rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${auraReading.secondaryColor.color}`}></div>
                    رنگ فرعی: {auraReading.secondaryColor.name}
                  </h4>
                  <p className="text-sm text-purple-600">{auraReading.secondaryColor.meaning}</p>
                </div>
              </div>

              {/* Energy levels */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">⚡ سطح انرژی</h4>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${auraReading.energy}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-orange-700 mt-1">{auraReading.energy}%</p>
                </div>

                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">🧘 سطح معنویت</h4>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${auraReading.spiritualLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">{auraReading.spiritualLevel}%</p>
                </div>
              </div>

              {/* Advice */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">💡 راهنمایی امروز:</h4>
                <p className="text-purple-700 text-sm">{auraReading.advice}</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <h4 className="font-medium text-indigo-800 mb-2">🔮 توصیه اصلی:</h4>
                <p className="text-indigo-700 text-sm">{auraReading.primaryColor.advice}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
