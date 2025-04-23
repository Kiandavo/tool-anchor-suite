
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function TodayDateConverter() {
  const today = new Date();
  
  // Convert to Persian date
  const persianDate = today.toLocaleDateString('fa-IR');
  
  // Format Gregorian date
  const gregorianDate = format(today, 'MMMM d, yyyy');
  
  const dateInfo = `تاریخ شمسی: ${persianDate}\nتاریخ میلادی: ${gregorianDate}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          تاریخ امروز
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OutcomeInfoCard outcome={dateInfo} />
      </CardContent>
    </Card>
  );
}
