
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Superstition } from '@/data/persian-superstitions';

interface SuperstitionDetailProps {
  superstition: Superstition;
  onBack: () => void;
}

const SuperstitionDetail: React.FC<SuperstitionDetailProps> = ({ 
  superstition, 
  onBack 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/90 p-4 rounded-lg border border-purple-200"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-purple-800 flex items-center">
          <Star className="ml-2" size={18} />
          {superstition.title}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-purple-300 text-purple-700 hover:bg-purple-100"
        >
          بازگشت
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-purple-700 mb-1">توضیحات:</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {superstition.description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-purple-700 mb-1">منشأ:</h4>
          <p className="text-sm text-gray-600">{superstition.origin}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-purple-200">
          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            {superstition.category}
          </span>
          <span className="text-xs text-gray-500">
            باور مردمی ایرانی
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SuperstitionDetail;
