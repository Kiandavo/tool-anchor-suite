
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { DreamInterpretationResult } from './DreamInterpretationEngine';

interface DreamResultDisplayProps {
  interpretation: DreamInterpretationResult;
}

export default function DreamResultDisplay({ interpretation }: DreamResultDisplayProps) {
  return (
    <div className="space-y-4 mt-6 p-4 bg-white/60 rounded-lg border border-indigo-200">
      <h3 className="text-lg font-bold text-indigo-800 flex items-center gap-2">
        <BookOpen size={20} />
        تعبیر خواب شما
      </h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-indigo-50 rounded-lg">
          <h4 className="font-medium text-indigo-800 mb-2">📋 تفسیر کلی:</h4>
          <p className="text-indigo-700">{interpretation.summary}</p>
        </div>

        {interpretation.symbols.length > 0 && (
          <div className="p-3 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">🗝️ نمادهای مهم:</h4>
            <div className="space-y-2">
              {interpretation.symbols.map((symbol, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {symbol.symbol}
                  </Badge>
                  <span className="text-sm text-purple-700">{symbol.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 راهنمایی:</h4>
          <p className="text-blue-700">{interpretation.advice}</p>
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">✨ معنای معنوی:</h4>
          <p className="text-green-700">{interpretation.spiritual}</p>
        </div>
      </div>
    </div>
  );
}
