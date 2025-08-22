import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Volume2, 
  CheckCircle, 
  Star, 
  Globe,
  MessageCircle,
  Headphones,
  PenTool,
  Award
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: {
    persian: string;
    pronunciation: string;
    english: string;
    audio?: string;
  }[];
  completed?: boolean;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const alphabetLessons: Lesson[] = [
  {
    id: 'alphabet-1',
    title: 'حروف الفبای فارسی - قسمت اول',
    category: 'alphabet',
    level: 'beginner',
    content: [
      { persian: 'الف', pronunciation: 'alef', english: 'A' },
      { persian: 'ب', pronunciation: 'be', english: 'B' },
      { persian: 'پ', pronunciation: 'pe', english: 'P' },
      { persian: 'ت', pronunciation: 'te', english: 'T' },
      { persian: 'ث', pronunciation: 'se', english: 'Th (Arabic)' },
      { persian: 'ج', pronunciation: 'jim', english: 'J' },
      { persian: 'چ', pronunciation: 'che', english: 'Ch' },
      { persian: 'ح', pronunciation: 'he', english: 'H (Arabic)' },
    ]
  },
  {
    id: 'alphabet-2',
    title: 'حروف الفبای فارسی - قسمت دوم',
    category: 'alphabet',
    level: 'beginner',
    content: [
      { persian: 'خ', pronunciation: 'khe', english: 'Kh' },
      { persian: 'د', pronunciation: 'dal', english: 'D' },
      { persian: 'ذ', pronunciation: 'zal', english: 'Z (Arabic)' },
      { persian: 'ر', pronunciation: 're', english: 'R' },
      { persian: 'ز', pronunciation: 'ze', english: 'Z' },
      { persian: 'ژ', pronunciation: 'zhe', english: 'Zh (French J)' },
      { persian: 'س', pronunciation: 'sin', english: 'S' },
      { persian: 'ش', pronunciation: 'shin', english: 'Sh' },
    ]
  }
];

const vocabularyLessons: Lesson[] = [
  {
    id: 'greetings',
    title: 'سلام و احوال‌پرسی',
    category: 'vocabulary',
    level: 'beginner',
    content: [
      { persian: 'سلام', pronunciation: 'salaam', english: 'Hello' },
      { persian: 'درود', pronunciation: 'dorood', english: 'Greetings' },
      { persian: 'خداحافظ', pronunciation: 'khodahafez', english: 'Goodbye' },
      { persian: 'ممنون', pronunciation: 'mamnoon', english: 'Thank you' },
      { persian: 'متشکرم', pronunciation: 'moteshakeram', english: 'Thank you (formal)' },
      { persian: 'ببخشید', pronunciation: 'bebakhshid', english: 'Excuse me/Sorry' },
      { persian: 'حال شما چطور است؟', pronunciation: 'haal-e shoma chetor ast?', english: 'How are you?' },
      { persian: 'خوبم، ممنون', pronunciation: 'khoobam, mamnoon', english: 'I\'m fine, thank you' },
    ]
  },
  {
    id: 'family',
    title: 'خانواده',
    category: 'vocabulary',
    level: 'beginner',
    content: [
      { persian: 'خانواده', pronunciation: 'khanevadeh', english: 'Family' },
      { persian: 'پدر', pronunciation: 'pedar', english: 'Father' },
      { persian: 'مادر', pronunciation: 'madar', english: 'Mother' },
      { persian: 'برادر', pronunciation: 'baradar', english: 'Brother' },
      { persian: 'خواهر', pronunciation: 'khahar', english: 'Sister' },
      { persian: 'پسر', pronunciation: 'pesar', english: 'Son' },
      { persian: 'دختر', pronunciation: 'dokhtar', english: 'Daughter' },
      { persian: 'همسر', pronunciation: 'hamsar', english: 'Spouse' },
    ]
  },
  {
    id: 'numbers',
    title: 'اعداد',
    category: 'vocabulary',
    level: 'beginner',
    content: [
      { persian: 'یک', pronunciation: 'yek', english: 'One' },
      { persian: 'دو', pronunciation: 'do', english: 'Two' },
      { persian: 'سه', pronunciation: 'se', english: 'Three' },
      { persian: 'چهار', pronunciation: 'chahaar', english: 'Four' },
      { persian: 'پنج', pronunciation: 'panj', english: 'Five' },
      { persian: 'شش', pronunciation: 'shesh', english: 'Six' },
      { persian: 'هفت', pronunciation: 'haft', english: 'Seven' },
      { persian: 'هشت', pronunciation: 'hasht', english: 'Eight' },
      { persian: 'نه', pronunciation: 'noh', english: 'Nine' },
      { persian: 'ده', pronunciation: 'dah', english: 'Ten' },
    ]
  }
];

