import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw } from 'lucide-react';

interface AnimatedCardRevealProps {
  cards: Array<{
    id: string;
    name: string;
    meaning: string;
    description: string;
    image?: string;
  }>;
  onRevealComplete?: (cards: any[]) => void;
  cardBackImage?: string;
  animationDuration?: number;
}

export const AnimatedCardReveal: React.FC<AnimatedCardRevealProps> = ({
  cards,
  onRevealComplete,
  cardBackImage,
  animationDuration = 0.5
}) => {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(
    new Array(cards.length).fill(false)
  );
  const [isRevealing, setIsRevealing] = useState(false);
  const [currentReveal, setCurrentReveal] = useState(-1);

  const revealCard = async (index: number) => {
    if (revealedCards[index] || isRevealing) return;

    setIsRevealing(true);
    setCurrentReveal(index);
    
    // Suspense animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newRevealed = [...revealedCards];
    newRevealed[index] = true;
    setRevealedCards(newRevealed);
    setCurrentReveal(-1);
    setIsRevealing(false);

    // Check if all cards are revealed
    if (newRevealed.every(Boolean)) {
      onRevealComplete?.(cards);
    }
  };

  const revealAll = async () => {
    setIsRevealing(true);
    
    for (let i = 0; i < cards.length; i++) {
      if (!revealedCards[i]) {
        setCurrentReveal(i);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setRevealedCards(prev => {
          const newRevealed = [...prev];
          newRevealed[i] = true;
          return newRevealed;
        });
      }
    }
    
    setCurrentReveal(-1);
    setIsRevealing(false);
    onRevealComplete?.(cards);
  };

  const resetCards = () => {
    setRevealedCards(new Array(cards.length).fill(false));
    setCurrentReveal(-1);
    setIsRevealing(false);
  };

  return (
    <div className="space-y-6">
      {/* Control Buttons */}
      <div className="flex justify-center gap-3">
        <Button 
          onClick={revealAll}
          disabled={isRevealing || revealedCards.every(Boolean)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Sparkles className="w-4 h-4 ml-2" />
          نمایش همه کارت‌ها
        </Button>
        
        <Button 
          onClick={resetCards}
          variant="outline"
          disabled={isRevealing}
        >
          <RotateCcw className="w-4 h-4 ml-2" />
          شروع مجدد
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3 justify-items-center">
        {cards.map((card, index) => (
          <div key={card.id} className="relative">
            <motion.div
              className="card-flip-container w-48 h-72 cursor-pointer"
              onClick={() => revealCard(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {!revealedCards[index] ? (
                  <motion.div
                    key="back"
                    className="card-face card-back absolute inset-0"
                    initial={{ rotateY: 0 }}
                    exit={{ rotateY: 180 }}
                    transition={{ duration: animationDuration }}
                  >
                    <Card className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 border-2 border-indigo-400 shadow-2xl">
                      <CardContent className="flex items-center justify-center h-full p-0">
                        <div className="text-center text-white">
                          {currentReveal === index ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-12 h-12 mx-auto mb-3" />
                            </motion.div>
                          ) : (
                            <>
                              <div className="text-6xl mb-4">🔮</div>
                              <div className="text-sm opacity-80">کلیک کنید</div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="front"
                    className="card-face card-front absolute inset-0"
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: animationDuration }}
                  >
                    <Card className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300 shadow-2xl overflow-hidden">
                      <CardContent className="p-4 h-full flex flex-col">
                        {/* Card Image */}
                        <div className="flex-1 flex items-center justify-center mb-3">
                          {card.image ? (
                            <img 
                              src={card.image} 
                              alt={card.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-6xl">🎴</div>
                          )}
                        </div>
                        
                        {/* Card Details */}
                        <div className="text-center space-y-2">
                          <h3 className="font-bold text-amber-800 text-lg">
                            {card.name}
                          </h3>
                          <p className="text-amber-700 font-medium text-sm">
                            {card.meaning}
                          </p>
                          <p className="text-gray-600 text-xs line-clamp-3">
                            {card.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Position Label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full border border-purple-300">
                کارت {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center">
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                revealedCards[index]
                  ? 'bg-green-500'
                  : currentReveal === index
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600 bg-purple-50 p-3 rounded-lg border border-purple-200">
        💡 روی هر کارت کلیک کنید تا آن را برگردانید، یا از دکمه "نمایش همه" استفاده کنید
      </div>
    </div>
  );
};