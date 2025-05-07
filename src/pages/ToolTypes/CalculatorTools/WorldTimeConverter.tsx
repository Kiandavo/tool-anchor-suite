
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Globe } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

// Group cities by region for better organization
const regions = {
  asia: [
    { city: 'تهران', timezone: 'Asia/Tehran', flag: '🇮🇷' },
    { city: 'دبی', timezone: 'Asia/Dubai', flag: '🇦🇪' },
    { city: 'استانبول', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
    { city: 'توکیو', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'پکن', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
    { city: 'بمبئی', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
    { city: 'بانکوک', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
    { city: 'سنگاپور', timezone: 'Asia/Singapore', flag: '🇸🇬' },
  ],
  europe: [
    { city: 'لندن', timezone: 'Europe/London', flag: '🇬🇧' },
    { city: 'پاریس', timezone: 'Europe/Paris', flag: '🇫🇷' },
    { city: 'برلین', timezone: 'Europe/Berlin', flag: '🇩🇪' },
    { city: 'رم', timezone: 'Europe/Rome', flag: '🇮🇹' },
    { city: 'مادرید', timezone: 'Europe/Madrid', flag: '🇪🇸' },
    { city: 'آمستردام', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
    { city: 'مسکو', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  ],
  americas: [
    { city: 'نیویورک', timezone: 'America/New_York', flag: '🇺🇸' },
    { city: 'لس آنجلس', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
    { city: 'شیکاگو', timezone: 'America/Chicago', flag: '🇺🇸' },
    { city: 'تورنتو', timezone: 'America/Toronto', flag: '🇨🇦' },
    { city: 'مکزیکوسیتی', timezone: 'America/Mexico_City', flag: '🇲🇽' },
    { city: 'ریو دوژانیرو', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  ],
  oceania: [
    { city: 'سیدنی', timezone: 'Australia/Sydney', flag: '🇦🇺' },
    { city: 'اوکلند', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  ]
};

export default function WorldTimeConverter() {
  const [currentTab, setCurrentTab] = useState('asia');
  const [currentTimes, setCurrentTimes] = useState<{[key: string]: string}>({});
  const [now, setNow] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Update displayed times when now changes
  useEffect(() => {
    const times: {[key: string]: string} = {};
    
    Object.values(regions).flat().forEach(({ city, timezone }) => {
      try {
        times[city] = now.toLocaleTimeString('fa-IR', { timeZone: timezone });
      } catch (error) {
        console.error(`Error with timezone ${timezone}:`, error);
        times[city] = 'خطا در دریافت زمان';
      }
    });
    
    setCurrentTimes(times);
  }, [now]);

  // Calculate time difference between Tehran and selected city
  const getTimeDifference = (cityTimezone: string) => {
    try {
      const tehranTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tehran' });
      const cityTime = new Date().toLocaleString('en-US', { timeZone: cityTimezone });
      
      const tehranHours = new Date(tehranTime).getHours();
      const cityHours = new Date(cityTime).getHours();
      
      let diff = cityHours - tehranHours;
      if (diff > 12) diff = diff - 24;
      if (diff < -12) diff = diff + 24;
      
      if (diff === 0) return 'هم ساعت با تهران';
      return diff > 0 ? `${diff}+ ساعت جلوتر از تهران` : `${Math.abs(diff)}- ساعت عقب‌تر از تهران`;
    } catch (error) {
      return '';
    }
  };

  const renderTimeCards = (regionCities: typeof regions.asia) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {regionCities.map(({ city, timezone, flag }) => (
          <div key={city} className="bg-white rounded-lg border p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm">{flag} {city}</span>
              <span className="text-xs text-muted-foreground">{getTimeDifference(timezone)}</span>
            </div>
            <div className="text-xl font-bold text-primary">
              {currentTimes[city] || '00:00:00'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 justify-center">
          <Globe className="h-5 w-5" />
          ساعت جهانی
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="bg-muted/40 p-3 rounded-lg text-center">
            <p className="font-bold">ساعت محلی شما:</p>
            <p className="text-2xl font-mono">{now.toLocaleTimeString('fa-IR')}</p>
            <p className="text-sm text-muted-foreground">
              {new Intl.DateTimeFormat('fa-IR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(now)}
            </p>
          </div>
          
          <Tabs defaultValue="asia" value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="asia">آسیا</TabsTrigger>
              <TabsTrigger value="europe">اروپا</TabsTrigger>
              <TabsTrigger value="americas">آمریکا</TabsTrigger>
              <TabsTrigger value="oceania">اقیانوسیه</TabsTrigger>
            </TabsList>
            
            <TabsContent value="asia" className="p-1">
              {renderTimeCards(regions.asia)}
            </TabsContent>
            
            <TabsContent value="europe" className="p-1">
              {renderTimeCards(regions.europe)}
            </TabsContent>
            
            <TabsContent value="americas" className="p-1">
              {renderTimeCards(regions.americas)}
            </TabsContent>
            
            <TabsContent value="oceania" className="p-1">
              {renderTimeCards(regions.oceania)}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
