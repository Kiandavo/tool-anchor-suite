
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodiacSigns } from './useHoroscope';

interface ZodiacSelectorProps {
  selectedSign: string;
  onSelectSign: (value: string) => void;
}

export const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ selectedSign, onSelectSign }) => {
  return (
    <div>
      <label className="block text-[#5c3f14] text-xs mb-1 font-medium">ماه تولد خود را انتخاب کنید:</label>
      <Select 
        value={selectedSign} 
        onValueChange={(value) => {
          console.log("Selected zodiac sign:", value);
          onSelectSign(value);
        }}
      >
        <SelectTrigger className="text-xs bg-white/50 border-[#e6c8b0]/50 shadow-sm">
          <SelectValue placeholder="انتخاب ماه تولد" />
          {selectedSign && (
            <span className="mr-1 text-[#5c3f14] text-sm">
              {zodiacSigns.find(sign => sign.value === selectedSign)?.symbol}
            </span>
          )}
        </SelectTrigger>
        <SelectContent className="max-h-[300px] bg-white border-[#e6c8b0]/50">
          {zodiacSigns.map((sign) => (
            <SelectItem key={sign.value} value={sign.value} className="text-xs flex items-center">
              <span className="ml-1.5">{sign.symbol}</span>
              {sign.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
