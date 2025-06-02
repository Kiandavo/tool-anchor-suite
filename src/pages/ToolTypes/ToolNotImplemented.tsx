
import React from 'react';
import { Construction, Clock } from 'lucide-react';

interface ToolNotImplementedProps {
  isComingSoon?: boolean;
  toolName?: string;
}

const ToolNotImplemented: React.FC<ToolNotImplementedProps> = ({ 
  isComingSoon = false, 
  toolName = "این ابزار" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {isComingSoon ? (
          <Clock size={32} className="text-gray-400" />
        ) : (
          <Construction size={32} className="text-gray-400" />
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {isComingSoon ? `${toolName} به زودی` : `${toolName} در حال توسعه`}
      </h3>
      
      <p className="text-gray-600 max-w-md">
        {isComingSoon 
          ? "این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید."
          : "این ابزار در حال حاضر در دست توسعه است و به زودی در دسترس قرار خواهد گرفت."
        }
      </p>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          💡 پیشنهاد: از ابزارهای مشابه در دسته‌بندی‌های مختلف استفاده کنید
        </p>
      </div>
    </div>
  );
};

export default ToolNotImplemented;
