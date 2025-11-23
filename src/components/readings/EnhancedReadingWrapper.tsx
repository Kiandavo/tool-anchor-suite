import React, { useEffect } from 'react';
import { ReadingExportMenu } from './ReadingExportMenu';
import { ReadingHistoryPanel } from './ReadingHistoryPanel';
import { TutorialSystem, TutorialStep } from './TutorialSystem';
import { MysticalLoading } from './MysticalLoading';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { ReadingData } from '@/hooks/useReadingExport';

interface EnhancedReadingWrapperProps {
  children: React.ReactNode;
  readingType: string;
  readingData?: ReadingData;
  narrationText?: string;
  elementId: string;
  tutorialSteps?: TutorialStep[];
  isLoading?: boolean;
  loadingType?: 'stars' | 'moon' | 'crystals' | 'cards' | 'cosmic';
  showHistory?: boolean;
  showExport?: boolean;
}

export const EnhancedReadingWrapper: React.FC<EnhancedReadingWrapperProps> = ({
  children,
  readingType,
  readingData,
  narrationText,
  elementId,
  tutorialSteps = [],
  isLoading = false,
  loadingType = 'cosmic',
  showHistory = true,
  showExport = true,
}) => {
  const { saveReading } = useReadingHistory();

  useEffect(() => {
    if (readingData && readingData.content) {
      saveReading(readingData);
    }
  }, [readingData?.content]);

  return (
    <>
      {tutorialSteps.length > 0 && (
        <TutorialSystem
          steps={tutorialSteps}
          storageKey={`tutorial_${readingType}`}
        />
      )}

      <div className="space-y-4">
        {showHistory || showExport ? (
          <div className="flex items-center justify-end gap-2">
            {showHistory && <ReadingHistoryPanel readingType={readingType} />}
            {showExport && readingData && (
              <ReadingExportMenu
                elementId={elementId}
                readingData={readingData}
                narrationText={narrationText}
              />
            )}
          </div>
        ) : null}

        {isLoading ? (
          <MysticalLoading type={loadingType} />
        ) : (
          <div id={elementId}>{children}</div>
        )}
      </div>
    </>
  );
};
