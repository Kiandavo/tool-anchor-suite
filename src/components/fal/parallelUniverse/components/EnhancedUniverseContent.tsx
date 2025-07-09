import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Search, Zap, Clock, Target, Globe2 } from "lucide-react";
import { ParallelUniverse } from '../types';
import { motion } from 'framer-motion';

interface EnhancedUniverseContentProps {
  universe: ParallelUniverse;
  hasNewUniverse: boolean;
}

export const EnhancedUniverseContent: React.FC<EnhancedUniverseContentProps> = ({ 
  universe, 
  hasNewUniverse 
}) => {
  const probabilityPercentage = (universe.probability * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Universe Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-xl"
        >
          <Globe2 className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{universe.name}</h2>
        
        <div className="flex justify-center items-center gap-2 mb-4">
          <Badge 
            variant="secondary" 
            className="text-sm px-3 py-1 bg-blue-50 text-blue-700 border-blue-200"
          >
            {universe.type}
          </Badge>
          
          <Badge 
            variant="secondary" 
            className={`text-sm px-3 py-1 ${
              probabilityPercentage > 50 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : probabilityPercentage > 20 
                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            <Target className="w-3 h-3 mr-1" />
            احتمال: {probabilityPercentage.toFixed(4)}%
          </Badge>
        </div>

        <Progress 
          value={probabilityPercentage} 
          className="w-full max-w-md mx-auto mb-4 h-2"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Universe Description */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">توضیحات جهان</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {universe.description}
            </p>
          </CardContent>
        </Card>

        {/* Your Identity */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">شما در این جهان</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <p className="text-gray-700 font-medium text-sm leading-relaxed">
                {universe.youInThisUniverse}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Characteristics */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-3">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">ویژگی‌های خاص این جهان</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {universe.characteristics.map((characteristic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{characteristic}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quantum Info Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">اطلاعات کوانتومی</h4>
              <p className="text-sm text-gray-600">
                این جهان بر اساس نظریه چندجهانی کوانتومی ایجاد شده است
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {probabilityPercentage.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500">احتمال وجود</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};