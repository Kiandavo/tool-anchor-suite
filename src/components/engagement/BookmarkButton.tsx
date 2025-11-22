import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  toolId: string;
  toolName: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  toolId,
  toolName,
  variant = 'outline',
  size = 'default',
  showLabel = true
}) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { toast } = useToast();
  const bookmarked = isBookmarked(toolId);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleBookmark(toolId, toolName);
    
    toast({
      title: bookmarked ? 'حذف از نشان‌شده‌ها' : 'افزودن به نشان‌شده‌ها',
      description: bookmarked 
        ? `${toolName} از نشان‌شده‌ها حذف شد`
        : `${toolName} به نشان‌شده‌ها اضافه شد`,
      duration: 2000
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBookmark}
      className={cn(
        'gap-2 transition-colors',
        bookmarked && 'text-primary border-primary bg-primary/10'
      )}
    >
      <Bookmark 
        className={cn(
          'w-4 h-4',
          bookmarked && 'fill-current'
        )} 
      />
      {showLabel && (bookmarked ? 'ذخیره شده' : 'ذخیره')}
    </Button>
  );
};
