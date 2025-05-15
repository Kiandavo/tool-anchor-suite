
import React from 'react';
import { Label } from "@/components/ui/label";

interface ColorScheme {
  name: string;
  bg: string;
  text: string;
  accent: string;
}

interface ColorSchemeSelectorProps {
  colorSchemes: ColorScheme[];
  selectedScheme: number;
  setSelectedScheme: (index: number) => void;
}

export const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  colorSchemes,
  selectedScheme,
  setSelectedScheme
}) => {
  return (
    <div className="space-y-2">
      <Label>ترکیب رنگ</Label>
      <div className="grid grid-cols-3 gap-2">
        {colorSchemes.map((scheme, index) => (
          <div 
            key={index}
            className={`border rounded-md p-2 cursor-pointer ${
              selectedScheme === index ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedScheme(index)}
          >
            <div 
              className="h-12 rounded-md mb-1"
              style={{ backgroundColor: scheme.bg }}
            ></div>
            <div className="text-xs text-center">{scheme.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
