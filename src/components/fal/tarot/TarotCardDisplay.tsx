
import React from 'react';
import { TarotCard } from './TarotCard';
import { type TarotCardType, type TarotReadingConfig } from './types';
import { motion } from 'framer-motion';
import { generatePersonalizedInterpretation, generateYesNoInterpretation, generateTimelinePrediction } from './enhancedInterpretations';

interface TarotCardDisplayProps {
  selectedCards: TarotCardType[] | null;
  isRevealed: boolean;
  isAnimating: boolean;
  readingType: TarotReadingConfig;
  reversedCards: boolean[];
  userQuestion?: string;
  questionnaireAnswers?: Record<string, string>;
}

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  selectedCards,
  isRevealed,
  isAnimating,
  readingType,
  reversedCards,
  userQuestion,
  questionnaireAnswers
}) => {
  // Show placeholders if no cards selected
  if (!selectedCards || selectedCards.length === 0) {
    return (
      <div className="mb-6">
        <div className={`grid gap-4 justify-items-center ${
          readingType.cardCount === 1 ? 'grid-cols-1' : 
          readingType.cardCount === 3 ? 'grid-cols-3' : 
          readingType.cardCount === 4 ? 'grid-cols-2 sm:grid-cols-4' : 
          'grid-cols-3 sm:grid-cols-5'
        }`}>
          {Array.from({ length: readingType.cardCount }).map((_, index) => (
            <div key={index} className="card-placeholder">
              <div className="aspect-[2/3] w-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center">
                <span className="text-xs text-purple-600 font-medium">
                  {readingType.positions[index]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render selected cards and interpretations
  return (
    <div className="space-y-6">
      {/* Cards Display */}
      <div className={`grid gap-4 justify-items-center ${
        readingType.cardCount === 1 ? 'grid-cols-1' : 
        readingType.cardCount === 3 ? 'grid-cols-3' : 
        readingType.cardCount === 4 ? 'grid-cols-2 sm:grid-cols-4' : 
        'grid-cols-3 sm:grid-cols-5'
      }`}>
        {selectedCards.map((card, index) => (
          <motion.div
            key={`${card.name}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="text-center"
          >
            <TarotCard 
              card={card} 
              isRevealed={isRevealed}
              isReversed={reversedCards[index]}
              position={readingType.positions[index]}
            />
          </motion.div>
        ))}
      </div>

      {/* Enhanced Interpretations */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Individual Card Interpretations */}
          {selectedCards.map((card, index) => {
            const isReversed = reversedCards[index];
            const position = readingType.positions[index];
            
            // Generate personalized interpretation
            const personalizedInterpretation = generatePersonalizedInterpretation(card, {
              readingType: readingType.id,
              userInputs: questionnaireAnswers,
              cardPosition: position,
              isReversed,
              timeContext: readingType.hasTimeline ? position : undefined
            });
            
            return (
              <div key={`interpretation-${index}`} className="bg-white/40 p-4 rounded-lg border border-purple-200/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-purple-700" />
                  </div>
                  <h4 className="font-semibold text-purple-900">
                    {position}: {card.name} {isReversed ? '(معکوس)' : ''}
                  </h4>
                </div>
                <p className="text-purple-800 text-sm leading-relaxed">
                  {personalizedInterpretation}
                </p>
                
                {/* Timeline prediction for timeline readings */}
                {readingType.hasTimeline && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-700 font-medium mb-1">پیش‌بینی زمانی:</p>
                    <p className="text-xs text-purple-600">
                      {generateTimelinePrediction(card, position, isReversed)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Special interpretations based on reading type */}
          {readingType.id === 'yes-no' && selectedCards.length > 0 && (
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-200">
              {(() => {
                const result = generateYesNoInterpretation(
                  selectedCards[0], 
                  reversedCards[0], 
                  userQuestion || questionnaireAnswers?.question_text || '',
                  questionnaireAnswers?.time_frame || 'نامشخص'
                );
                return (
                  <>
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold text-purple-900 mb-1">پاسخ: {result.answer}</h3>
                      <div className="text-2xl font-bold text-purple-700">{result.probability}%</div>
                      <div className="text-xs text-purple-600">احتمال</div>
                    </div>
                    <p className="text-sm text-purple-800 leading-relaxed">{result.explanation}</p>
                  </>
                );
              })()}
            </div>
          )}

          {/* Reading-specific general interpretation */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              تفسیر کلی {readingType.name}
            </h3>
            {(() => {
              switch (readingType.id) {
                case 'three-card':
                  return (
                    <p className="text-sm text-purple-800 leading-relaxed">
                      کارت‌های شما نشان می‌دهند که تجربیات گذشته‌تان پایه‌ای قوی برای حال ایجاد کرده و آینده‌ای روشن در انتظارتان است. 
                      {questionnaireAnswers?.main_concern && ` با توجه به نگرانی اصلی‌تان در مورد ${questionnaireAnswers.main_concern}, راه‌حل در تعادل میان درس‌های گذشته و امکانات آینده نهفته است.`}
                    </p>
                  );
                case 'detailed-future':
                  return (
                    <p className="text-sm text-purple-800 leading-relaxed">
                      آینده شما مرحله به مرحله شکل می‌گیرد. هر کارت دوره‌ای از زندگی‌تان را نشان می‌دهد که با آمادگی و هوشیاری می‌توانید بهترین نتایج را کسب کنید.
                      {questionnaireAnswers?.life_area && ` در حوزه ${questionnaireAnswers.life_area}, تغییرات مثبتی در راه است.`}
                    </p>
                  );
                case 'love-timeline':
                  return (
                    <p className="text-sm text-purple-800 leading-relaxed">
                      مسیر عاطفی شما رو به تکامل است. هر مرحله فرصتی برای عمیق‌تر شدن روابط و شناخت بهتر خودتان محسوب می‌شود.
                      {questionnaireAnswers?.relationship_status && ` با توجه به وضعیت فعلی رابطه‌تان، زمان مناسبی برای رشد و تحول در پیش است.`}
                    </p>
                  );
                default:
                  return (
                    <p className="text-sm text-purple-800 leading-relaxed">
                      کارت‌های انتخابی شما پیامی منسجم دارند: زمان آن رسیده که با اعتماد به نفس و اتکا به شهود درونی‌تان، 
                      مسیر جدیدی را در پیش بگیرید. هر کارت بخشی از پازل بزرگ زندگی‌تان است.
                    </p>
                  );
              }
            })()}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  selectedCards,
  isRevealed,
  isAnimating,
  readingType,
  reversedCards
}) => {
  // If no cards are selected yet, show placeholder slots based on reading type
  if (!selectedCards || selectedCards.length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-4 py-4">
        {readingType.positions.map((position, index) => (
          <div key={index} className="tarot-card-container">
            <div className="text-center text-[#143a5c]/70 text-xs mb-2">{position}</div>
            <div className="h-[200px] w-[120px] sm:h-[220px] sm:w-[140px] bg-white/50 border-2 border-dashed border-[#b0c8e6] rounded-lg flex items-center justify-center">
              <div className="text-[#143a5c]/30 text-sm">کارت تاروت</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show the selected cards
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`tarot-card-grid grid-cols-${Math.min(selectedCards.length, 3)}`}>
        {selectedCards.map((card, index) => {
          const isReversed = reversedCards[index];
          const position = readingType.positions[index] || `کارت ${index + 1}`;
          
          return (
            <div key={index} className="tarot-card-container">
              <div className="text-center text-[#143a5c] text-xs mb-2 font-medium">{position}</div>
              <TarotCard 
                card={card} 
                isRevealed={isRevealed} 
                isAnimating={isAnimating}
                index={index}
                isReversed={isReversed}
              />
            </div>
          );
        })}
      </div>

      {isRevealed && (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b0c8e6] to-[#b0c8e6]/20 w-full"></div>
          
          <div className="bg-white/40 p-4 rounded-lg border border-[#b0c8e6]/30 shadow-md">
            <h3 className="text-[#143a5c] text-sm font-medium mb-3 flex items-center">
              <span className="bg-[#b0c8e6] text-white text-xs px-2 py-0.5 rounded-full ml-2">تفسیر کلی</span> 
              خوانش کارت‌های شما
            </h3>
            
            <div className="space-y-3 text-xs text-[#143a5c]/90 leading-6">
              {selectedCards.map((card, index) => {
                const position = readingType.positions[index] || `کارت ${index + 1}`;
                const isReversed = reversedCards[index];
                const interpretation = isReversed ? card.reversedMeaning || card.meaning : card.meaning;
                
                return (
                  <p key={index} className="pb-2 border-b border-[#b0c8e6]/20 last:border-0">
                    <span className="font-bold">{position} ({card.name}{isReversed ? ' - معکوس' : ''}):</span> {interpretation}
                  </p>
                );
              })}
              
              {readingType.id === 'three-card' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  این سه کارت در کنار هم نشان‌دهنده مسیری هستند که از گذشته آغاز شده،
                  در زمان حال ادامه دارد و به سمت آینده‌ای که می‌تواند با آگاهی شما تغییر کند، در حرکت است.
                </p>
              )}
              
              {readingType.id === 'relationship' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  این سه کارت نشان‌دهنده انرژی‌های بین شما و فرد مورد نظرتان هستند و راهنمایی برای درک بهتر این رابطه ارائه می‌دهند.
                </p>
              )}
              
              {readingType.id === 'career' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  این کارت‌ها به شما کمک می‌کنند تا مسیر شغلی خود را بهتر درک کنید و فرصت‌های پیش رو را ببینید.
                </p>
              )}
              
              {readingType.id === 'yes-no' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  {selectedCards[0].name === "خورشید" || selectedCards[0].name === "جهان" ? 
                    "پاسخ به سؤال شما مثبت است." : 
                    selectedCards[0].name === "برج" || selectedCards[0].name === "مرگ" ? 
                    "پاسخ به سؤال شما منفی است." : 
                    "پاسخ به سؤال شما مشخص نیست و به عوامل مختلفی بستگی دارد."}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Styling for the grid layout */}
      <style>
        {`
        .tarot-card-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .tarot-card-grid {
            gap: 2rem;
          }
        }
        
        .tarot-card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        `}
      </style>
    </motion.div>
  );
};
