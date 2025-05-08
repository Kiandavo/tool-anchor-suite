
import React from 'react';
import { Globe } from "lucide-react";

const UniverseLoadingState: React.FC = () => {
  return (
    <div className="text-center text-gray-600 text-sm py-4">
      <p className="mb-3">در حال جستجوی جهان‌های موازی...</p>
      <div className="mt-3 flex justify-center">
        <div className="animate-spin">
          <Globe size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default UniverseLoadingState;
