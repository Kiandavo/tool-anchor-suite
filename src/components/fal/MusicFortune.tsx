import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Music, Copy, RefreshCw, Play, Heart, Sparkles } from "lucide-react";
import { getRandomSong, PersianSong } from '@/data/persian-songs';
import { toast } from "sonner";
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';

interface MusicFortuneState {
  question: string;
  selectedSong: PersianSong | null;
  isLoading: boolean;
  hasSetQuestion: boolean;
  isAnimating: boolean;
}

export const MusicFortune = () => {
  const [state, setState] = useState<MusicFortuneState>({
    question: '',
    selectedSong: null,
    isLoading: false,
    hasSetQuestion: false,
    isAnimating: false
  });

  const handleQuestionSubmit = () => {
    if (!state.question.trim()) {
      toast.error('لطفاً سوال خود را وارد کنید');
      return;
    }

    setState(prev => ({ ...prev, hasSetQuestion: true }));
    getMusicFortune();
  };

  const getMusicFortune = () => {
    setState(prev => ({ ...prev, isLoading: true, isAnimating: true }));

    // Simulate loading time for better UX
    setTimeout(() => {
      const randomSong = getRandomSong();
      setState(prev => ({ 
        ...prev, 
        selectedSong: randomSong, 
        isLoading: false,
        isAnimating: false
      }));
    }, 2000);
  };

  const getNewFortune = () => {
    getMusicFortune();
  };

  const copyFortune = () => {
    if (!state.selectedSong) return;
    
    const fortuneText = `
🎵 فال موسیقی 🎵

سوال: ${state.question}

🎼 آهنگ انتخاب شده:
"${state.selectedSong.title}" - ${state.selectedSong.artist}

🎵 متن آهنگ:
${state.selectedSong.lyrics}

✨ معنا و مفهوم:
${state.selectedSong.meaning}

🔮 تعبیر برای شما:
${state.selectedSong.interpretation}

🎭 حال و هوا: ${state.selectedSong.emotionalTone}
🎨 سبک: ${state.selectedSong.genre}
📅 دوران: ${state.selectedSong.era}

---
فال موسیقی - ابزارهای فال و طالع‌بینی
`;

    navigator.clipboard.writeText(fortuneText).then(() => {
      toast.success('فال موسیقی کپی شد');
    }).catch(() => {
      toast.error('خطا در کپی کردن');
    });
  };

  const resetFortune = () => {
    setState({
      question: '',
      selectedSong: null,
      isLoading: false,
      hasSetQuestion: false,
      isAnimating: false
    });
  };

  const getToneColor = (tone: PersianSong['emotionalTone']) => {
    const colors = {
      happy: 'text-yellow-600',
      sad: 'text-blue-600', 
      romantic: 'text-pink-600',
      nostalgic: 'text-purple-600',
      philosophical: 'text-green-600',
      hopeful: 'text-orange-600'
    };
    return colors[tone] || 'text-gray-600';
  };

  const getToneEmoji = (tone: PersianSong['emotionalTone']) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      romantic: '💕',
      nostalgic: '🌙',
      philosophical: '🤔',
      hopeful: '✨'
    };
    return emojis[tone] || '🎵';
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-background via-background/90 to-muted/30 border-primary/20 shadow-lg overflow-hidden relative backdrop-blur-sm">
        {/* Musical background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 animate-bounce">🎵</div>
          <div className="absolute top-8 right-8 animate-pulse">🎶</div>
          <div className="absolute bottom-6 left-6 animate-bounce delay-300">🎼</div>
          <div className="absolute bottom-4 right-4 animate-pulse delay-700">🎤</div>
        </div>

        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-center pb-3 py-4 relative border-b border-primary/30">
          <div className="flex items-center justify-center">
            <Music className="text-primary-foreground mr-2" size={18} />
            <h2 className="text-base font-bold text-primary-foreground flex items-center">
              فال موسیقی
              <span className="mr-2 inline-block"><Sparkles size={14} className="text-primary-foreground animate-pulse" /></span>
            </h2>
          </div>
          <p className="text-primary-foreground/80 text-xs mt-1 font-medium">
            راهنمایی از آهنگ‌های محبوب ایرانی
          </p>
        </CardHeader>

        <CardContent className="pt-6 px-6 relative min-h-[400px]">
          {!state.hasSetQuestion ? (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Music className="mx-auto text-primary mb-3" size={48} />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  سوال خود را از موسیقی بپرسید
                </h3>
                <p className="text-sm text-muted-foreground">
                  سوالی که در دل دارید را بنویسید تا آهنگی انتخاب شود که پاسخ شما در آن نهفته است
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  سوال شما:
                </label>
                <Textarea
                  value={state.question}
                  onChange={(e) => setState(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="مثل: آیا باید این تصمیم را بگیرم؟ یا: چه راهی برای خوشبختی پیش روی من است؟"
                  className="min-h-[100px] text-right"
                  dir="rtl"
                />
                <Button 
                  onClick={handleQuestionSubmit}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!state.question.trim()}
                >
                  <Music className="ml-2" size={16} />
                  انتخاب آهنگ برای من
                </Button>
              </div>
            </div>
          ) : state.isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="relative mb-6">
                <div className="animate-spin-slow">
                  <Music size={48} className="text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm animate-pulse">در حال انتخاب آهنگ مناسب...</p>
              <p className="text-muted-foreground/70 text-xs mt-1">موسیقی راه روح است</p>
            </div>
          ) : state.selectedSong ? (
            <div className="space-y-6 animate-fade-in">
              {/* Song Header */}
              <div className="text-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {state.selectedSong.title}
                </h3>
                <p className="text-primary font-medium">{state.selectedSong.artist}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {state.selectedSong.era}
                  </span>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {state.selectedSong.genre}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${getToneColor(state.selectedSong.emotionalTone)}`}>
                    {getToneEmoji(state.selectedSong.emotionalTone)}
                  </span>
                </div>
              </div>

              {/* Your Question */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Sparkles className="ml-2" size={16} />
                  سوال شما:
                </h4>
                <p className="text-gray-700 text-sm">{state.question}</p>
              </div>

              {/* Song Lyrics */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Music className="ml-2" size={16} />
                  متن آهنگ:
                </h4>
                <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line text-center italic">
                  {state.selectedSong.lyrics}
                </div>
              </div>

              {/* Meaning */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Heart className="ml-2" size={16} />
                  معنا و مفهوم:
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {state.selectedSong.meaning}
                </p>
              </div>

              {/* Interpretation */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Sparkles className="ml-2" size={16} />
                  تعبیر برای شما:
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {state.selectedSong.interpretation}
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 pt-4 pb-4 bg-background/50 border-t border-border">
          {state.hasSetQuestion && (
            <>
              <Button 
                onClick={getNewFortune}
                disabled={state.isLoading}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9 px-6"
              >
                {state.isLoading ? (
                  <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                  <Music size={16} className="mr-2" />
                )}
                آهنگ جدید
              </Button>
              
              {state.selectedSong && (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={copyFortune}
                    className="border-primary/50 text-primary hover:bg-primary/5 text-sm h-9 px-4"
                  >
                    <Copy size={16} className="mr-2" />
                    کپی فال
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={resetFortune}
                    className="border-muted-foreground/30 text-muted-foreground hover:bg-muted text-sm h-9 px-4"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    سوال جدید
                  </Button>
                </>
              )}
            </>
          )}
        </CardFooter>
      </Card>

      {/* SEO Content */}
      <ToolSeoContent
        toolName="فال موسیقی"
        category="ابزارهای طالع‌بینی و فال"
        description="فال موسیقی یکی از روش‌های محبوب و سنتی فال‌گیری در فرهنگ ایرانی است که در آن با انتخاب تصادفی آهنگ‌های معروف، پاسخ سوالات زندگی از متن و مفهوم آهنگ استخراج می‌شود."
        benefits={[
          "دسترسی به بیش از ۳۰۰ آهنگ محبوب ایرانی",
          "تعبیر و تفسیر کامل هر آهنگ",
          "تحلیل روحیات و احساسات آهنگ",
          "راهنمایی شخصی‌سازی شده بر اساس سوال",
          "حفظ تاریخ و فرهنگ موسیقی ایران"
        ]}
        howToUse={[
          { step: 1, instruction: "سوال خود را به صورت واضح و مشخص بنویسید" },
          { step: 2, instruction: "روی دکمه 'انتخاب آهنگ برای من' کلیک کنید" }, 
          { step: 3, instruction: "آهنگ انتخاب شده و متن آن را مطالعه کنید" },
          { step: 4, instruction: "تعبیر و راهنمایی ارائه شده را بخوانید" },
          { step: 5, instruction: "در صورت نیاز آهنگ جدید درخواست کنید" }
        ]}
        faq={[
          {
            question: "فال موسیقی چگونه کار می‌کند؟",
            answer: "فال موسیقی بر اساس انتخاب تصادفی آهنگ‌های معروف ایرانی کار می‌کند. متن و مفهوم آهنگ انتخاب شده به عنوان پاسخ سوال شما تعبیر می‌شود."
          },
          {
            question: "آیا فال موسیقی دقیق است؟",
            answer: "فال موسیقی مانند سایر انواع فال، ابزاری برای تأمل و الهام است. دقت آن بستگی به تفسیر و کاربرد شخصی شما دارد."
          },
          {
            question: "چه نوع سوالاتی مناسب است؟",
            answer: "سوالات مربوط به تصمیم‌گیری، مسیر زندگی، روابط، کار و آینده مناسب هستند. سوالات باید واضح و مشخص باشند."
          }
        ]}
        relatedTools={[
          { name: "فال حافظ", slug: "hafez-fortune" },
          { name: "استخاره با مولانا", slug: "rumi-istikhara" },
          { name: "راهنمایی از شاهنامه", slug: "shahname-reading" },
          { name: "فال تاروت", slug: "tarot-reading" }
        ]}
      />
    </div>
  );
};