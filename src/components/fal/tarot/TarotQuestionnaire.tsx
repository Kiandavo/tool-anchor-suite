import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DetailedQuestion, TarotReadingConfig } from './types';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface TarotQuestionnaireProps {
  readingType: TarotReadingConfig;
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
  showAccuracyFactors?: boolean;
}

export const TarotQuestionnaire: React.FC<TarotQuestionnaireProps> = ({
  readingType,
  answers,
  onAnswerChange,
  showAccuracyFactors = true
}) => {
  if (!readingType.questions || readingType.questions.length === 0) {
    return null;
  }

  const renderQuestion = (question: DetailedQuestion) => {
    const value = answers[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <Textarea
            id={question.id}
            value={value}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            placeholder="پاسخ خود را بنویسید..."
            className="min-h-[80px]"
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={(val) => onAnswerChange(question.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب کنید..." />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            id={question.id}
            type="date"
            value={value}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            id={question.id}
            type="number"
            value={value}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            placeholder="عدد را وارد کنید..."
          />
        );

      default:
        return null;
    }
  };

  const completedQuestions = readingType.questions.filter(q => 
    q.required ? answers[q.id] : true
  ).length;

  const requiredQuestions = readingType.questions.filter(q => q.required).length;
  const completedRequired = readingType.questions.filter(q => 
    q.required && answers[q.id]
  ).length;

  const accuracyPercentage = Math.round((completedRequired / requiredQuestions) * 100);

  return (
    <Card className="mb-6 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="icon-text text-lg">
          <AlertCircle className="h-5 w-5 text-purple-600" />
          سوالات تخصصی برای دقت بیشتر
        </CardTitle>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className="icon-text-sm">
            <TrendingUp className="h-3 w-3" />
            دقت: {accuracyPercentage}%
          </Badge>
          {readingType.hasTimeline && (
            <Badge variant="outline" className="text-amber-600 border-amber-300">
              شامل زمان‌بندی
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {readingType.questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="text-sm font-medium">
              {question.question}
              {question.required && <span className="text-red-500 mr-1">*</span>}
            </Label>
            {renderQuestion(question)}
          </div>
        ))}

        {showAccuracyFactors && readingType.accuracyFactors && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-medium text-sm text-purple-800 mb-3">
              عوامل افزایش دقت فال:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {readingType.accuracyFactors.map((factor, index) => (
                <li key={index} className="icon-text-sm">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full inline-block ml-2" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};