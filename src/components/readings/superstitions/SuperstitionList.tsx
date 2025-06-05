
import React from 'react';
import { motion } from 'framer-motion';
import { Superstition } from '@/data/persian-superstitions';

interface SuperstitionListProps {
  superstitions: Superstition[];
  onSelectSuperstition: (superstition: Superstition) => void;
}

const SuperstitionList: React.FC<SuperstitionListProps> = ({ 
  superstitions, 
  onSelectSuperstition 
}) => {
  if (superstitions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">هیچ خرافتی با این جستجو یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {superstitions.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectSuperstition(item)}
          className="bg-white/80 p-3 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-purple-800 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
            </div>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SuperstitionList;
