import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCrystalBall } from './crystalBall/useCrystalBall';
import { CrystalBallGraphics } from './crystalBall/CrystalBallGraphics';
import { VisionDisplay } from './crystalBall/VisionDisplay';
import { QuestionInput } from './crystalBall/QuestionInput';

export const CrystalBall = () => {
  const {
    question,
    vision,
    isLoading,
    isAnimating,
    showVision,
    handleQuestionChange,
    gazIntoFuture,
    copyVision,
    resetVision
  } = useCrystalBall();
  
  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-violet-50/90 to-purple-50/90 backdrop-blur-sm shadow-2xl border-purple-200/50 relative overflow-hidden">
      <div className="absolute inset-0">
        <CrystalBallGraphics isActive={showVision} />
      </div>
      
      <CardHeader className="text-center relative z-10">
        <CardTitle className="text-2xl font-bold text-purple-900 mb-2">
          🔮 گوی کریستالی
        </CardTitle>
        <p className="text-purple-700 text-sm">
          نگاهی به آینده از طریق گوی جادویی کریستال
        </p>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {!showVision ? (
          <QuestionInput 
            question={question}
            onChange={handleQuestionChange}
          />
        ) : (
          <VisionDisplay 
            vision={vision}
            isAnimating={isAnimating}
          />
        )}
      </CardContent>

      <CardFooter className="flex gap-3 justify-center relative z-10">
        {!showVision ? (
          <Button 
            onClick={gazIntoFuture}
            disabled={isLoading || !question.trim()}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? '🔮 در حال نگاه به آینده...' : '🔮 نگاه به آینده'}
          </Button>
        ) : (
          <>
            <Button 
              onClick={resetVision}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              سوال جدید
            </Button>
            <Button 
              onClick={copyVision}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-2 rounded-lg font-medium transition-all"
            >
              کپی نتیجه
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};