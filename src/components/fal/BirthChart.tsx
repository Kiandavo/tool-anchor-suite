import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBirthChart } from './birthChart/useBirthChart';
import { BirthDataForm } from './birthChart/BirthDataForm';
import { ChartDisplay } from './birthChart/ChartDisplay';
import { AstrologyGuide } from './shared/AstrologyGuide';
// Remove ZodiacConstellation import for now

export const BirthChart = () => {
  const {
    birthData,
    chart,
    isLoading,
    isAnimating,
    handleBirthDataChange,
    generateChart,
    copyChart
  } = useBirthChart();
  
  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm shadow-2xl border-purple-200/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {/* Zodiac background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-indigo-100/20"></div>
      </div>
      
      <CardHeader className="text-center relative z-10">
        <CardTitle className="text-2xl font-bold text-purple-900 mb-2">
          🌟 نقشه آسمان تولد
        </CardTitle>
        <p className="text-purple-700 text-sm">
          کشف رازهای شخصیت و سرنوشت از طریق موقعیت ستارگان
        </p>
        <AstrologyGuide />
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        <BirthDataForm 
          birthData={birthData}
          onChange={handleBirthDataChange}
        />
        
        {chart && (
          <ChartDisplay 
            chart={chart}
            isAnimating={isAnimating}
          />
        )}
      </CardContent>

      <CardFooter className="flex gap-3 justify-center relative z-10">
        <Button 
          onClick={generateChart}
          disabled={isLoading || !birthData.date || !birthData.time || !birthData.location}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {isLoading ? 'در حال برآورد...' : 'برآورد نقشه تولد'}
        </Button>
        
        {chart && (
          <Button 
            onClick={copyChart}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-2 rounded-lg font-medium transition-all"
          >
            کپی نتیجه
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};