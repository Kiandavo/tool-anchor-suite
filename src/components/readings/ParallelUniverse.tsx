import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Sparkles, Eye, Copy, RefreshCw, Zap, Heart, Clock, Scroll } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from "@/hooks/use-toast";
import { parallelUniverses, ParallelUniverse, UNIVERSE_TYPES, UNIVERSE_TYPE_LABELS } from '@/data/parallel-universes';

// Enhanced particle background with transparency
const ParticleBackground = ({ type }: { type?: ParallelUniverse['type'] }) => {
  const getParticleColor = () => {
    switch (type) {
      case 'utopian': return 'rgba(34, 197, 94, 0.3)';
      case 'dystopian': return 'rgba(239, 68, 68, 0.3)';
      case 'bizarre': return 'rgba(168, 85, 247, 0.3)';
      case 'historical': return 'rgba(245, 158, 11, 0.3)';
      default: return 'rgba(59, 130, 246, 0.3)';
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden opacity-60">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 400}
            cy={Math.random() * 400}
            r={Math.random() * 4 + 1}
            fill={getParticleColor()}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const UniverseTypeIcon = ({ type }: { type: ParallelUniverse['type'] }) => {
  const icons = {
    utopian: <Heart className="w-5 h-5 text-green-500" />,
    dystopian: <Zap className="w-5 h-5 text-red-500" />,
    bizarre: <Sparkles className="w-5 h-5 text-purple-500" />,
    historical: <Scroll className="w-5 h-5 text-amber-500" />
  };
  return icons[type];
};

const ProbabilityBadge = ({ probability }: { probability: ParallelUniverse['probability'] }) => {
  const styles = {
    low: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-green-100 text-green-800 border-green-200'
  };

  const labels = {
    low: 'احتمال کم',
    medium: 'احتمال متوسط',
    high: 'احتمال زیاد'
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${styles[probability]}`}>
      {labels[probability]}
    </span>
  );
};

const ParallelUniverseReading = () => {
  const [selectedUniverse, setSelectedUniverse] = useState<ParallelUniverse | null>(null);
  const [filterType, setFilterType] = useState<typeof UNIVERSE_TYPES[number]>('همه');
  const [isExploring, setIsExploring] = useState(false);
  const { toast } = useToast();

  const filteredUniverses = parallelUniverses.filter(universe => 
    filterType === 'همه' || universe.type === filterType
  );

  const exploreRandomUniverse = () => {
    setIsExploring(true);
    
    setTimeout(() => {
      const randomUniverse = filteredUniverses[Math.floor(Math.random() * filteredUniverses.length)];
      setSelectedUniverse(randomUniverse);
      setIsExploring(false);
      
      toast({
        title: "جهان موازی کشف شد! 🌌",
        description: `به ${randomUniverse.name} خوش آمدید`,
      });
    }, 2000);
  };

  const copyUniverse = async () => {
    if (!selectedUniverse) return;
    
    const text = `جهان موازی: ${selectedUniverse.name} 🌌

📖 توضیحات:
${selectedUniverse.description}

👤 داستان شخصی شما:
${selectedUniverse.personalStory}

🔍 تفاوت‌های کلیدی:
${selectedUniverse.keyDifferences.map(diff => `• ${diff}`).join('\n')}

🎨 توصیف بصری:
${selectedUniverse.visualDescription}

📊 احتمال وجود: ${selectedUniverse.probability === 'low' ? 'کم' : selectedUniverse.probability === 'medium' ? 'متوسط' : 'زیاد'}
🏷️ نوع: ${selectedUniverse.type === 'utopian' ? 'آرمانی' : selectedUniverse.type === 'dystopian' ? 'تاریک' : selectedUniverse.type === 'bizarre' ? 'عجیب' : 'تاریخی متفاوت'}`;
    
    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: "کپی شد! 🌟",
        description: "جهان موازی در کلیپ‌بورد شما ذخیره شد",
      });
    }
  };

  const resetExploration = () => {
    setSelectedUniverse(null);
    setFilterType('همه');
  };

  return (
    <Card className="relative overflow-hidden bg-white border-2 border-indigo-300 shadow-xl">
      <ParticleBackground type={selectedUniverse?.type} />
      
      <CardHeader className="relative z-10 bg-indigo-700 text-center py-6">
        <motion.div 
          className="flex items-center justify-center"
          animate={{ scale: selectedUniverse ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Globe className="text-white ml-3" size={24} />
          <h2 className="text-2xl font-bold text-white">
            {selectedUniverse ? selectedUniverse.name : 'کاوشگر جهان‌های موازی'}
          </h2>
          <Sparkles className="text-white mr-3" size={20} />
        </motion.div>
        <p className="text-white mt-2 text-sm">
          {selectedUniverse ? 'دنیایی متفاوت از آنچه می‌شناسید' : '60 جهان موازی مختلف برای کاوش'}
        </p>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-6 px-6">
        <AnimatePresence mode="wait">
          {!selectedUniverse ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              {/* Introduction */}
              <div className="text-center bg-white p-6 rounded-xl border-2 border-indigo-200 shadow-lg">
                <Globe className="mx-auto mb-4 text-indigo-600" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  به کاوشگر جهان‌های موازی خوش آمدید
                </h3>
                <p className="text-gray-800 mb-4 leading-relaxed">
                  60 جهان موازی مختلف منتظر کاوش شما هستند. هر جهان داستان منحصربه‌فردی برای زندگی شما دارد.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {Object.entries(UNIVERSE_TYPE_LABELS).slice(1).map(([key, label]) => (
                    <div key={key} className="bg-gray-50 p-2 rounded-lg border border-gray-300">
                      <div className="flex items-center gap-1 mb-1">
                        <UniverseTypeIcon type={key as any} />
                        <span className="text-xs font-medium text-gray-900">{label}</span>
                      </div>
                      <span className="text-xs text-gray-700">
                        {parallelUniverses.filter(u => u.type === key).length} جهان
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filter Selection */}
              <div className="bg-white p-4 rounded-xl border-2 border-gray-300 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Eye className="ml-2" size={18} />
                  انتخاب نوع جهان موازی
                </h4>
                <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                  <SelectTrigger className="w-full h-12 border-2 border-gray-300 focus:border-indigo-500 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(UNIVERSE_TYPE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {key !== 'همه' && <UniverseTypeIcon type={key as any} />}
                          <span>{label}</span>
                          <span className="text-sm text-gray-500">
                            ({key === 'همه' ? parallelUniverses.length : parallelUniverses.filter(u => u.type === key).length})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Statistics */}
              <div className="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-300">
                <p className="text-center text-indigo-900 text-sm font-medium">
                  📊 در حال حاضر <strong>{filteredUniverses.length}</strong> جهان موازی برای کاوش در دسترس است
                </p>
              </div>
            </motion.div>
          ) : isExploring ? (
            <motion.div
              key="exploring"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <Globe className="text-indigo-600" size={48} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                در حال کاوش جهان‌های موازی...
              </h3>
              <p className="text-gray-800">
                ابعاد مختلف در حال بررسی هستند 🌌
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-6"
            >
              {/* Universe Header */}
              <div className="text-center bg-white p-4 rounded-xl border-2 border-indigo-300 shadow-md">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <UniverseTypeIcon type={selectedUniverse.type} />
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedUniverse.name}
                  </h3>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <ProbabilityBadge probability={selectedUniverse.probability} />
                  <span className="text-xs bg-gray-200 text-gray-900 px-2 py-1 rounded-full border border-gray-400">
                    {selectedUniverse.type === 'utopian' ? 'آرمانی' : 
                     selectedUniverse.type === 'dystopian' ? 'تاریک' : 
                     selectedUniverse.type === 'bizarre' ? 'عجیب' : 'تاریخی'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Globe className="ml-2" size={18} />
                  توضیحات جهان
                </h4>
                <p className="text-gray-900 leading-relaxed">
                  {selectedUniverse.description}
                </p>
              </div>

              {/* Personal Story */}
              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 shadow-lg">
                <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                  <Heart className="ml-2" size={18} />
                  داستان شخصی شما
                </h4>
                <p className="text-gray-900 leading-relaxed text-right">
                  {selectedUniverse.personalStory}
                </p>
              </div>

              {/* Key Differences */}
              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 shadow-lg">
                <h4 className="font-bold text-orange-900 mb-3 flex items-center">
                  <Sparkles className="ml-2" size={18} />
                  تفاوت‌های کلیدی
                </h4>
                <ul className="space-y-2">
                  {selectedUniverse.keyDifferences.map((diff, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-gray-900"
                    >
                      <div className="w-2 h-2 bg-orange-600 rounded-full ml-2 flex-shrink-0" />
                      {diff}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Visual Description */}
              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 shadow-lg">
                <h4 className="font-bold text-green-900 mb-3 flex items-center">
                  <Eye className="ml-2" size={18} />
                  چشم‌انداز بصری
                </h4>
                <p className="text-gray-900 leading-relaxed italic">
                  {selectedUniverse.visualDescription}
                </p>
              </div>

              {/* Probability Info */}
              <div className="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-300">
                <p className="text-center text-indigo-900 text-sm font-medium">
                  🎲 احتمال وجود این جهان بر اساس نظریات علمی: <strong>
                    {selectedUniverse.probability === 'low' ? 'کم' : 
                     selectedUniverse.probability === 'medium' ? 'متوسط' : 'زیاد'}
                  </strong>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="relative z-10 flex justify-center gap-3 pt-4 pb-6 bg-gray-50 border-t-2 border-gray-200">
        {!selectedUniverse ? (
          <Button
            onClick={exploreRandomUniverse}
            disabled={isExploring || filteredUniverses.length === 0}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            {isExploring ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="ml-2"
                >
                  <Globe size={16} />
                </motion.div>
                در حال کاوش...
              </>
            ) : (
              <>
                <Eye className="ml-2" size={16} />
                کاوش جهان تصادفی
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={copyUniverse}
              variant="outline"
              className="border-indigo-300 text-indigo-800 hover:bg-indigo-100 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Copy size={16} className="ml-1" />
              کپی جهان
            </Button>
            <Button
              onClick={exploreRandomUniverse}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Globe size={16} className="ml-1" />
              جهان جدید
            </Button>
            <Button
              onClick={resetExploration}
              variant="outline"
              className="border-indigo-300 text-indigo-800 hover:bg-indigo-100 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <RefreshCw size={16} className="ml-1" />
              شروع مجدد
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ParallelUniverseReading;