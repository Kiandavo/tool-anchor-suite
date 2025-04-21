
import React from 'react';
import { Layout } from '@/components/Layout';

const Settings = () => {
  return (
    <Layout title="تنظیمات" backUrl="/" showSearch={false}>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تنظیمات</h1>
        
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">حالت تاریک</h3>
              <p className="text-sm text-gray-500">تغییر بین حالت روشن و تاریک</p>
            </div>
            <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors">
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm"></span>
            </div>
          </div>
          
          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">زبان</h3>
              <p className="text-sm text-gray-500">انتخاب زبان نمایش برنامه</p>
            </div>
            <select className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="fa">فارسی</option>
              <option value="en">English</option>
            </select>
          </div>
          
          {/* About Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">درباره لنگر</h3>
            <p className="text-sm text-gray-600 mb-4">
              لنگر مجموعه‌ای از بیش از ۱۲۰ ابزار رایگان تحت وب است که بدون نیاز به ثبت‌نام و با حفظ حریم خصوصی شما ارائه می‌شود.
            </p>
            
            <h4 className="text-md font-medium text-gray-800 mb-2">حریم خصوصی</h4>
            <p className="text-sm text-gray-600 mb-4">
              تمامی پردازش‌ها در مرورگر شما انجام می‌شود و هیچ داده‌ای به سرور ارسال نمی‌شود.
            </p>
            
            <h4 className="text-md font-medium text-gray-800 mb-2">تماس با ما</h4>
            <p className="text-sm text-gray-600">
              info@anchor-tools.ir
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
