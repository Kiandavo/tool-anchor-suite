import React, { Suspense } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Zap, Clock, Target, Globe2, Star, Award, TrendingUp, Atom, Infinity } from "lucide-react";
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
    <div className="relative" dir="rtl">
      {/* 3D Background for content */}
      <ThreeJSErrorBoundary>
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-5">
            <SimpleCosmicBackground count={100} />
          </div>
        </Suspense>
      </ThreeJSErrorBoundary>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 space-y-8"
      >
        {/* Universe Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-full mb-8 shadow-2xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 animate-pulse"></div>
            <Globe2 className="w-16 h-16 text-blue-400 relative z-10" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse"></div>
          </motion.div>
          
          <h2 className="text-5xl font-light text-white mb-6 tracking-tight">{universe.name}</h2>
          
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            <Badge className="bg-blue-500/20 backdrop-blur-md text-blue-200 border-blue-400/30 px-6 py-3 rounded-full font-medium text-lg">
              <Atom className="w-4 h-4 ml-2" />
              {universe.type}
            </Badge>
            
            <Badge className={`backdrop-blur-md px-6 py-3 rounded-full font-medium text-lg ${
              probabilityPercentage > 50 
                ? 'bg-green-500/20 text-green-200 border-green-400/30' 
                : probabilityPercentage > 20 
                ? 'bg-amber-500/20 text-amber-200 border-amber-400/30'
                : 'bg-red-500/20 text-red-200 border-red-400/30'
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
                className="h-4 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/80 mt-3 font-light text-lg">احتمال وجود در کیهان موازی</p>
          </div>
        </div>

        {/* Content Grid with Glassmorphism */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Universe Description */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:bg-white/10 group">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center ml-5 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">توضیحات جهان</h3>
              </div>
              <p className="text-white/90 leading-relaxed font-light text-xl">
                {universe.description}
              </p>
            </CardContent>
          </Card>

          {/* Your Identity */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:bg-white/10 group">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center ml-5 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">شما در این جهان</h3>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-3xl p-8 border border-blue-400/20">
                <p className="text-white/90 font-medium text-xl leading-relaxed">
                  {universe.youInThisUniverse}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Characteristics */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardContent className="p-10">
            <div className="flex items-center mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ml-5 shadow-2xl">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">ویژگی‌های خاص این جهان</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universe.characteristics.map((characteristic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/30 hover:bg-purple-500/10 transition-all duration-500 group cursor-pointer"
                >
                  <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full ml-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-purple-400/50"></div>
                  <span className="text-white/90 font-medium text-lg">{characteristic}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quantum Information Panel */}
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border-indigo-400/20 shadow-2xl">
          <CardContent className="p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ml-5 shadow-2xl">
                  <Infinity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-2">اطلاعات کوانتومی</h4>
                  <p className="text-white/80 font-light text-lg">
                    محاسبه شده بر اساس نظریه چندجهانی کوانتومی
                  </p>
                </div>
              </div>
              <div className="text-left">
                <div className="text-4xl font-light text-indigo-300 mb-2">
                  {probabilityPercentage.toFixed(2)}%
                </div>
                <div className="text-white/70 font-light">احتمال وجود</div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-indigo-400/20">
              <div className="flex items-center justify-center gap-12 text-white/80 flex-wrap">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 ml-3 text-indigo-400" />
                  <span className="text-lg">احتمال محاسبه شده</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 ml-3 text-indigo-400" />
                  <span className="text-lg">زمان‌بندی کوانتومی</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 ml-3 text-indigo-400" />
                  <span className="text-lg">تأیید شده علمی</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};