import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TutorialStep {
  target: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialSystemProps {
  steps: TutorialStep[];
  storageKey: string;
  onComplete?: () => void;
}

export const TutorialSystem: React.FC<TutorialSystemProps> = ({
  steps,
  storageKey,
  onComplete,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(storageKey);
    if (!hasSeenTutorial && steps.length > 0) {
      setTimeout(() => setIsActive(true), 500);
    }
  }, [storageKey, steps]);

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      updateTargetPosition();
    }
  }, [currentStep, isActive, steps]);

  const updateTargetPosition = () => {
    const target = document.querySelector(steps[currentStep].target);
    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem(storageKey, 'true');
    setIsActive(false);
    onComplete?.();
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, 'true');
    setIsActive(false);
  };

  if (!isActive || steps.length === 0) return null;

  const step = steps[currentStep];
  const position = step.position || 'bottom';

  const getTooltipPosition = () => {
    const spacing = 16;
    switch (position) {
      case 'top':
        return {
          top: targetPosition.top - spacing,
          left: targetPosition.left + targetPosition.width / 2,
          transform: 'translate(-50%, -100%)',
        };
      case 'bottom':
        return {
          top: targetPosition.top + targetPosition.height + spacing,
          left: targetPosition.left + targetPosition.width / 2,
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          top: targetPosition.top + targetPosition.height / 2,
          left: targetPosition.left - spacing,
          transform: 'translate(-100%, -50%)',
        };
      case 'right':
        return {
          top: targetPosition.top + targetPosition.height / 2,
          left: targetPosition.left + targetPosition.width + spacing,
          transform: 'translateY(-50%)',
        };
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={handleSkip}
          />

          {/* Highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed z-[9999] pointer-events-none"
            style={{
              top: targetPosition.top - 4,
              left: targetPosition.left - 4,
              width: targetPosition.width + 8,
              height: targetPosition.height + 8,
              border: '3px solid hsl(var(--primary))',
              borderRadius: '8px',
              boxShadow: '0 0 0 4px hsla(var(--primary), 0.2)',
            }}
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-[10000] bg-card border border-border rounded-lg shadow-2xl p-4 max-w-sm"
            style={getTooltipPosition()}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" size={16} />
                <h3 className="font-semibold text-sm">{step.title}</h3>
              </div>
              <button
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {step.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {currentStep + 1} از {steps.length}
              </div>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePrevious}
                    className="h-8"
                  >
                    <ChevronRight size={16} />
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="h-8"
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      بعدی
                      <ChevronLeft size={16} />
                    </>
                  ) : (
                    'تمام'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
