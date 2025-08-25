import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Copy, MessageCircle } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ 
  url = window.location.href,
  title = document.title,
  description,
  className 
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('لینک کپی شد!');
    } catch (error) {
      toast.error('خطا در کپی کردن لینک');
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="w-4 h-4 ml-2" />
          اشتراک‌گذاری
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 className="w-4 h-4 ml-2" />
            اشتراک‌گذاری...
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          <Twitter className="w-4 h-4 ml-2" />
          توییتر
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('facebook')}>
          <Facebook className="w-4 h-4 ml-2" />
          فیس‌بوک
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('linkedin')}>
          <Linkedin className="w-4 h-4 ml-2" />
          لینکدین
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('telegram')}>
          <MessageCircle className="w-4 h-4 ml-2" />
          تلگرام
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleCopyLink}>
          <Copy className="w-4 h-4 ml-2" />
          کپی لینک
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};