const grammarLessons: Lesson[] = [
  {
    id: 'verb-to-be',
    title: 'فعل بودن (هستم، هستی، است)',
    category: 'grammar',
    level: 'beginner',
    content: [
      { persian: 'من هستم', pronunciation: 'man hastam', english: 'I am' },
      { persian: 'تو هستی', pronunciation: 'to hasti', english: 'You are (informal)' },
      { persian: 'شما هستید', pronunciation: 'shoma hastid', english: 'You are (formal)' },
      { persian: 'او است', pronunciation: 'oo ast', english: 'He/She is' },
      { persian: 'ما هستیم', pronunciation: 'maa hastim', english: 'We are' },
      { persian: 'آن‌ها هستند', pronunciation: 'aanhaa hastand', english: 'They are' },
    ]
  },
  {
    id: 'possessives',
    title: 'ضمایر ملکی',
    category: 'grammar',
    level: 'intermediate',
    content: [
      { persian: 'کتاب من', pronunciation: 'ketaab-e man', english: 'My book' },
      { persian: 'خانه تو', pronunciation: 'khaaneh-ye to', english: 'Your house' },
      { persian: 'ماشین او', pronunciation: 'maashin-e oo', english: 'His/Her car' },
      { persian: 'دوستان ما', pronunciation: 'doostaan-e maa', english: 'Our friends' },
    ]
  }
];

const conversationLessons: Lesson[] = [
  {
    id: 'basic-conversation',
    title: 'مکالمه ساده',
    category: 'conversation',
    level: 'intermediate',
    content: [
      { persian: 'اسم شما چیست؟', pronunciation: 'esm-e shoma chist?', english: 'What is your name?' },
      { persian: 'اسم من ... است', pronunciation: 'esm-e man ... ast', english: 'My name is ...' },
      { persian: 'از کجا آمده‌اید؟', pronunciation: 'az koja aamadeh-id?', english: 'Where are you from?' },
      { persian: 'من از ... آمده‌ام', pronunciation: 'man az ... aamadeh-am', english: 'I am from ...' },
      { persian: 'چه کار می‌کنید؟', pronunciation: 'che kaar mikonid?', english: 'What do you do?' },
      { persian: 'من ... هستم', pronunciation: 'man ... hastam', english: 'I am a ...' },
    ]
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    question: '"سلام" به انگلیسی چی میشه؟',
    options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
    correct: 1,
    explanation: 'سلام به معنی Hello در انگلیسی است.'
  },
  {
    question: '"پدر" به انگلیسی چی میشه؟',
    options: ['Mother', 'Father', 'Brother', 'Sister'],
    correct: 1,
    explanation: 'پدر به معنی Father در انگلیسی است.'
  },
  {
    question: 'عدد "پنج" به انگلیسی چی میشه؟',
    options: ['Four', 'Five', 'Six', 'Seven'],
    correct: 1,
    explanation: 'پنج برابر است با Five در انگلیسی.'
  }
];

