
import React from 'react';
import { Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ThemeSection = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-800">تنظیمات تم</h3>
        <p className="text-sm text-gray-500">حالت نمایش برنامه</p>
      </div>
      
      <div className="bg-white border-2 border-primary rounded-md p-4">
        <div className="flex flex-col items-center justify-center text-center">
          <Sun className="mb-3 h-8 w-8 text-primary" />
          <span className="font-medium text-gray-800">تم روشن</span>
          <span className="text-sm text-gray-500 mt-1">فعال است</span>
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="text-blue-700 text-sm text-center">
          برای بهترین تجربه کاربری، تنها تم روشن در دسترس است.
        </p>
      </div>
    </div>
  );
};

export default ThemeSection;
