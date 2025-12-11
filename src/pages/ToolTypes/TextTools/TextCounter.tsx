import React, { useState, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Check, Clock, BookOpen, Type, Hash, AlignJustify, BarChart3 } from "lucide-react";
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#ec4899'];

export default function TextCounter() {
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    const sentences = text.trim() ? text.split(/[.!?؟]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const lines = text ? text.split('\n').length : 0;
    
    // Reading time (average 200 words per minute for Persian)
    const readingTimeMinutes = Math.ceil(words / 200);
    
    // Speaking time (average 130 words per minute)
    const speakingTimeMinutes = Math.ceil(words / 130);

    // Unique words
    const wordList = text.trim().toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const uniqueWords = new Set(wordList).size;

    // Average word length
    const avgWordLength = words > 0 ? Math.round((charactersNoSpaces / words) * 10) / 10 : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTimeMinutes,
      speakingTimeMinutes,
      uniqueWords,
      avgWordLength
    };
  }, [text]);

  // Word frequency analysis
  const wordFrequency = useMemo(() => {
    if (!text.trim()) return [];
    
    const wordList = text.trim().toLowerCase()
      .replace(/[.!?؟،,;:«»"'()\[\]{}]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 1);
    
    const frequency: Record<string, number> = {};
    wordList.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }, [text]);

  // Character type distribution
  const charDistribution = useMemo(() => {
    if (!text) return [];
    
    const persian = (text.match(/[\u0600-\u06FF]/g) || []).length;
    const english = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/[0-9۰-۹]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const other = text.length - persian - english - numbers - spaces;

    return [
      { name: 'فارسی', value: persian, color: COLORS[0] },
      { name: 'انگلیسی', value: english, color: COLORS[1] },
      { name: 'اعداد', value: numbers, color: COLORS[2] },
      { name: 'فاصله', value: spaces, color: COLORS[3] },
      { name: 'سایر', value: other, color: COLORS[4] }
    ].filter(item => item.value > 0);
  }, [text]);

  const handleReset = () => {
    setText('');
    toast.success('متن پاک شد');
  };

  const handleCopy = () => {
    const report = `
📊 گزارش تحلیل متن
━━━━━━━━━━━━━━━━━━
کاراکتر: ${stats.characters}
کاراکتر (بدون فاصله): ${stats.charactersNoSpaces}
کلمات: ${stats.words}
کلمات یکتا: ${stats.uniqueWords}
جملات: ${stats.sentences}
پاراگراف‌ها: ${stats.paragraphs}
خطوط: ${stats.lines}
میانگین طول کلمه: ${stats.avgWordLength}
زمان مطالعه: ${stats.readingTimeMinutes} دقیقه
زمان خوانش: ${stats.speakingTimeMinutes} دقیقه
    `.trim();
    
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('گزارش کپی شد');
  };

  const statItems = [
    { label: 'کاراکتر', value: stats.characters, icon: Type, color: 'from-amber-500 to-orange-500' },
    { label: 'کاراکتر (بدون فاصله)', value: stats.charactersNoSpaces, icon: Hash, color: 'from-blue-500 to-cyan-500' },
    { label: 'کلمه', value: stats.words, icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { label: 'جمله', value: stats.sentences, icon: AlignJustify, color: 'from-purple-500 to-pink-500' },
    { label: 'پاراگراف', value: stats.paragraphs, icon: FileText, color: 'from-red-500 to-rose-500' },
    { label: 'خط', value: stats.lines, icon: BarChart3, color: 'from-indigo-500 to-violet-500' }
  ];

  return (
    <CalculatorCard
      title="تحلیل‌گر متن پیشرفته"
      icon={FileText}
      onReset={handleReset}
    >
      <div className="space-y-6">
        {/* Text Input */}
        <div className="space-y-2">
          <Label htmlFor="text">متن خود را وارد کنید</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن خود را اینجا بنویسید یا پیست کنید..."
            className="min-h-[180px] text-base leading-relaxed resize-y"
          />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-br ${item.color} text-white`}
              >
                <div className="absolute top-2 left-2 opacity-20">
                  <Icon size={40} />
                </div>
                <div className="relative z-10">
                  <p className="text-3xl font-bold mb-1">
                    {formatPersianNumber(item.value)}
                  </p>
                  <p className="text-sm opacity-90">{item.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reading & Speaking Time */}
        {stats.words > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">زمان مطالعه</p>
                <p className="text-xl font-bold">{formatPersianNumber(stats.readingTimeMinutes)} دقیقه</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">زمان خوانش</p>
                <p className="text-xl font-bold">{formatPersianNumber(stats.speakingTimeMinutes)} دقیقه</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Visualizations */}
        {text.length > 0 && (
          <div className="space-y-4">
            {/* Character Distribution */}
            {charDistribution.length > 0 && (
              <VisualizationCard title="توزیع نوع کاراکترها">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={charDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {charDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [formatPersianNumber(value), 'تعداد']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {charDistribution.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}: {formatPersianNumber(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </VisualizationCard>
            )}

            {/* Word Frequency */}
            {wordFrequency.length > 0 && (
              <VisualizationCard title="پرتکرارترین کلمات">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={wordFrequency} layout="vertical">
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis 
                      type="category" 
                      dataKey="word" 
                      stroke="hsl(var(--muted-foreground))"
                      width={80}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value: number) => [formatPersianNumber(value), 'تکرار']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </VisualizationCard>
            )}

            {/* Additional Stats */}
            <VisualizationCard title="آمار تکمیلی">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">کلمات یکتا</p>
                  <p className="text-lg font-bold text-primary">{formatPersianNumber(stats.uniqueWords)}</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">میانگین طول کلمه</p>
                  <p className="text-lg font-bold text-blue-500">{formatPersianNumber(stats.avgWordLength)}</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">تنوع واژگانی</p>
                  <p className="text-lg font-bold text-green-500">
                    {stats.words > 0 ? formatPersianNumber(Math.round((stats.uniqueWords / stats.words) * 100)) : '۰'}٪
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">میانگین کلمه/جمله</p>
                  <p className="text-lg font-bold text-purple-500">
                    {stats.sentences > 0 ? formatPersianNumber(Math.round(stats.words / stats.sentences)) : '۰'}
                  </p>
                </div>
              </div>
            </VisualizationCard>

            {/* Copy Report Button */}
            <Button
              variant="outline"
              onClick={handleCopy}
              className="w-full"
            >
              {copied ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
              {copied ? 'گزارش کپی شد' : 'کپی گزارش کامل'}
            </Button>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
