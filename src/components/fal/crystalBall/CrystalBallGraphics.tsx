import React from 'react';

interface CrystalBallGraphicsProps {
  isActive: boolean;
}

export const CrystalBallGraphics: React.FC<CrystalBallGraphicsProps> = ({ isActive }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Mystical background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-violet-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-400 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-purple-300 rounded-full animate-float ${isActive ? 'opacity-100' : 'opacity-30'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Crystal ball glow effect */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-gradient-radial from-purple-200/30 via-violet-200/20 to-transparent rounded-full animate-pulse"></div>
        </div>
      )}
      
      {/* Mystical symbols */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 text-purple-400 text-lg animate-spin-slow">✦</div>
        <div className="absolute top-8 right-8 text-violet-400 text-xl animate-pulse">✧</div>
        <div className="absolute bottom-8 left-8 text-indigo-400 text-lg animate-spin-slow-reverse">✦</div>
        <div className="absolute bottom-4 right-4 text-purple-400 text-xl animate-pulse delay-1000">✧</div>
      </div>
    </div>
  );
};