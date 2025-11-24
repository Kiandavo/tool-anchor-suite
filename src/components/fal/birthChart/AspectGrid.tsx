import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Aspect {
  planet1: string;
  planet2: string;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
  angle: number;
  strength: 'strong' | 'moderate' | 'weak';
}

interface AspectGridProps {
  aspects: Aspect[];
}

const PLANETS = ['خورشید', 'ماه', 'عطارد', 'زهره', 'مریخ', 'مشتری', 'زحل'];

const ASPECT_SYMBOLS: Record<string, { symbol: string; color: string }> = {
  conjunction: { symbol: '☌', color: '#fbbf24' },
  opposition: { symbol: '☍', color: '#ef4444' },
  trine: { symbol: '△', color: '#3b82f6' },
  square: { symbol: '□', color: '#f97316' },
  sextile: { symbol: '⚹', color: '#10b981' }
};

export const AspectGrid: React.FC<AspectGridProps> = ({ aspects }) => {
  const getAspect = (planet1: string, planet2: string) => {
    return aspects.find(
      (a) =>
        (a.planet1 === planet1 && a.planet2 === planet2) ||
        (a.planet1 === planet2 && a.planet2 === planet1)
    );
  };

  return (
    <Card className="border-2 overflow-x-auto">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
        <CardTitle className="text-lg">جدول اتصالات (Aspect Grid)</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="inline-block min-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-100 text-xs font-semibold"></th>
                {PLANETS.map((planet) => (
                  <th
                    key={planet}
                    className="border border-gray-300 p-2 bg-gray-100 text-xs font-semibold"
                  >
                    {planet}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLANETS.map((planet1, index1) => (
                <tr key={planet1}>
                  <td className="border border-gray-300 p-2 bg-gray-100 text-xs font-semibold">
                    {planet1}
                  </td>
                  {PLANETS.map((planet2, index2) => {
                    if (index2 <= index1) {
                      return (
                        <td
                          key={planet2}
                          className="border border-gray-300 p-2 bg-gray-200"
                        ></td>
                      );
                    }

                    const aspect = getAspect(planet1, planet2);

                    return (
                      <td
                        key={planet2}
                        className="border border-gray-300 p-2 text-center hover:bg-gray-50 transition-colors relative group"
                      >
                        {aspect && (
                          <>
                            <span
                              className="text-2xl font-bold"
                              style={{ color: ASPECT_SYMBOLS[aspect.type].color }}
                            >
                              {ASPECT_SYMBOLS[aspect.type].symbol}
                            </span>
                            {/* Tooltip */}
                            <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded p-2 -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                              {aspect.type === 'conjunction' && 'اقتران'}
                              {aspect.type === 'opposition' && 'تقابل'}
                              {aspect.type === 'trine' && 'مثلث'}
                              {aspect.type === 'square' && 'مربع'}
                              {aspect.type === 'sextile' && 'شش‌ضلعی'}
                              <span className="mr-1">({aspect.angle}°)</span>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-bold mb-2">راهنما:</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            {Object.entries(ASPECT_SYMBOLS).map(([type, info]) => (
              <div key={type} className="flex items-center gap-1">
                <span className="text-xl" style={{ color: info.color }}>
                  {info.symbol}
                </span>
                <span className="text-gray-700">
                  {type === 'conjunction' && 'اقتران'}
                  {type === 'opposition' && 'تقابل'}
                  {type === 'trine' && 'مثلث'}
                  {type === 'square' && 'مربع'}
                  {type === 'sextile' && 'شش‌ضلعی'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
