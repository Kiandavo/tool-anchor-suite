import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BirthData } from './useBirthChart';

interface BirthDataFormProps {
  birthData: BirthData;
  onChange: (field: keyof BirthData, value: string) => void;
}

export const BirthDataForm: React.FC<BirthDataFormProps> = ({ birthData, onChange }) => {
  const commonLocations = [
    'تهران', 'اصفهان', 'مشهد', 'شیراز', 'تبریز', 'کرج', 'قم', 'اهواز', 'کرمانشاه', 'ارومیه'
  ];

  return (
    <div className="bg-white/60 p-6 rounded-lg border border-purple-200/50 space-y-4">
      <h3 className="text-lg font-semibold text-purple-900 mb-4">
        اطلاعات تولد
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birth-date" className="text-purple-800 font-medium">
            تاریخ تولد
          </Label>
          <Input
            id="birth-date"
            type="date"
            value={birthData.date}
            onChange={(e) => onChange('date', e.target.value)}
            className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-time" className="text-purple-800 font-medium">
            زمان تولد
          </Label>
          <Input
            id="birth-time"
            type="time"
            value={birthData.time}
            onChange={(e) => onChange('time', e.target.value)}
            className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birth-location" className="text-purple-800 font-medium">
          محل تولد
        </Label>
        <Input
          id="birth-location"
          type="text"
          placeholder="نام شهر یا مختصات جغرافیایی"
          value={birthData.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
          list="locations"
        />
        <datalist id="locations">
          {commonLocations.map((location) => (
            <option key={location} value={location} />
          ))}
        </datalist>
      </div>
      
      <p className="text-xs text-purple-600 mt-3">
        💡 برای دقت بیشتر، زمان دقیق تولد و محل تولد را وارد کنید
      </p>
    </div>
  );
};