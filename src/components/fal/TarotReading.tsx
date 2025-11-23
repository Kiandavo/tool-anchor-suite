import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Sparkles, BookOpen } from "lucide-react";
import { motion } from 'framer-motion';

import { useTarotReading } from './tarot/useTarotReading';
import { TarotGuide } from './tarot/TarotGuide';
import { TarotQuestionnaire } from './tarot/TarotQuestionnaire';
import { TarotTimeline } from './tarot/TarotTimeline';
import { TarotCardDisplay } from './tarot/TarotCardDisplay';
import { TarotControls } from './tarot/TarotControls';
import { TarotAnimation } from './tarot/TarotAnimation';
import { CosmicStarField, MysticalSymbols } from './graphics/TarotGraphics';
import { EnhancedReadingWrapper } from '@/components/readings/EnhancedReadingWrapper';
import { TutorialStep } from '@/components/readings/TutorialSystem';

export const TarotReading = () => {
  const {
    selectedCards,
    isAnimating,
    isRevealed,
    readingType,
    allowReversedCards,
    reversedCards,
    userQuestion,
    questionnaireAnswers,
    drawCards,
    revealMeaning,
    copyReading,
    handleReadingTypeChange,
    toggleReversedCards,
    handleQuestionChange,
    handleQuestionnaireAnswerChange
  } = useTarotReading();

  // Generate reading data for export
  const readingData = selectedCards && selectedCards.length > 0 && isRevealed ? {
    title: `فال تاروت - ${readingType.name}`,
    content: `${userQuestion ? `سوال: ${userQuestion}\n\n` : ''}${selectedCards.map((card, idx) => 
      `${readingType.positions[idx]}: ${card.name}\n${card.meaning}`
    ).join('\n\n')}`,
    timestamp: new Date(),
    type: 'tarot',
    metadata: { readingType: readingType.name, cardCount: selectedCards.length }
  } : undefined;

  // Generate narration text
  const narrationText = selectedCards && selectedCards.length > 0 && isRevealed ? `
    فال تاروت ${readingType.name}.
    ${userQuestion ? `سوال شما: ${userQuestion}.` : ''}
    ${selectedCards.map((card, idx) => 
      `${readingType.positions[idx]}: ${card.name}. ${card.meaning.slice(0, 100)}`
    ).join('. ')}
  ` : undefined;

  // Tutorial steps
  const tutorialSteps: TutorialStep[] = [
    {
      target: '.tarot-questionnaire',
      title: 'پاسخ به سوالات',
      description: 'برای دریافت تفسیر دقیق‌تر، به سوالات پاسخ دهید',
      position: 'bottom'
    },
    {
      target: '.fortune-button-primary',
      title: 'کشیدن کارت‌ها',
      description: 'روی این دکمه کلیک کنید تا کارت‌های تاروت کشیده شوند',
      position: 'top'
    },
  ];

  return (
    <EnhancedReadingWrapper
      readingType="tarot"
      readingData={readingData}
      narrationText={narrationText}
      elementId="tarot-reading-content"
      tutorialSteps={tutorialSteps}
      isLoading={isAnimating && (!selectedCards || selectedCards.length === 0)}
      loadingType="cards"
    >
      <Card className="fortune-card-enhanced fortune-card-tarot">
        {/* Enhanced cosmic graphics */}
        <CosmicStarField />
        <MysticalSymbols isVisible={selectedCards.length > 0} />
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 60, 
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23143a5c' fill-opacity='0.4'%3E%3Cpath d='M50 50a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-30a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm-30 0a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm60 30a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM20 50a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm60-30a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM20 20a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm60 60a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM20 80a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '400px 400px',
            }} />
            
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#143a5c]/5 to-[#b0c8e6]/10 -translate-x-1/2 -translate-y-1/2 cosmic-spin"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, ease: "linear", repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        <CardHeader className="fortune-header fortune-header-tarot text-center pb-2 py-2 relative">
          <div className="flex items-center justify-center">
            <BookOpen className="text-indigo-800 ml-2" size={16} />
            <h2 className="text-sm font-bold text-indigo-800 flex items-center">
              فال تاروت
              <span className="mr-1.5 inline-block">
                <Sparkles size={12} className="text-indigo-800" />
              </span>
            </h2>
          </div>
          
          <TarotGuide />
        </CardHeader>
        
        <CardContent className="pt-4 px-3 sm:px-4 relative" id="tarot-reading-content">
          <div className="space-y-4">
            <motion.p 
              className="text-center text-[#143a5c] text-xs font-medium bg-white p-3 rounded-md border border-[#b0c8e6]/30 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {readingType.description}
            </motion.p>
            
            <div className="tarot-questionnaire">
              <TarotQuestionnaire
                readingType={readingType}
                answers={questionnaireAnswers}
                onAnswerChange={handleQuestionnaireAnswerChange}
              />
            </div>
            
            {readingType.hasTimeline && isRevealed && (
              <TarotTimeline
                selectedCards={selectedCards}
                readingType={readingType}
                reversedCards={reversedCards}
                answers={questionnaireAnswers}
              />
            )}
            
            <TarotCardDisplay 
              selectedCards={selectedCards} 
              isRevealed={isRevealed}
              isAnimating={isAnimating}
              readingType={readingType}
              reversedCards={reversedCards}
              userQuestion={userQuestion}
              questionnaireAnswers={questionnaireAnswers}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col justify-center gap-2 pt-3 pb-4 bg-white border-t border-[#b0c8e6]/20">
          <TarotControls 
            selectedCards={selectedCards}
            isAnimating={isAnimating}
            isRevealed={isRevealed}
            onDrawCards={drawCards}
            onRevealMeaning={revealMeaning}
            onCopyReading={copyReading}
            readingType={readingType}
            onReadingTypeChange={handleReadingTypeChange}
            allowReversedCards={allowReversedCards}
            onToggleReversedCards={toggleReversedCards}
            userQuestion={userQuestion}
            onQuestionChange={handleQuestionChange}
          />
        </CardFooter>
        
        <TarotAnimation />
      </Card>
    </EnhancedReadingWrapper>
  );
};
