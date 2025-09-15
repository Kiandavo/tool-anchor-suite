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

        {/* Quantum Information Panel */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl border-primary/20 shadow-2xl">
          <CardContent className="p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-14 h-14 gradient-persian rounded-full flex items-center justify-center ml-5 shadow-2xl">
                  <Infinity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-foreground mb-2">اطلاعات کوانتومی</h4>
                  <p className="text-muted-foreground font-light text-lg">
                    برآورد شده بر اساس نظریه چندجهانی کوانتومی
                  </p>
                </div>
              </div>
              <div className="text-left">
                <div className="text-4xl font-light text-primary mb-2">
                  {probabilityPercentage.toFixed(2)}%
                </div>
                <div className="text-muted-foreground font-light">احتمال وجود</div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-primary/20">
              <div className="flex items-center justify-center gap-12 text-muted-foreground flex-wrap">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 ml-3 text-primary" />
                  <span className="text-lg">احتمال برآورد شده</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 ml-3 text-primary" />
                  <span className="text-lg">زمان‌بندی کوانتومی</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 ml-3 text-primary" />
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