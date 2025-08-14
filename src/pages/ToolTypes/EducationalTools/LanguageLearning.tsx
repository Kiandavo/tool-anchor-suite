import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Globe, BookOpen, MessageSquare, CheckCircle, XCircle } from "lucide-react";

const LanguageLearning = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const commonPhrases = [
    { persian: "سلام", english: "Hello", pronunciation: "Salaam" },
    { persian: "خداحافظ", english: "Goodbye", pronunciation: "Khodaahafez" },
    { persian: "متشکرم", english: "Thank you", pronunciation: "Moteshakkeram" },
    { persian: "ببخشید", english: "Excuse me", pronunciation: "Bebakhshid" },
    { persian: "چطور هستید؟", english: "How are you?", pronunciation: "Chetor hastid?" },
    { persian: "اسم من ... است", english: "My name is...", pronunciation: "Esme man ... ast" }
  ];

  const grammarRules = [
    {
      title: "ترتیب کلمات",
      rule: "در فارسی معمولاً ترتیب کلمات: فاعل + مفعول + فعل",
      example: "من کتاب می‌خوانم"
    },
    {
      title: "صفت و موصوف",
      rule: "صفت بعد از موصوف می‌آید",
      example: "خانه بزرگ (خانه + بزرگ)"
    },
    {
      title: "اضافه",
      rule: "برای ساخت اضافه از 'ِ' (کسره) استفاده می‌شود",
      example: "کتابِ من (کتاب من)"
    }
  ];

  const quizQuestions = [
    {
      question: "معنی کلمه 'دوست' چیست؟",
      options: ["Enemy", "Friend", "Family", "Teacher"],
      correct: 1
    },
    {
      question: "ترجمه 'Good morning' به فارسی:",
      options: ["شب بخیر", "صبح بخیر", "ظهر بخیر", "عصر بخیر"],
      correct: 1
    },
    {
      question: "فعل 'رفتن' در زمان حال برای 'من':",
      options: ["رفتم", "می‌روم", "خواهم رفت", "برو"],
      correct: 1
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            آموزش زبان فارسی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phrases" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phrases">عبارات رایج</TabsTrigger>
              <TabsTrigger value="grammar">گرامر</TabsTrigger>
              <TabsTrigger value="quiz">آزمون</TabsTrigger>
            </TabsList>

            <TabsContent value="phrases" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  عبارات روزمره
                </h3>
                {commonPhrases.map((phrase, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="text-right">
                        <span className="text-lg font-medium">{phrase.persian}</span>
                      </div>
                      <div>
                        <span className="text-lg">{phrase.english}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="italic">{phrase.pronunciation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="grammar" className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                قواعد گرامری
              </h3>
              {grammarRules.map((rule, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-medium text-primary mb-2">{rule.title}</h4>
                  <p className="text-muted-foreground mb-2">{rule.rule}</p>
                  <div className="p-2 bg-background rounded border-r-4 border-primary">
                    <strong>مثال:</strong> {rule.example}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">آزمون زبان</h3>
                <Badge variant="outline">
                  امتیاز: {score}/{quizQuestions.length}
                </Badge>
              </div>

              {currentQuiz < quizQuestions.length ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-4">
                      سوال {currentQuiz + 1}: {quizQuestions[currentQuiz].question}
                    </h4>
                    
                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            showAnswer
                              ? index === quizQuestions[currentQuiz].correct
                                ? "default"
                                : selectedAnswer === index
                                ? "destructive"
                                : "outline"
                              : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() => handleQuizAnswer(index)}
                          disabled={showAnswer}
                        >
                          {showAnswer && (
                            <>
                              {index === quizQuestions[currentQuiz].correct && (
                                <CheckCircle className="w-4 h-4 ml-2" />
                              )}
                              {selectedAnswer === index && index !== quizQuestions[currentQuiz].correct && (
                                <XCircle className="w-4 h-4 ml-2" />
                              )}
                            </>
                          )}
                          {option}
                        </Button>
                      ))}
                    </div>

                    {showAnswer && (
                      <div className="mt-4 text-center">
                        <Button onClick={nextQuestion} disabled={currentQuiz === quizQuestions.length - 1}>
                          سوال بعدی
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 p-6 border rounded-lg bg-muted/30">
                  <h4 className="text-xl font-semibold">آزمون تمام شد!</h4>
                  <p className="text-lg">امتیاز نهایی: {score}/{quizQuestions.length}</p>
                  <Button onClick={resetQuiz}>شروع مجدد</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageLearning;