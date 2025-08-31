
import React from 'react';
import { Heart, InfoIcon, Shield } from 'lucide-react';

const AboutSection = () => {
  return (
    <div>
      <div className="icon-text mb-4">
        <InfoIcon size={22} className="text-primary" />
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">درباره لنگر</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 pr-9">
        لنگر مجموعه‌ای از +۸۰ ابزار رایگان تحت وب است که بدون نیاز به ثبت‌نام و با حفظ حریم خصوصی شما ارائه می‌شود.
      </p>
      
      <div className="icon-text mb-4 mt-6">
        <Shield size={22} className="text-primary" />
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-100">حریم خصوصی</h4>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 pr-9">
        تمامی پردازش‌ها در مرورگر شما انجام می‌شود و هیچ داده‌ای به سرور ارسال نمی‌شود.
      </p>

      <div className="icon-text justify-center mt-8">
        <Heart size={16} className="text-red-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400">ساخته شده با عشق برای کاربران فارسی‌زبان</span>
      </div>
    </div>
  );
};

export default AboutSection;
