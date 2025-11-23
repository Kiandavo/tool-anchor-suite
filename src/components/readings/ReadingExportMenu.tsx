import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Download,
  Image,
  FileText,
  Share2,
  Volume2,
  VolumeX,
  Pause,
  Play,
} from 'lucide-react';
import { useReadingExport, ReadingData } from '@/hooks/useReadingExport';
import { useAudioNarration } from '@/hooks/useAudioNarration';

interface ReadingExportMenuProps {
  elementId: string;
  readingData: ReadingData;
  narrationText?: string;
}

export const ReadingExportMenu: React.FC<ReadingExportMenuProps> = ({
  elementId,
  readingData,
  narrationText,
}) => {
  const { exportToPDF, exportToImage, shareReading, isExporting } = useReadingExport();
  const { speak, pause, resume, stop, isPlaying, isPaused, isSupported } = useAudioNarration();

  const handleAudioToggle = () => {
    if (!narrationText) return;
    
    if (isPlaying) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(narrationText);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Audio Narration Button */}
      {narrationText && isSupported && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleAudioToggle}
          className="gap-2"
        >
          {isPlaying ? (
            isPaused ? (
              <>
                <Play size={16} />
                ادامه
              </>
            ) : (
              <>
                <Pause size={16} />
                توقف
              </>
            )
          ) : (
            <>
              <Volume2 size={16} />
              خواندن
            </>
          )}
        </Button>
      )}

      {isPlaying && (
        <Button
          size="sm"
          variant="ghost"
          onClick={stop}
        >
          <VolumeX size={16} />
        </Button>
      )}

      {/* Export Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            disabled={isExporting}
            className="gap-2"
          >
            <Download size={16} />
            خروجی
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => exportToPDF(elementId, readingData)}
            disabled={isExporting}
          >
            <FileText size={16} className="ml-2" />
            ذخیره به عنوان PDF
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => exportToImage(elementId, readingData)}
            disabled={isExporting}
          >
            <Image size={16} className="ml-2" />
            ذخیره به عنوان تصویر
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => shareReading(readingData)}
          >
            <Share2 size={16} className="ml-2" />
            اشتراک‌گذاری
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
