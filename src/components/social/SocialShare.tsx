import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  description = '',
  className = '',
  size = 'md'
}) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text: description,
    url,
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareUrls = {
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('لینک کپی شد!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('خطا در کپی کردن لینک');
    }
  };

  const handleSocialShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const buttonSizes = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9', 
    lg: 'h-10 w-10'
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  // Check if native sharing is available
  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`${buttonSizes[size]} ${className}`}
          title="اشتراک‌گذاری"
        >
          <Share2 size={iconSizes[size]} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {hasNativeShare && (
          <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
            <Share2 className="ml-2 h-4 w-4" />
            اشتراک‌گذاری
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <Check className="ml-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="ml-2 h-4 w-4" />
          )}
          کپی لینک
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleSocialShare('telegram')} 
          className="cursor-pointer"
        >
          <Send className="ml-2 h-4 w-4 text-blue-500" />
          تلگرام
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleSocialShare('whatsapp')} 
          className="cursor-pointer"
        >
          <MessageCircle className="ml-2 h-4 w-4 text-green-600" />
          واتس‌اپ
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleSocialShare('twitter')} 
          className="cursor-pointer"
        >
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X (Twitter)
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleSocialShare('facebook')} 
          className="cursor-pointer"
        >
          <svg className="ml-2 h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          فیس‌بوک
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleSocialShare('linkedin')} 
          className="cursor-pointer"
        >
          <svg className="ml-2 h-4 w-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          لینکدین
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};