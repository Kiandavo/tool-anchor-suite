import React from 'react';
import { BirthChart } from './useBirthChart';

interface ChartDisplayProps {
  chart: BirthChart;
  isAnimating: boolean;
}

export const ChartDisplay: React.FC<ChartDisplayProps> = ({ chart, isAnimating }) => {
  return (
    <div className={`space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
      {/* Main Signs */}
      <div className="bg-gradient-to-br from-white/80 to-purple-50/80 p-6 rounded-lg border border-purple-200/50">
        <h3 className="text-xl font-bold text-purple-900 mb-4 text-center">
          🌟 ستارگان اصلی شما
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-yellow-50/80 rounded-lg border border-yellow-200">
            <div className="text-2xl mb-2">☀️</div>
            <h4 className="font-semibold text-yellow-800">خورشید</h4>
            <p className="text-yellow-700 font-bold text-lg">{chart.sunSign}</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50/80 rounded-lg border border-blue-200">
            <div className="text-2xl mb-2">🌙</div>
            <h4 className="font-semibold text-blue-800">ماه</h4>
            <p className="text-blue-700 font-bold text-lg">{chart.moonSign}</p>
          </div>
          
          <div className="text-center p-4 bg-green-50/80 rounded-lg border border-green-200">
            <div className="text-2xl mb-2">⬆️</div>
            <h4 className="font-semibold text-green-800">طالع</h4>
            <p className="text-green-700 font-bold text-lg">{chart.ascendant}</p>
          </div>
        </div>
      </div>

      {/* Planet Positions */}
      <div className="bg-white/70 p-6 rounded-lg border border-purple-200/50">
        <h3 className="text-lg font-bold text-purple-900 mb-4">
          🪐 موقعیت سیارات
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chart.planets.map((planet, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-purple-50/50 rounded-lg">
              <span className="font-medium text-purple-800">{planet.planet}</span>
              <div className="text-sm text-purple-600">
                <span className="font-semibold">{planet.sign}</span>
                <span className="mx-2">|</span>
                <span>خانه {planet.house}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elements Analysis */}
      <div className="bg-white/70 p-6 rounded-lg border border-purple-200/50">
        <h3 className="text-lg font-bold text-purple-900 mb-4">
          🌱 تحلیل عناصر
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl mb-1">🔥</div>
            <div className="text-sm text-red-600">آتش</div>
            <div className="font-bold text-red-700">{chart.elements.fire}</div>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">🌍</div>
            <div className="text-sm text-brown-600">خاک</div>
            <div className="font-bold text-brown-700">{chart.elements.earth}</div>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">💨</div>
            <div className="text-sm text-blue-600">هوا</div>
            <div className="font-bold text-blue-700">{chart.elements.air}</div>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">💧</div>
            <div className="text-sm text-cyan-600">آب</div>
            <div className="font-bold text-cyan-700">{chart.elements.water}</div>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 p-6 rounded-lg border border-purple-200/50">
        <h3 className="text-lg font-bold text-purple-900 mb-4">
          📖 تفسیر نقشه تولد
        </h3>
        <div className="text-purple-800 text-sm leading-relaxed whitespace-pre-line">
          {chart.interpretation}
        </div>
      </div>

      {/* Compatibility */}
      <div className="bg-pink-50/80 p-6 rounded-lg border border-pink-200/50">
        <h3 className="text-lg font-bold text-pink-900 mb-4">
          💕 سازگاری عاطفی
        </h3>
        <div className="flex flex-wrap gap-2">
          {chart.compatibility.map((sign, index) => (
            <span
              key={index}
              className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {sign}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};