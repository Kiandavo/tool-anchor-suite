import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Clock, Target, Globe2, Star, Award, TrendingUp } from "lucide-react";
import { ParallelUniverse } from '../types';
import { motion } from 'framer-motion';

interface AppleUniverseContentProps {
  universe: ParallelUniverse;
  hasNewUniverse: boolean;
}

export const AppleUniverseContent: React.FC<AppleUniverseContentProps> = ({ 
  universe, 
  hasNewUniverse 
}) => {
  const probabilityPercentage = (universe.probability * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Apple-style Universe Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center justify-center w-28 h-28 bg-white/80 backdrop-blur-xl rounded-3xl mb-6 shadow-2xl border border-white/50"
        >
          <Globe2 className="w-14 h-14 text-blue-600" />
        </motion.div>
        
        <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">{universe.name}</h2>
        
        <div className="flex justify-center items-center gap-3 mb-6">
          <Badge className="bg-blue-50/80 backdrop-blur-md text-blue-700 border-blue-200/50 px-4 py-2 rounded-full font-medium">
            {universe.type}
          </Badge>
          
          <Badge className={`backdrop-blur-md px-4 py-2 rounded-full font-medium ${
            probabilityPercentage > 50 
              ? 'bg-green-50/80 text-green-700 border-green-200/50' 
              : probabilityPercentage > 20 
              ? 'bg-amber-50/80 text-amber-700 border-amber-200/50'
              : 'bg-red-50/80 text-red-700 border-red-200/50'
          }`}>
            <Target className="w-3 h-3 mr-1" />
            {probabilityPercentage.toFixed(4)}%
          </Badge>
        </div>

        {/* Apple-style Progress Bar */}
        <div className="max-w-md mx-auto">
          <Progress 
            value={probabilityPercentage} 
            className="h-2 bg-gray-200/50 backdrop-blur-sm rounded-full overflow-hidden"
          />
          <p className="text-sm text-gray-500 mt-2 font-light">احتمال وجود این جهان</p>
        </div>
      </div>

      {/* Apple-style Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Universe Description Card */}
        <Card className="bg-white/70 backdrop-blur-xl border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">توضیحات جهان</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-light text-lg">
              {universe.description}
            </p>
          </CardContent>
        </Card>

        {/* Your Identity Card */}
        <Card className="bg-white/70 backdrop-blur-xl border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">شما در این جهان</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/30">
              <p className="text-gray-700 font-medium text-lg leading-relaxed">
                {universe.youInThisUniverse}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Apple-style Characteristics */}
      <Card className="bg-white/70 backdrop-blur-xl border-white/50 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">ویژگی‌های خاص این جهان</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {universe.characteristics.map((characteristic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center p-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:border-purple-300/50 hover:bg-purple-50/50 transition-all duration-300 group"
              >
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                <span className="text-gray-700 font-medium">{characteristic}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apple-style Quantum Info */}
      <Card className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-xl border-indigo-200/50 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-1">اطلاعات کوانتومی</h4>
                <p className="text-gray-600 font-light">
                  محاسبه شده بر اساس نظریه چندجهانی کوانتومی
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-indigo-600 mb-1">
                {probabilityPercentage.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500 font-light">احتمال وجود</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-indigo-200/30">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-indigo-500" />
                <span>احتمال محاسبه شده</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                <span>زمان‌بندی کوانتومی</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};