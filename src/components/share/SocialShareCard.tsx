import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Copy, Check, Twitter, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface SocialShareCardProps {
  title: string;
  description?: string;
  result?: string;
  toolName: string;
  toolIcon?: string;
  className?: string;
}

export const SocialShareCard = ({ 
  title, 
  description, 
  result, 
  toolName,
  toolIcon,
  className 
}: SocialShareCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const shareUrl = window.location.href;
  const shareText = `${title}${result ? ` - ${result}` : ''} | ${toolName}`;

  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `${toolName}-result.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "تصویر ذخیره شد",
        description: "می‌توانید آن را به اشتراک بگذارید"
      });
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره تصویر پیش آمد",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "کپی شد",
        description: "لینک در کلیپ‌بورد ذخیره شد"
      });
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در کپی کردن پیش آمد",
        variant: "destructive"
      });
    }
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: toolName,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        // User cancelled or error
      }
    }
  };

  return (
    <div className={className}>
      {/* Share Card Preview */}
      <div 
        ref={cardRef}
        className="relative p-6 rounded-2xl overflow-hidden mb-4"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        }}
      >
        {/* Persian Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            {toolIcon && (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl">
                {toolIcon}
              </div>
            )}
            <div>
              <p className="text-amber-400 text-sm font-medium">{toolName}</p>
              <p className="text-white/60 text-xs">langar.co</p>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-white text-xl font-bold mb-2 font-display">
            {title}
          </h3>
          
          {/* Result */}
          {result && (
            <div className="bg-white/10 rounded-xl p-4 mb-3">
              <p className="text-amber-400 text-2xl font-bold text-center">
                {result}
              </p>
            </div>
          )}
          
          {/* Description */}
          {description && (
            <p className="text-white/70 text-sm">
              {description}
            </p>
          )}
          
          {/* Branding */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-white/40 text-xs">ابزارهای آنلاین لنگر</span>
            <div className="flex items-center gap-1">
              <span className="text-amber-500">⚓</span>
              <span className="text-white/60 text-xs">لنگر</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadAsImage}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium"
        >
          <Download size={16} />
          دانلود تصویر
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl text-sm font-medium transition-colors"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          کپی لینک
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToTwitter}
          className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] rounded-xl text-sm font-medium transition-colors"
        >
          <Twitter size={16} />
          توییتر
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToTelegram}
          className="flex items-center gap-2 px-4 py-2 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] rounded-xl text-sm font-medium transition-colors"
        >
          <Send size={16} />
          تلگرام
        </motion.button>
        
        {navigator.share && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nativeShare}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl text-sm font-medium transition-colors"
          >
            <Share2 size={16} />
            اشتراک‌گذاری
          </motion.button>
        )}
      </div>
    </div>
  );
};
