import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TarotCardType, TarotReadingConfig } from './types';
import { Clock, Calendar, Star, AlertTriangle } from 'lucide-react';

interface TarotTimelineProps {
  selectedCards: TarotCardType[];
  readingType: TarotReadingConfig;
  reversedCards: boolean[];
  answers?: Record<string, string>;
}

export const TarotTimeline: React.FC<TarotTimelineProps> = ({
  selectedCards,
  readingType,
  reversedCards,
  answers = {}
}) => {
  if (!readingType.hasTimeline || selectedCards.length === 0) {
    return null;
  }

  const getTimelineForCard = (card: TarotCardType, position: string, index: number) => {
    const isReversed = reversedCards[index];
    
    // Generate timeline based on position and card energy
    let timeline = '';
    let urgency = 'متوسط';
    let probability = 70;

    switch (position) {
      case 'گذشته':
        timeline = 'تاثیرات گذشته همچنان فعال';
        break;
      case 'حال':
        timeline = '۲-۴ هفته آینده';
        urgency = 'فوری';
        probability = 85;
        break;
      case 'آینده':
        timeline = '۳-۶ ماه آینده';
        break;
      case 'ماه آینده':
        timeline = '۲۰-۳۰ روز آینده';
        urgency = 'بالا';
        probability = 80;
        break;
      case '۳ ماه آینده':
        timeline = '۱۰-۱۲ هفته آینده';
        probability = 75;
        break;
      case '۶ ماه آینده':
        timeline = '۲۰-۲۶ هفته آینده';
        probability = 65;
        break;
      case 'سال آینده':
        timeline = '۸-۱۲ ماه آینده';
        probability = 60;
        break;
      case '۲ ماه آینده':
        timeline = '۶-۸ هفته آینده';
        probability = 78;
        break;
      default:
        timeline = card.timePeriod || 'زمان نامشخص';
    }

    // Adjust probability based on reversed status
    if (isReversed) {
      probability = Math.max(40, probability - 15);
      urgency = urgency === 'فوری' ? 'متوسط' : urgency === 'بالا' ? 'متوسط' : 'کم';
    }

    // Adjust based on user answers for more accuracy
    if (answers.question_importance === 'بسیار مهم') {
      probability += 5;
    }
    if (answers.current_mood === 'امیدوار') {
      probability += 3;
    }
    if (answers.financial_stress === 'بسیار زیاد') {
      urgency = 'فوری';
    }

    return { timeline, urgency, probability };
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'فوری': return 'text-red-600 bg-red-50 border-red-200';
      case 'بالا': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'متوسط': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'کم': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProbabilityIcon = (probability: number) => {
    if (probability >= 80) return <Star className="h-3 w-3 text-green-600" />;
    if (probability >= 65) return <Clock className="h-3 w-3 text-yellow-600" />;
    return <AlertTriangle className="h-3 w-3 text-orange-600" />;
  };

  return (
    <Card className="mb-6 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
      <CardContent className="p-6">
        <div className="icon-text mb-4">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-indigo-800">زمان‌بندی و احتمالات</h3>
        </div>

        <div className="space-y-4">
          {selectedCards.map((card, index) => {
            const position = readingType.positions[index];
            const { timeline, urgency, probability } = getTimelineForCard(card, position, index);
            const isReversed = reversedCards[index];

            return (
              <div key={index} className="p-4 bg-white/60 rounded-lg border border-indigo-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {position}: {card.name}
                      {isReversed && <span className="text-purple-600 mr-1">(معکوس)</span>}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{timeline}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className={`text-xs ${getUrgencyColor(urgency)}`}>
                      {urgency}
                    </Badge>
                    <Badge variant="outline" className="icon-text-sm text-xs">
                      {getProbabilityIcon(probability)}
                      {probability}%
                    </Badge>
                  </div>
                </div>

                {card.advice && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded border-r-4 border-purple-300">
                    <p className="text-sm text-purple-700 font-medium">
                      💡 {card.advice}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">راهنمای زمان‌بندی:</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <div className="icon-text-sm">
                <Star className="h-3 w-3 text-green-600" />
                <span>۸۰%+ احتمال بالا</span>
              </div>
              <div className="icon-text-sm">
                <Clock className="h-3 w-3 text-yellow-600" />
                <span>۶۵-۷۹% احتمال متوسط</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="icon-text-sm">
                <AlertTriangle className="h-3 w-3 text-orange-600" />
                <span>کمتر از ۶۵% نیاز به دقت</span>
              </div>
              <div className="text-gray-600">
                زمان‌ها تقریبی و قابل تغییر هستند
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};