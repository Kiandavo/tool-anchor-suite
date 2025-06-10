
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Superstition } from '@/data/persian-superstitions';

interface SuperstitionDetailProps {
  superstition: Superstition;
  onBack: () => void;
}

const SuperstitionDetail: React.FC<SuperstitionDetailProps> = ({ superstition, onBack }) => {
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowRight size={16} className="ml-1" />
        بازگشت
      </Button>
      
      <div className="bg-white/50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-3">{superstition.title}</h3>
        
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-purple-700">توضیح:</strong>
            <p className="text-gray-700 mt-1">{superstition.description}</p>
          </div>
          
          <div>
            <strong className="text-purple-700">منشأ:</strong>
            <p className="text-gray-700 mt-1">{superstition.origin}</p>
          </div>
          
          <div>
            <strong className="text-purple-700">دسته‌بندی:</strong>
            <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs mr-2">
              {superstition.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperstitionDetail;
