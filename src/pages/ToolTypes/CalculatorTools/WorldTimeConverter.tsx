
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function WorldTimeConverter() {
  const getTimeInTimezone = (timezone: string) => {
    return new Date().toLocaleTimeString('fa-IR', { timeZone: timezone });
  };

  const times = [
    { city: 'تهران', time: getTimeInTimezone('Asia/Tehran') },
    { city: 'دبی', time: getTimeInTimezone('Asia/Dubai') },
    { city: 'استانبول', time: getTimeInTimezone('Europe/Istanbul') },
    { city: 'لندن', time: getTimeInTimezone('Europe/London') },
    { city: 'نیویورک', time: getTimeInTimezone('America/New_York') },
    { city: 'توکیو', time: getTimeInTimezone('Asia/Tokyo') }
  ];

  const timeInfo = times.map(({ city, time }) => `${city}: ${time}`).join('\n');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          ساعت جهانی
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OutcomeInfoCard outcome={timeInfo} />
      </CardContent>
    </Card>
  );
}
