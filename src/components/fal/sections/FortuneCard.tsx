
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { SectionDescription } from './SectionDescription';

interface FortuneCardProps {
  title: string;
  description: string;
  buttonText: string;
  onLoadComponent: () => void;
  gradientFrom: string;
  gradientTo: string;
}

export const FortuneCard: React.FC<FortuneCardProps> = ({
  title,
  description,
  buttonText,
  onLoadComponent,
  gradientFrom,
  gradientTo
}) => {
  return (
    <div className="rounded-2xl border border-purple-200/50 shadow-lg neo-glass p-6 h-72 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-sm">
      <SectionDescription title={title} description={description} />
      <div className="flex justify-center mt-6">
        <Button 
          onClick={onLoadComponent}
          variant="apple"
          size="apple-sm"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none shadow-lg font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
        >
          {buttonText}
          <ChevronRight size={18} className="mr-2 rtl:rotate-180 text-white" />
        </Button>
      </div>
    </div>
  );
};
