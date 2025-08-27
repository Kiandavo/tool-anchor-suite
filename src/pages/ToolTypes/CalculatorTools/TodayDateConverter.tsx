
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { getCurrentDates, formatPersianDate, formatHijriDate, formatGregorianDate } from '@/utils/calendar/persianCalendar';

export default function TodayDateConverter() {
  const { gregorian, persian, hijri } = getCurrentDates();
  
  const dateInfo = `تاریخ شمسی: ${formatPersianDate(persian)}
تاریخ قمری: ${formatHijriDate(hijri)}
تاریخ میلادی: ${formatGregorianDate(gregorian)}`;

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
