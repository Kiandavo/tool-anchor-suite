import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface Planet {
  name: string;
  sign: string;
  degree: number;
  house: number;
}

interface ChartWheelProps {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planets?: Planet[];
  onPlanetClick?: (planet: string) => void;
}

const ZODIAC_SIGNS = [
  { name: 'حمل', symbol: '♈', color: '#ff4444' },
  { name: 'ثور', symbol: '♉', color: '#44ff44' },
  { name: 'جوزا', symbol: '♊', color: '#ffff44' },
  { name: 'سرطان', symbol: '♋', color: '#4444ff' },
  { name: 'اسد', symbol: '♌', color: '#ff44ff' },
  { name: 'سنبله', symbol: '♍', color: '#44ffff' },
  { name: 'میزان', symbol: '♎', color: '#ff8844' },
  { name: 'عقرب', symbol: '♏', color: '#8844ff' },
  { name: 'قوس', symbol: '♐', color: '#ff4488' },
  { name: 'جدی', symbol: '♑', color: '#44ff88' },
  { name: 'دلو', symbol: '♒', color: '#4488ff' },
  { name: 'حوت', symbol: '♓', color: '#88ff44' }
];

const PLANET_SYMBOLS: Record<string, string> = {
  'خورشید': '☉',
  'ماه': '☽',
  'عطارد': '☿',
  'زهره': '♀',
  'مریخ': '♂',
  'مشتری': '♃',
  'زحل': '♄'
};

export const ChartWheel: React.FC<ChartWheelProps> = ({
  sunSign,
  moonSign,
  ascendant,
  planets = [],
  onPlanetClick
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const center = 200;
  const outerRadius = 180;
  const middleRadius = 140;
  const innerRadius = 100;

  // Draw zodiac wheel
  const drawZodiacRing = () => {
    return ZODIAC_SIGNS.map((sign, index) => {
      const startAngle = (index * 30 - 90) * (Math.PI / 180);
      const endAngle = ((index + 1) * 30 - 90) * (Math.PI / 180);
      const midAngle = (startAngle + endAngle) / 2;

      const pathData = `
        M ${center + outerRadius * Math.cos(startAngle)} ${center + outerRadius * Math.sin(startAngle)}
        A ${outerRadius} ${outerRadius} 0 0 1 ${center + outerRadius * Math.cos(endAngle)} ${center + outerRadius * Math.sin(endAngle)}
        L ${center + middleRadius * Math.cos(endAngle)} ${center + middleRadius * Math.sin(endAngle)}
        A ${middleRadius} ${middleRadius} 0 0 0 ${center + middleRadius * Math.cos(startAngle)} ${center + middleRadius * Math.sin(startAngle)}
        Z
      `;

      const textRadius = (outerRadius + middleRadius) / 2;
      const textX = center + textRadius * Math.cos(midAngle);
      const textY = center + textRadius * Math.sin(midAngle);

      return (
        <g key={sign.name}>
          <path
            d={pathData}
            fill={`${sign.color}20`}
            stroke={sign.color}
            strokeWidth="2"
            className="transition-all hover:opacity-80 cursor-pointer"
          />
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold pointer-events-none"
            fill={sign.color}
          >
            {sign.symbol}
          </text>
        </g>
      );
    });
  };

  // Draw house lines
  const drawHouses = () => {
    return Array.from({ length: 12 }).map((_, index) => {
      const angle = (index * 30 - 90) * (Math.PI / 180);
      const x1 = center + middleRadius * Math.cos(angle);
      const y1 = center + middleRadius * Math.sin(angle);
      const x2 = center + innerRadius * Math.cos(angle);
      const y2 = center + innerRadius * Math.sin(angle);

      const textAngle = (index * 30 + 15 - 90) * (Math.PI / 180);
      const textRadius = (middleRadius + innerRadius) / 2;
      const textX = center + textRadius * Math.cos(textAngle);
      const textY = center + textRadius * Math.sin(textAngle);

      return (
        <g key={`house-${index}`}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#999"
            strokeWidth="1"
            opacity="0.5"
          />
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-gray-600 pointer-events-none"
          >
            {index + 1}
          </text>
        </g>
      );
    });
  };

  // Draw main planets
  const drawMainPlanets = () => {
    const mainPlanets = [
      { name: 'خورشید', sign: sunSign, angle: 0 },
      { name: 'ماه', sign: moonSign, angle: 120 },
      { name: 'طالع', sign: ascendant, angle: 240 }
    ];

    return mainPlanets.map((planet, index) => {
      const angle = (planet.angle - 90) * (Math.PI / 180);
      const radius = 70;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      return (
        <g
          key={planet.name}
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
            setSelectedPlanet(planet.name);
            onPlanetClick?.(planet.name);
          }}
        >
          <circle
            cx={x}
            cy={y}
            r="20"
            fill={index === 0 ? '#ffa500' : index === 1 ? '#4444ff' : '#8844ff'}
            stroke="#fff"
            strokeWidth="2"
            opacity="0.9"
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-bold fill-white pointer-events-none"
          >
            {PLANET_SYMBOLS[planet.name] || planet.name[0]}
          </text>
          <text
            x={x}
            y={y + 35}
            textAnchor="middle"
            className="text-xs fill-gray-700 pointer-events-none"
          >
            {planet.sign}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        animate={{ rotate: rotation }}
        transition={{ duration: 0.5 }}
      >
        {/* Background circle */}
        <circle cx={center} cy={center} r={outerRadius} fill="#f8f9fa" />
        
        {/* Zodiac ring */}
        {drawZodiacRing()}
        
        {/* House lines */}
        {drawHouses()}
        
        {/* Center circle */}
        <circle cx={center} cy={center} r={innerRadius} fill="white" stroke="#ccc" strokeWidth="2" />
        
        {/* Main planets */}
        {drawMainPlanets()}
        
        {/* Center point */}
        <circle cx={center} cy={center} r="5" fill="#333" />
      </motion.svg>

      {/* Info box */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-blue-600 mt-1 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">راهنمای چرخ طالع:</p>
            <ul className="space-y-1 text-xs">
              <li>• حلقه بیرونی: نشانه‌های دوازده‌گانه برج</li>
              <li>• حلقه میانی: خانه‌های دوازده‌گانه طالع</li>
              <li>• مرکز: موقعیت سیارات اصلی</li>
              <li>• روی سیارات کلیک کنید تا جزئیات بیشتر ببینید</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Selected planet info */}
      {selectedPlanet && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-purple-50 rounded-lg border-2 border-purple-200"
        >
          <h4 className="font-bold text-purple-900 mb-1">{selectedPlanet}</h4>
          <p className="text-sm text-purple-700">
            اطلاعات تفصیلی درباره {selectedPlanet} و تاثیرات آن در نقشه طالع شما
          </p>
        </motion.div>
      )}
    </div>
  );
};
