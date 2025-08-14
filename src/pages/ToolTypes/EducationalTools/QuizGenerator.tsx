import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, Plus, Trash2, Play, CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  title: string;
  subject: string;
  questions: Question[];
}

const QuizGenerator = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    subject: "",
    questions: []
  });
  
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const subjects = [
    "ریاضی",
    "علوم",
    "ادبیات فارسی",
    "تاریخ",
    "جغرافیا",
    "زبان انگلیسی",
    "فیزیک",
    "شیمی",
    "زیست‌شناسی",
    "عمومی"
  ];

  const sampleQuizzes = [
    {
      title: "آزمون ریاضی پایه",
      subject: "ریاضی",
      questions: [
        {
          id: "1",
          question: "حاصل ۵ × ۷ چند است؟",
          options: ["۳۰", "۳۵", "۴۰", "۴۵"],
          correctAnswer: 1
        },
        {
          id: "2", 
          question: "کدام عدد اول است؟",
          options: ["۴", "۶", "۷", "۹"],
          correctAnswer: 2
        }
      ]
    },
    {
      title: "آزمون ادبیات",
      subject: "ادبیات فارسی",
      questions: [
        {
          id: "1",
          question: "سراینده شاهنامه کیست؟",
          options: ["حافظ", "فردوسی", "سعدی", "مولوی"],
          correctAnswer: 1
        },
        {
          id: "2",
          question: "کدام یک از آرایه‌های ادبی است؟",
          options: ["تشبیه", "فاعل", "مفعول", "حرف اضافه"],
          correctAnswer: 0
        }
      ]
    }
  ];

  const addQuestion = () => {
    if (!currentQuestion.question.trim() || currentQuestion.options.some(opt => !opt.trim())) {
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion.question,
      options: [...currentQuestion.options],
      correctAnswer: currentQuestion.correctAnswer
    };

    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    });
  };

  const removeQuestion = (questionId: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const loadSampleQuiz = (sampleQuiz: any) => {
    setQuiz(sampleQuiz);
    setIsPlaying(false);
  };

  const startQuiz = () => {
    setIsPlaying(true);
    setCurrentQuizIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === quiz.questions[currentQuizIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuizIndex < quiz.questions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-5 h-5 text-primary" />
            سازنده آزمون
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isPlaying ? (
            <div className="space-y-6">
              {/* Quiz Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">عنوان آزمون</label>
                  <Input
                    placeholder="مثال: آزمون ریاضی فصل اول"
                    value={quiz.title}
                    onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">موضوع</label>
                  <Select value={quiz.subject} onValueChange={(value) => setQuiz(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب موضوع" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Add Question */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <h3 className="font-semibold mb-4">افزودن سؤال جدید</h3>
                
                <div className="space-y-4">
                  <Textarea
                    placeholder="متن سؤال را وارد کنید..."
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`گزینه ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...currentQuestion.options];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                          }}
                        />
                        <Button
                          size="sm"
                          variant={currentQuestion.correctAnswer === index ? "default" : "outline"}
                          onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                        >
                          {currentQuestion.correctAnswer === index ? "✓" : index + 1}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button onClick={addQuestion} className="w-full">
                    <Plus className="w-4 h-4 ml-2" />
                    افزودن سؤال
                  </Button>
                </div>
              </div>

              {/* Questions List */}
              {quiz.questions.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">سؤالات آزمون ({quiz.questions.length})</h3>
                    <Button onClick={startQuiz} className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      شروع آزمون
                    </Button>
                  </div>
                  
                  {quiz.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">سؤال {index + 1}: {question.question}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded ${
                                  optIndex === question.correctAnswer
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-muted'
                                }`}
                              >
                                {optIndex + 1}. {option}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sample Quizzes */}
              <div className="space-y-4">
                <h3 className="font-semibold">آزمون‌های نمونه</h3>
                <div className="grid gap-3">
                  {sampleQuizzes.map((sample, index) => (
                    <div key={index} className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{sample.title}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{sample.subject}</Badge>
                          <Badge variant="outline">{sample.questions.length} سؤال</Badge>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => loadSampleQuiz(sample)}>
                        بارگذاری
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Playing Mode */
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{quiz.title}</h2>
                <Badge variant="outline">
                  امتیاز: {score}/{quiz.questions.length}
                </Badge>
              </div>

              {currentQuizIndex < quiz.questions.length ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-4">
                      سؤال {currentQuizIndex + 1}: {quiz.questions[currentQuizIndex].question}
                    </h3>
                    
                    <div className="space-y-2">
                      {quiz.questions[currentQuizIndex].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            showAnswer
                              ? index === quiz.questions[currentQuizIndex].correctAnswer
                                ? "default"
                                : selectedAnswer === index
                                ? "destructive"
                                : "outline"
                              : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showAnswer}
                        >
                          {showAnswer && (
                            <>
                              {index === quiz.questions[currentQuizIndex].correctAnswer && (
                                <CheckCircle className="w-4 h-4 ml-2" />
                              )}
                              {selectedAnswer === index && index !== quiz.questions[currentQuizIndex].correctAnswer && (
                                <XCircle className="w-4 h-4 ml-2" />
                              )}
                            </>
                          )}
                          {index + 1}. {option}
                        </Button>
                      ))}
                    </div>

                    {showAnswer && (
                      <div className="mt-4 text-center">
                        <Button onClick={nextQuestion}>
                          {currentQuizIndex === quiz.questions.length - 1 ? "پایان آزمون" : "سؤال بعدی"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 p-6 border rounded-lg bg-muted/30">
                  <h3 className="text-xl font-semibold">آزمون تمام شد!</h3>
                  <p className="text-lg">امتیاز نهایی: {score}/{quiz.questions.length}</p>
                  <Button onClick={() => setIsPlaying(false)}>بازگشت به ساخت آزمون</Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGenerator;