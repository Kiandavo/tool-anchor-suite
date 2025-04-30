
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodiacSigns } from './useHoroscope';

interface ZodiacSelectorProps {
  selectedSign: string;
  onSelectSign: (value: string) => void;
}

export const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ selectedSign, onSelectSign }) => {
  console.log("ZodiacSelector rendering with selectedSign:", selectedSign);
  
  return (
    <div className="mb-3">
      <label className="block text-[#5c3f14] text-xs mb-1.5 font-medium">ماه تولد خود را انتخاب کنید:</label>
      <Select 
        value={selectedSign} 
        onValueChange={(value) => {
          console.log("Select value changed to:", value);
          onSelectSign(value);
        }}
      >
        <SelectTrigger className="text-xs bg-white/50 border-[#e6c8b0]/50 shadow-sm hover:bg-white/70 transition-all">
          <SelectValue placeholder="انتخاب ماه تولد" />
          {selectedSign && (
            <span className="mr-2 text-[#5c3f14] text-lg">
              {zodiacSigns.find(sign => sign.value === selectedSign)?.symbol}
            </span>
          )}
        </SelectTrigger>
        <SelectContent className="max-h-[300px] bg-white border-[#e6c8b0]/50">
          {zodiacSigns.map((sign) => (
            <SelectItem 
              key={sign.value} 
              value={sign.value} 
              className="text-xs flex items-center hover:bg-[#fdf0e9]/50 transition-all"
            >
              <span className="ml-2 text-lg">{sign.symbol}</span>
              <span className="whitespace-nowrap text-xs">{sign.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
