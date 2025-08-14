import React from 'react';

export const ZodiacConstellation = ({ sign }: { sign?: string }) => {
  const getConstellationPoints = (sign: string) => {
    const patterns: Record<string, string> = {
      aries: "M50 150 L100 100 L150 120 L180 80",
      taurus: "M80 100 L120 120 L160 100 L200 140 L160 180 L120 160 L80 180 Z",
      gemini: "M100 80 L100 180 M150 80 L150 180 M80 120 L120 120 M130 140 L170 140",
      cancer: "M100 100 Q150 80 200 100 Q180 150 150 180 Q120 150 100 100",
      leo: "M80 100 Q120 80 160 100 L180 120 Q160 140 120 140 Q100 120 80 100",
      virgo: "M80 80 L80 180 M80 130 Q120 110 160 130 L160 180",
      libra: "M80 120 L180 120 M100 100 Q130 80 160 100 M100 140 Q130 160 160 140",
      scorpio: "M80 80 L80 160 Q100 180 120 160 L120 140 Q140 120 160 140 L160 180",
      sagittarius: "M80 180 L180 80 M140 100 L180 100 M180 100 L180 140",
      capricorn: "M80 100 Q120 80 160 100 Q180 120 160 140 Q140 160 120 140 Q100 120 80 100",
      aquarius: "M80 120 Q120 100 160 120 M80 140 Q120 160 160 140",
      pisces: "M80 100 Q120 120 120 160 Q120 120 160 100 M100 140 L140 140"
    };
    return patterns[sign] || patterns.aries;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <svg width="200" height="200" viewBox="0 0 260 260" className="animate-pulse">
        <path
          d={getConstellationPoints(sign || 'aries')}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {/* Stars at constellation points */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={80 + (i * 20)}
            cy={100 + (Math.sin(i) * 30)}
            r="2"
            fill="currentColor"
            className="animate-twinkle"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

export const PlanetaryOrbit = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <div className="relative w-48 h-48">
      {/* Orbital rings */}
      <div className="absolute inset-0 border border-current rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
      <div className="absolute inset-4 border border-current rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      <div className="absolute inset-8 border border-current rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>
      
      {/* Planets */}
      <div className="absolute top-0 left-1/2 w-2 h-2 bg-current rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-4 left-1/2 w-1.5 h-1.5 bg-current rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      <div className="absolute top-8 left-1/2 w-1 h-1 bg-current rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>
    </div>
  </div>
);

export const ZodiacWheel = ({ selectedSign }: { selectedSign?: string }) => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 border-2 border-current rounded-full animate-spin-slow" style={{ animationDuration: '60s' }}>
        {/* Zodiac divisions */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-current"
            style={{
              top: '0',
              left: '50%',
              transformOrigin: '50% 128px',
              transform: `translateX(-50%) rotate(${i * 30}deg)`
            }}
          />
        ))}
      </div>
    </div>
  </div>
);