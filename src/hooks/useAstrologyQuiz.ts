import { useState, useEffect, useCallback } from 'react';
import { QUIZ_QUESTIONS, getRandomQuestions, type QuizQuestion } from '@/data/quiz/quizQuestions';

export interface QuizAnswer {
  questionId: string;
  userAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  categoryScores: Record<string, { correct: number; total: number }>;
  timeSpent: number;
  answers: QuizAnswer[];
  rank: string;
}

export type QuizMode = 'quick' | 'comprehensive' | 'timed' | 'practice' | 'category';

interface QuizConfig {
  questionCount: number;
  timeLimit?: number; // in seconds, undefined = no limit
  category?: QuizQuestion['category'];
}

const QUIZ_CONFIGS: Record<QuizMode, QuizConfig> = {
  quick: { questionCount: 10, timeLimit: 300 }, // 5 minutes
  comprehensive: { questionCount: 50, timeLimit: 1800 }, // 30 minutes
  timed: { questionCount: 20, timeLimit: 600 }, // 10 minutes
  practice: { questionCount: 20 }, // no time limit
  category: { questionCount: 15 }
};

const getRank = (percentage: number): string => {
  if (percentage >= 95) return 'استاد طالع‌بینی 🏆';
  if (percentage >= 85) return 'متخصص ستاره‌شناسی ⭐';
  if (percentage >= 75) return 'دانشجوی پیشرفته 📚';
  if (percentage >= 60) return 'یادگیرنده فعال 📖';
  if (percentage >= 50) return 'آغازگر 🌟';
  return 'نیاز به مطالعه بیشتر 📝';
};

export const useAstrologyQuiz = (mode: QuizMode, category?: QuizQuestion['category']) => {
  const config = { ...QUIZ_CONFIGS[mode], ...(category && { category }) };
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(config.timeLimit);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Initialize quiz
  useEffect(() => {
    const quizQuestions = config.category 
      ? getRandomQuestions(config.questionCount, config.category)
      : getRandomQuestions(config.questionCount);
    
    setQuestions(quizQuestions);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
  }, [config.category, config.questionCount]);

  // Timer countdown
  useEffect(() => {
    if (!config.timeLimit || isPaused || isFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === undefined) return undefined;
        if (prev <= 1) {
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.timeLimit, isPaused, isFinished]);

  const submitAnswer = useCallback((answerIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      userAnswer: answerIndex,
      isCorrect: answerIndex === currentQuestion.correctAnswer,
      timeSpent
    };

    setAnswers(prev => [...prev, answer]);
    setQuestionStartTime(Date.now());

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz([...answers, answer]);
    }
  }, [currentQuestionIndex, questions, answers, questionStartTime]);

  const finishQuiz = useCallback((finalAnswers?: QuizAnswer[]) => {
    const quizAnswers = finalAnswers || answers;
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    
    const correctAnswers = quizAnswers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    // Calculate category scores
    const categoryScores: Record<string, { correct: number; total: number }> = {};
    
    questions.forEach((question, index) => {
      const answer = quizAnswers[index];
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 };
      }
      categoryScores[question.category].total++;
      if (answer?.isCorrect) {
        categoryScores[question.category].correct++;
      }
    });

    const quizResult: QuizResult = {
      score: correctAnswers,
      totalQuestions: questions.length,
      percentage,
      categoryScores,
      timeSpent: totalTime,
      answers: quizAnswers,
      rank: getRank(percentage)
    };

    setResult(quizResult);
    setIsFinished(true);
  }, [answers, questions, startTime]);

  const pauseQuiz = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeQuiz = useCallback(() => {
    setIsPaused(false);
    setQuestionStartTime(Date.now());
  }, []);

  const resetQuiz = useCallback(() => {
    const quizQuestions = config.category 
      ? getRandomQuestions(config.questionCount, config.category)
      : getRandomQuestions(config.questionCount);
    
    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setTimeRemaining(config.timeLimit);
    setIsPaused(false);
    setIsFinished(false);
    setResult(null);
  }, [config.category, config.questionCount, config.timeLimit]);

  return {
    // Current state
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionNumber: currentQuestionIndex + 1,
    totalQuestions: questions.length,
    timeRemaining,
    isPaused,
    isFinished,
    result,
    
    // Actions
    submitAnswer,
    finishQuiz: () => finishQuiz(),
    pauseQuiz,
    resumeQuiz,
    resetQuiz,
    
    // Progress
    progress: ((currentQuestionIndex) / questions.length) * 100,
    answeredCount: answers.length
  };
};
