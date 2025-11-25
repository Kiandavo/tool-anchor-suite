import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAstrologyQuiz, type QuizMode } from '@/hooks/useAstrologyQuiz';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, Award, Trophy, Target, BookOpen, Zap, RotateCcw, Share2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { QuizQuestion } from '@/data/quiz/quizQuestions';

const AstrologyQuiz = () => {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [category, setCategory] = useState<QuizQuestion['category'] | undefined>();
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const quiz = useAstrologyQuiz(mode || 'quick', category);

  const modeConfig = {
    quick: { icon: Zap, label: 'آزمون سریع', desc: '10 سوال • 5 دقیقه', color: 'text-yellow-600' },
    comprehensive: { icon: BookOpen, label: 'آزمون جامع', desc: '50 سوال • 30 دقیقه', color: 'text-blue-600' },
    timed: { icon: Clock, label: 'چالش زمان‌دار', desc: '20 سوال • 10 دقیقه', color: 'text-red-600' },
    practice: { icon: Target, label: 'تمرین', desc: '20 سوال • بدون محدودیت زمان', color: 'text-green-600' },
    category: { icon: Brain, label: 'دسته‌بندی خاص', desc: '15 سوال', color: 'text-purple-600' }
  };

  const categoryConfig = {
    zodiac: { label: 'بروج', icon: '♈' },
    planets: { label: 'سیارات', icon: '🪐' },
    houses: { label: 'خانه‌ها', icon: '🏠' },
    aspects: { label: 'اتصالات', icon: '🔗' },
    mixed: { label: 'ترکیبی', icon: '✨' }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    setTimeout(() => {
      quiz.submitAnswer(answerIndex);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }, 3000);
  };

  const handleShare = () => {
    if (!quiz.result) return;
    const text = `من در آزمون طالع‌بینی نمره ${quiz.result.score}/${quiz.result.totalQuestions} (${quiz.result.percentage}٪) گرفتم!\n${quiz.result.rank}\n\nشما هم امتحان کنید: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    toast.success('نتیجه آزمون کپی شد!');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mode Selection Screen
  if (!mode) {
    return (
      <Layout>
        <EnhancedSeoHead
          pageType="tool"
          title="آزمون جامع طالع‌بینی | تست دانش ستاره‌شناسی"
          description="دانش طالع‌بینی خود را با بیش از 200 سوال تخصصی بسنجید"
          keywords="آزمون طالع‌بینی, تست دانش ستاره‌شناسی, کوییز بروج"
        />
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              آزمون طالع‌بینی
            </h1>
            <p className="text-muted-foreground text-lg">
              دانش خود را در زمینه بروج، سیارات، خانه‌ها و اتصالات بسنجید
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.entries(modeConfig) as [QuizMode, typeof modeConfig[QuizMode]][]).map(([key, config]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary"
                  onClick={() => {
                    if (key === 'category') {
                      // Show category selection
                      return;
                    }
                    setMode(key);
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-4 rounded-full bg-primary/10 ${config.color}`}>
                        <config.icon className="w-8 h-8" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-xl">{config.label}</CardTitle>
                    <CardDescription className="text-center">{config.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // Quiz In Progress
  if (!quiz.isFinished && quiz.currentQuestion) {
    const isAnswered = selectedAnswer !== null;
    const isCorrect = selectedAnswer === quiz.currentQuestion.correctAnswer;

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">
                سوال {quiz.currentQuestionNumber} از {quiz.totalQuestions}
              </Badge>
              {quiz.timeRemaining !== undefined && (
                <Badge className={quiz.timeRemaining < 60 ? 'bg-red-600' : 'bg-primary'}>
                  <Clock className="w-3 h-3 ml-1" />
                  {formatTime(quiz.timeRemaining)}
                </Badge>
              )}
            </div>
            <Progress value={quiz.progress} className="h-2" />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={quiz.currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl leading-relaxed">
                      {quiz.currentQuestion.question}
                    </CardTitle>
                    <Badge variant="outline">
                      {categoryConfig[quiz.currentQuestion.category].icon}
                    </Badge>
                  </div>
                  <CardDescription>
                    سطح: {quiz.currentQuestion.difficulty === 'beginner' ? 'مبتدی' : 
                           quiz.currentQuestion.difficulty === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quiz.currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectAnswer = index === quiz.currentQuestion.correctAnswer;
                    
                    let buttonVariant: 'default' | 'outline' | 'secondary' = 'outline';
                    let buttonClass = '';
                    
                    if (isAnswered) {
                      if (isSelected) {
                        if (isCorrect) {
                          buttonClass = 'border-green-600 bg-green-50 text-green-900';
                        } else {
                          buttonClass = 'border-red-600 bg-red-50 text-red-900';
                        }
                      } else if (isCorrectAnswer) {
                        buttonClass = 'border-green-600 bg-green-50 text-green-900';
                      }
                    }

                    return (
                      <Button
                        key={index}
                        variant={buttonVariant}
                        className={`w-full justify-start text-right h-auto py-4 px-4 ${buttonClass}`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                      >
                        <span className="flex items-center gap-3 w-full">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(1632 + index + 1)}
                          </span>
                          <span className="flex-1 text-sm">{option}</span>
                          {isAnswered && isSelected && (
                            isCorrect ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </span>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className={isCorrect ? 'border-green-600' : 'border-red-600'}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {isCorrect ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        {isCorrect ? 'پاسخ صحیح!' : 'پاسخ نادرست'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">توضیح:</h4>
                        <p className="text-sm text-muted-foreground">{quiz.currentQuestion.explanation}</p>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm">توضیحات تکمیلی:</h4>
                        <p className="text-sm leading-relaxed">{quiz.currentQuestion.detailedExplanation}</p>
                      </div>
                      {quiz.currentQuestion.funFact && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                          <p className="text-sm">{quiz.currentQuestion.funFact}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Layout>
    );
  }

  // Results Screen
  if (quiz.isFinished && quiz.result) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
            <h1 className="text-4xl font-bold mb-2">{quiz.result.rank}</h1>
            <p className="text-2xl text-muted-foreground">
              نمره شما: {quiz.result.score}/{quiz.result.totalQuestions} ({quiz.result.percentage}٪)
            </p>
          </motion.div>

          {/* Score Breakdown */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>نتایج تفصیلی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(quiz.result.categoryScores).map(([cat, scores]) => {
                const percentage = Math.round((scores.correct / scores.total) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <span>{categoryConfig[cat as keyof typeof categoryConfig].icon}</span>
                        <span className="font-medium">{categoryConfig[cat as keyof typeof categoryConfig].label}</span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {scores.correct}/{scores.total} ({percentage}٪)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={quiz.resetQuiz} className="flex-1">
              <RotateCcw className="w-4 h-4 ml-2" />
              آزمون مجدد
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 ml-2" />
              اشتراک‌گذاری
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};

export default AstrologyQuiz;