export function PersianLanguageEnhanced() {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const allLessons = [
    ...alphabetLessons,
    ...vocabularyLessons,
    ...grammarLessons,
    ...conversationLessons
  ];

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentLessonIndex(0);
    setShowQuiz(false);
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      setUserProgress(Math.min(userProgress + 10, 100));
    }
  };

  const nextLessonItem = () => {
    if (activeLesson && currentLessonIndex < activeLesson.content.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      // Lesson completed
      if (activeLesson) {
        completeLesson(activeLesson.id);
      }
      setShowQuiz(true);
      setCurrentQuizIndex(0);
      setQuizScore(0);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === quizQuestions[currentQuizIndex].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      // Quiz completed
      setShowQuiz(false);
      setActiveLesson(null);
    }
  };

  const getLevelBadge = (level: string) => {
    const variants = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    const labels = {
      beginner: 'مبتدی',
      intermediate: 'متوسط',
      advanced: 'پیشرفته'
    };
    
    return (
      <Badge className={variants[level as keyof typeof variants]}>
        {labels[level as keyof typeof labels]}
      </Badge>
    );
  };

  const currentItem = activeLesson?.content[currentLessonIndex];

  return (
    <div className="space-y-6">
      <Card className="gradient-persian text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen size={28} />
            آموزش زبان فارسی
          </CardTitle>
          <p className="text-white/90">
            یادگیری زبان فارسی از پایه تا پیشرفته با روش‌های تعاملی
          </p>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Award className="text-yellow-500" size={24} />
              <div>
                <h3 className="font-semibold">پیشرفت شما</h3>
                <p className="text-sm text-muted-foreground">
                  {completedLessons.length} درس تکمیل شده
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg">
              {userProgress}%
            </Badge>
          </div>
          <Progress value={userProgress} className="w-full" />
        </CardContent>
      </Card>

      {/* Active Lesson or Quiz */}
      {activeLesson && !showQuiz && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{activeLesson.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  {getLevelBadge(activeLesson.level)}
                  <Badge variant="outline">
                    {currentLessonIndex + 1} از {activeLesson.content.length}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" onClick={() => setActiveLesson(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentItem && (
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
                  <h2 className="text-4xl font-bold mb-2 text-right">
                    {currentItem.persian}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    /{currentItem.pronunciation}/
                  </p>
                  <p className="text-xl text-left">
                    {currentItem.english}
                  </p>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <Volume2 size={20} />
                    تلفظ
                  </Button>
                  <Button size="lg" onClick={nextLessonItem}>
                    {currentLessonIndex === activeLesson.content.length - 1 ? 'تمام شد' : 'بعدی'}
                  </Button>
                </div>

                {/* Practice Input */}
                <div className="mt-6 space-y-3">
                  <Label className="text-sm font-medium">
                    این کلمه را تایپ کنید:
                  </Label>
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="اینجا تایپ کنید..."
                    className="text-center text-lg"
                  />
                  {userInput.trim() === currentItem.persian && (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle size={20} />
                      <span>آفرین! درست است.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quiz */}
      {showQuiz && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star size={20} />
              آزمون
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {quizQuestions[currentQuizIndex].question}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {quizQuestions[currentQuizIndex].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? 
                        (index === quizQuestions[currentQuizIndex].correct ? "default" : "destructive") 
                        : "outline"
                      }
                      disabled={showAnswer}
                      onClick={() => handleQuizAnswer(index)}
                      className="p-4 h-auto"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {showAnswer && (
                <div className="space-y-3">
                  <div className={`p-4 rounded-lg ${
                    selectedAnswer === quizQuestions[currentQuizIndex].correct 
                      ? 'bg-green-50 text-green-800' 
                      : 'bg-red-50 text-red-800'
                  }`}>
                    <p className="font-medium">
                      {selectedAnswer === quizQuestions[currentQuizIndex].correct 
                        ? '✅ درست!' 
                        : '❌ اشتباه!'
                      }
                    </p>
                    <p className="text-sm mt-2">
                      {quizQuestions[currentQuizIndex].explanation}
                    </p>
                  </div>
                  <Button onClick={nextQuizQuestion}>
                    {currentQuizIndex === quizQuestions.length - 1 ? 'پایان آزمون' : 'سوال بعدی'}
                  </Button>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                سوال {currentQuizIndex + 1} از {quizQuestions.length} | امتیاز: {quizScore}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lesson Categories */}
      {!activeLesson && (
        <Tabs defaultValue="alphabet">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="alphabet">الفبا</TabsTrigger>
            <TabsTrigger value="vocabulary">واژگان</TabsTrigger>
            <TabsTrigger value="grammar">گرامر</TabsTrigger>
            <TabsTrigger value="conversation">مکالمه</TabsTrigger>
          </TabsList>

          <TabsContent value="alphabet">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alphabetLessons.map((lesson) => (
                <Card key={lesson.id} className="hover-lift cursor-pointer" onClick={() => startLesson(lesson)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      {getLevelBadge(lesson.level)}
                      <span className="text-sm text-muted-foreground">
                        {lesson.content.length} آیتم
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vocabulary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vocabularyLessons.map((lesson) => (
                <Card key={lesson.id} className="hover-lift cursor-pointer" onClick={() => startLesson(lesson)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      {getLevelBadge(lesson.level)}
                      <span className="text-sm text-muted-foreground">
                        {lesson.content.length} واژه
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grammar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {grammarLessons.map((lesson) => (
                <Card key={lesson.id} className="hover-lift cursor-pointer" onClick={() => startLesson(lesson)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      {getLevelBadge(lesson.level)}
                      <span className="text-sm text-muted-foreground">
                        {lesson.content.length} مثال
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="conversation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conversationLessons.map((lesson) => (
                <Card key={lesson.id} className="hover-lift cursor-pointer" onClick={() => startLesson(lesson)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      {getLevelBadge(lesson.level)}
                      <span className="text-sm text-muted-foreground">
                        {lesson.content.length} جمله
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}