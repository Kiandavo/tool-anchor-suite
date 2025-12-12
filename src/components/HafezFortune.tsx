import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RefreshCw, Copy, BookOpen, Sparkles, CircleHelp } from "lucide-react";
import { useHafezReading } from '@/hooks/useHafezReading';
import { copyToClipboard } from '@/utils/randomUtils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const HafezFortune = () => {
  const {
    poem,
    intention,
    isLoading,
    setIntention,
    getRandomPoem,
    resetReading,
  } = useHafezReading();

  const { toast } = useToast();

  const copyFortune = () => {
    if (!poem) return;
    const fullText = `فال حافظ\n\n${poem.title}\n\n${poem.text}\n\nتفسیر: ${poem.interpretation}`;
    copyToClipboard(fullText);
    toast({ title: 'کپی شد', description: 'فال حافظ کپی شد' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center border-b border-border/50 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">فال حافظ</span>
          </div>
          <p className="text-sm text-muted-foreground">
            نیت کنید و فال بگیرید
          </p>
          
          {/* Guide Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="absolute top-4 left-4 p-2 h-8 w-8 rounded-full">
                <CircleHelp size={16} className="text-muted-foreground" />
                <span className="sr-only">راهنما</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl text-right">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  راهنمای فال حافظ
                </DialogTitle>
                <DialogDescription>
                  آشنایی با تاریخچه و روش استخاره با دیوان حافظ
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">تاریخچه فال حافظ</h3>
                  <p className="text-sm text-muted-foreground leading-6">
                    خواجه شمس‌الدین محمد حافظ شیرازی از بزرگترین شاعران غزل‌سرای ایران است. 
                    استفاده از دیوان حافظ برای تفال سنتی کهن در فرهنگ ایرانی است.
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">نحوه استفاده</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>نیت خود را در ذهن یا نوشتاری مشخص کنید</li>
                    <li>روی دکمه "فال بگیر" کلیک کنید</li>
                    <li>غزل و تفسیر آن را با دقت بخوانید</li>
                  </ol>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <CardContent className="p-6 space-y-6">
          {/* Simple Intention Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              نیت خود را بنویسید (اختیاری)
            </label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="سوال یا نیت خود را اینجا بنویسید..."
              className="w-full p-4 rounded-xl border border-border/50 bg-background/50 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              rows={2}
            />
          </div>

          {/* Get Fortune Button */}
          {!poem && (
            <Button 
              onClick={getRandomPoem} 
              disabled={isLoading}
              className="w-full py-6 text-base font-medium rounded-xl bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin ml-2" />
              ) : (
                <Sparkles className="w-5 h-5 ml-2" />
              )}
              {isLoading ? 'در حال گرفتن فال...' : 'فال بگیر'}
            </Button>
          )}

          {/* Poem Display */}
          {poem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Poem Title */}
              <div className="text-center">
                <h3 className="text-lg font-heading font-semibold text-primary">
                  {poem.title}
                </h3>
              </div>

              {/* Poem Text */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <p className="text-base leading-loose text-foreground whitespace-pre-line text-center font-body">
                  {poem.text}
                </p>
              </div>

              {/* Interpretation */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  تفسیر
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {poem.interpretation}
                </p>
              </div>

              {/* Keywords */}
              {poem.keywords && poem.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {poem.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Advice */}
              {poem.advice && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    💡 {poem.advice}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
        
        {/* Footer Actions */}
        {poem && (
          <CardFooter className="p-4 border-t border-border/50 flex justify-center gap-3">
            <Button 
              onClick={getRandomPoem} 
              disabled={isLoading}
              size="sm"
              className="rounded-full"
            >
              <RefreshCw className={`w-4 h-4 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
              غزل جدید
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={copyFortune}
              className="rounded-full"
            >
              <Copy className="w-4 h-4 ml-2" />
              کپی
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={resetReading}
              className="rounded-full text-muted-foreground"
            >
              شروع مجدد
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
