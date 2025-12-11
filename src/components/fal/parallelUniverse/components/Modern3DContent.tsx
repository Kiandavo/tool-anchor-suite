import React, { Suspense } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Zap, Clock, Target, Globe2, Star, Award, TrendingUp, Atom, Infinity as InfinityIcon } from "lucide-react";
import { ParallelUniverse } from '../types';
import { motion } from 'framer-motion';
import { SimpleCosmicBackground } from './SimpleCosmicBackground';
import { ThreeJSErrorBoundary } from './ThreeJSErrorBoundary';

interface Modern3DContentProps {
  universe: ParallelUniverse;
  hasNewUniverse: boolean;
}

export const Modern3DContent: React.FC<Modern3DContentProps> = ({ 
  universe, 
  hasNewUniverse 
}) => {
  const probabilityPercentage = (universe.probability * 100);

  return (
    <div className="relative bg-gradient-to-br from-background to-muted/50 rounded-2xl border shadow-lg" dir="rtl">
      {/* 3D Background for content */}
      <ThreeJSErrorBoundary>
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-20 rounded-2xl">
            <SimpleCosmicBackground count={100} />
          </div>
        </Suspense>
      </ThreeJSErrorBoundary>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 space-y-8 p-8"
      >
        {/* Universe Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 backdrop-blur-xl rounded-full mb-8 shadow-2xl border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
            <Globe2 className="w-16 h-16 text-primary relative z-10" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
          </motion.div>
          
          <h2 className="text-5xl font-light text-foreground mb-6 tracking-tight">{universe.name}</h2>
          
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            <Badge className="bg-primary/10 backdrop-blur-md text-primary border-primary/30 px-6 py-3 rounded-full font-medium text-lg">
              <Atom className="w-4 h-4 ml-2" />
              {universe.type}
            </Badge>
            
            <Badge className={`backdrop-blur-md px-6 py-3 rounded-full font-medium text-lg ${
              probabilityPercentage > 50 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : probabilityPercentage > 20 
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-red-100 text-red-800 border-red-200'
            }`}>
              <Target className="w-4 h-4 ml-2" />
              احتمال: {probabilityPercentage.toFixed(4)}%
            </Badge>
          </div>

          {/* 3D Progress Visualization */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Progress 
                value={probabilityPercentage} 
                className="h-4 bg-muted backdrop-blur-sm rounded-full overflow-hidden border"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-full animate-pulse"></div>
            </div>
            <p className="text-muted-foreground mt-3 font-light text-lg">احتمال وجود در کیهان موازی</p>
          </div>
        </div>

        {/* Content Grid with Glassmorphism */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Universe Description */}
          <Card className="neo-glass shadow-2xl hover:shadow-lg transition-all duration-500 hover:scale-[1.02] group">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 gradient-persian rounded-full flex items-center justify-center ml-5 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">توضیحات جهان</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed font-light text-xl">
                {universe.description}
              </p>
            </CardContent>
          </Card>

          {/* Your Identity */}
          <Card className="neo-glass shadow-2xl hover:shadow-lg transition-all duration-500 hover:scale-[1.02] group">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center ml-5 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">شما در این جهان</h3>
              </div>
              <div className="bg-primary/10 backdrop-blur-sm rounded-3xl p-8 border border-primary/20">
                <p className="text-foreground/80 font-medium text-xl leading-relaxed">
                  {universe.youInThisUniverse}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Characteristics */}
        <Card className="neo-glass shadow-2xl">
          <CardContent className="p-10">
            <div className="flex items-center mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ml-5 shadow-2xl">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">ویژگی‌های خاص این جهان</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universe.characteristics.map((characteristic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center p-6 bg-muted/50 backdrop-blur-sm rounded-2xl border hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 group cursor-pointer"
                >
                  <div className="w-4 h-4 bg-primary rounded-full ml-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-lg"></div>
                  <span className="text-foreground/90 font-medium text-lg">{characteristic}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quantum Information Panel */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-xl border-purple-500/30 shadow-2xl">
          {/* Animated background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
          </div>
          
          <CardContent className="relative z-10 p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
              <motion.div 
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Atom className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-ping" style={{ animationDuration: '3s' }} />
              </motion.div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">اطلاعات کوانتومی</h4>
                <p className="text-purple-200/70 text-sm">
                  برآورد شده بر اساس نظریه چندجهانی کوانتومی
                </p>
              </div>
            </div>
            
            {/* Main Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Probability Gauge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-gradient-to-b from-purple-500/20 to-transparent rounded-3xl p-6 border border-purple-500/20 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  {/* Orbiting particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2"
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 6 + i * 0.5, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: i * 0.3 
                      }}
                      style={{ 
                        width: 120 + i * 8, 
                        height: 120 + i * 8,
                        marginLeft: -(60 + i * 4),
                        marginTop: -(60 + i * 4),
                      }}
                    >
                      <motion.div
                        className="absolute rounded-full"
                        style={{
                          width: 4 + (i % 3) * 2,
                          height: 4 + (i % 3) * 2,
                          top: 0,
                          left: '50%',
                          background: i % 2 === 0 
                            ? 'linear-gradient(135deg, #a855f7, #06b6d4)' 
                            : 'linear-gradient(135deg, #06b6d4, #a855f7)',
                          boxShadow: i % 2 === 0 
                            ? '0 0 10px #a855f7, 0 0 20px #a855f780' 
                            : '0 0 10px #06b6d4, 0 0 20px #06b6d480',
                        }}
                        animate={{ 
                          opacity: [0.4, 1, 0.4],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      />
                    </motion.div>
                  ))}
                  
                  {/* Floating sparkle particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: 2,
                        height: 2,
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        y: [-10, 10],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                  
                  {/* Circular gauge background */}
                  <svg className="w-full h-full transform -rotate-90 relative z-10">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-purple-500/20"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 352" }}
                      animate={{ strokeDasharray: `${probabilityPercentage * 3.52} 352` }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <motion.span 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {probabilityPercentage.toFixed(2)}%
                    </motion.span>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl z-0" />
                </div>
                <div className="text-purple-200 font-medium">احتمال وجود</div>
                <div className="text-purple-300/50 text-xs mt-1">Existence Probability</div>
              </motion.div>
              
              {/* Quantum State */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative bg-gradient-to-b from-cyan-500/20 to-transparent rounded-3xl p-6 border border-cyan-500/20 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-4 rounded-full border-2 border-dashed border-cyan-400/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-8 rounded-full border-2 border-cyan-400/30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/50" />
                </div>
                <div className="text-cyan-200 font-medium">وضعیت کوانتومی</div>
                <div className="text-cyan-300/50 text-xs mt-1">Quantum State: Active</div>
              </motion.div>
              
              {/* Multiverse Index */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative bg-gradient-to-b from-amber-500/20 to-transparent rounded-3xl p-6 border border-amber-500/20 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <motion.div
                    className="text-5xl font-black text-transparent bg-gradient-to-br from-amber-400 to-orange-500 bg-clip-text"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    ∞
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-24 h-24 rounded-full border border-amber-400/30"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
                <div className="text-amber-200 font-medium">شاخص چندجهانی</div>
                <div className="text-amber-300/50 text-xs mt-1">Multiverse Index</div>
              </motion.div>
            </div>
            
            {/* Bottom Stats Bar */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">فعال</span>
                  </div>
                  <div className="text-white/60 text-sm">احتمال برآورد شده</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 font-semibold">همزمان</span>
                  </div>
                  <div className="text-white/60 text-sm">زمان‌بندی کوانتومی</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-semibold">تأیید شده</span>
                  </div>
                  <div className="text-white/60 text-sm">نظریه علمی</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <InfinityIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 font-semibold">نامتناهی</span>
                  </div>
                  <div className="text-white/60 text-sm">جهان‌های موازی</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};