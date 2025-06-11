
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { AuraReadingResult } from './AuraReadingEngine';

interface AuraResultDisplayProps {
  name: string;
  auraReading: AuraReadingResult;
}

export default function AuraResultDisplay({ name, auraReading }: AuraResultDisplayProps) {
  return (
    <div className="space-y-4 mt-6 p-4 bg-white/60 rounded-lg border border-purple-200">
      <h3 className="text-lg font-bold text-purple-800 flex items-center gap-2">
        <Eye size={20} />
        هاله‌ی {name}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border border-purple-100">
          <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${auraReading.primaryColor.color}`}></div>
            رنگ اصلی: {auraReading.primaryColor.name}
          </h4>
          <p className="text-sm text-purple-600 mb-2">{auraReading.primaryColor.meaning}</p>
          <div className="space-y-1">
            {auraReading.primaryColor.traits.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-purple-100">
          <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${auraReading.secondaryColor.color}`}></div>
            رنگ فرعی: {auraReading.secondaryColor.name}
          </h4>
          <p className="text-sm text-purple-600">{auraReading.secondaryColor.meaning}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
          <h4 className="font-medium text-orange-800 mb-2">⚡ سطح انرژی</h4>
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${auraReading.energy}%` }}
            ></div>
          </div>
          <p className="text-xs text-orange-700 mt-1">{auraReading.energy}%</p>
        </div>

        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">🧘 سطح معنویت</h4>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${auraReading.spiritualLevel}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-700 mt-1">{auraReading.spiritualLevel}%</p>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">💡 راهنمایی امروز:</h4>
        <p className="text-purple-700 text-sm">{auraReading.advice}</p>
      </div>

      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <h4 className="font-medium text-indigo-800 mb-2">🔮 توصیه اصلی:</h4>
        <p className="text-indigo-700 text-sm">{auraReading.primaryColor.advice}</p>
      </div>
    </div>
  );
}
