import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { History, Trash2, Calendar } from 'lucide-react';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { format } from 'date-fns';

interface ReadingHistoryPanelProps {
  readingType?: string;
}

export const ReadingHistoryPanel: React.FC<ReadingHistoryPanelProps> = ({
  readingType,
}) => {
  const { history, deleteReading, clearHistory, getReadingsByType } = useReadingHistory();
  const [isOpen, setIsOpen] = useState(false);

  const displayedHistory = readingType
    ? getReadingsByType(readingType)
    : history;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History size={16} />
          تاریخچه ({displayedHistory.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-right">تاریخچه فال‌ها</SheetTitle>
          <SheetDescription className="text-right">
            فال‌های قبلی شما در اینجا ذخیره شده است
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {displayedHistory.length > 0 && (
            <div className="flex justify-end">
              <Button
                variant="destructive"
                size="sm"
                onClick={clearHistory}
                className="gap-2"
              >
                <Trash2 size={16} />
                پاک کردن همه
              </Button>
            </div>
          )}

          <ScrollArea className="h-[calc(100vh-200px)]">
            <AnimatePresence>
              {displayedHistory.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <History size={48} className="mx-auto mb-4 opacity-20" />
                  <p>تاریخچه‌ای موجود نیست</p>
                </div>
              ) : (
                <div className="space-y-3 pr-4">
                  {displayedHistory.map((reading, index) => (
                    <motion.div
                      key={reading.timestamp.getTime()}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">
                            {reading.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {reading.content}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteReading(reading.timestamp)}
                          className="h-8 w-8"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        {format(reading.timestamp, 'yyyy/MM/dd HH:mm')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
