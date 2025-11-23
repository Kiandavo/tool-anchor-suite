import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Type } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

export type CalligraphyStyle = 'nastaliq' | 'shekasteh' | 'thuluth';

interface CalligraphyViewProps {
  text: string;
  style: CalligraphyStyle;
  onStyleChange: (style: CalligraphyStyle) => void;
}

const styles = [
  { id: 'nastaliq' as CalligraphyStyle, label: 'نستعلیق', font: 'font-vazir' },
  { id: 'shekasteh' as CalligraphyStyle, label: 'شکسته', font: 'font-vazir' },
  { id: 'thuluth' as CalligraphyStyle, label: 'ثلث', font: 'font-serif' },
];

export const CalligraphyView: React.FC<CalligraphyViewProps> = ({
  text,
  style,
  onStyleChange,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const calligraphyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentStyle = styles.find((s) => s.id === style) || styles[0];

  const handleExport = async () => {
    if (!calligraphyRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(calligraphyRef.current, {
        scale: 2,
        backgroundColor: '#f5f1e8',
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `hafez-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);

          toast({
            title: 'تصویر ذخیره شد',
            description: 'خوشنویسی به صورت تصویر ذخیره شد',
          });
        }
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'خطا',
        description: 'خطا در ذخیره تصویر',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Style Selector */}
      <div className="flex items-center justify-center gap-2">
        <Type className="w-4 h-4 text-[#5c3f14]" />
        <div className="flex gap-2">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => onStyleChange(s.id)}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                style === s.id
                  ? 'bg-[#5c3f14] text-white shadow-md'
                  : 'bg-white/60 text-[#5c3f14] border border-[#e6c8b0]/30 hover:border-[#5c3f14]/50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calligraphy Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-[#5c3f14]/20 shadow-2xl">
          <CardContent className="p-8">
            <div
              ref={calligraphyRef}
              className="relative"
              style={{
                background: 'linear-gradient(135deg, #f5f1e8 0%, #ede5d9 100%)',
                padding: '3rem',
                borderRadius: '1rem',
                border: '3px solid #5c3f14',
              }}
            >
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-600 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-600 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-600 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-600 rounded-br-lg"></div>

              {/* Poem Text */}
              <div
                className={`text-center ${currentStyle.font}`}
                dir="rtl"
                style={{
                  fontSize: '1.5rem',
                  lineHeight: '2.5rem',
                  color: '#5c3f14',
                  fontWeight: 'bold',
                }}
              >
                {text.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-4">
                    {line}
                  </p>
                ))}
              </div>

              {/* Attribution */}
              <div className="text-center mt-6 pt-4 border-t-2 border-amber-300">
                <p className="text-sm text-[#5c3f14]/70 font-vazir">دیوان حافظ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Export Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="bg-[#5c3f14] hover:bg-[#5c3f14]/90 text-white"
        >
          <Download className="w-4 h-4 ml-2" />
          {isExporting ? 'در حال ذخیره...' : 'ذخیره به عنوان تصویر'}
        </Button>
      </div>
    </div>
  );
};
