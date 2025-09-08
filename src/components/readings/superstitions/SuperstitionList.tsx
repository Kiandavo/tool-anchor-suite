
import React from 'react';
import { Button } from "@/components/ui/button";
import { Superstition } from '@/data/persian-superstitions';

interface SuperstitionListProps {
  superstitions: Superstition[];
  onSelectSuperstition: (superstition: Superstition) => void;
}

const SuperstitionList: React.FC<SuperstitionListProps> = ({ superstitions, onSelectSuperstition }) => {
  if (superstitions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm">موردی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {superstitions.map((superstition, index) => (
        <Button
          key={index}
          variant="outline"
          size="default"
          className="w-full justify-start text-right p-4 h-auto"
          onClick={() => onSelectSuperstition(superstition)}
        >
          <div className="text-right">
            <div className="font-medium text-sm">{superstition.title}</div>
            <div className="text-xs text-gray-500 mt-1">{superstition.category}</div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SuperstitionList;
