
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
    <div className="rounded-2xl border shadow-sm neo-glass p-5 h-64">
      <SectionDescription title={title} description={description} />
      <div className="flex justify-center">
        <Button 
          onClick={onLoadComponent}
          variant="apple"
          size="apple-sm"
          className="bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none shadow-md"
        >
          {buttonText}
          <ChevronRight size={16} className="mr-1 rtl:rotate-180 text-white" />
        </Button>
      </div>
    </div>
  );
};
