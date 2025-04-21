
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Moon, Sun, Languages, Mail } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fa');
  
  return (
    <Layout title="تنظیمات" backUrl="/" showSearch={false}>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تنظیمات</h1>
        
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {darkMode ? <Moon size={20} className="ml-2 text-primary" /> : <Sun size={20} className="ml-2 text-primary" />}
              <div>
                <h3 className="text-lg font-medium text-gray-800">حالت تاریک</h3>
                <p className="text-sm text-gray-500">تغییر بین حالت روشن و تاریک</p>
              </div>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${darkMode ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-1' : 'translate-x-7'}`} 
              />
            </button>
          </div>
          
          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Languages size={20} className="ml-2 text-primary" />
              <div>
                <h3 className="text-lg font-medium text-gray-800">زبان</h3>
                <p className="text-sm text-gray-500">انتخاب زبان نمایش برنامه</p>
              </div>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
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
            <div className="text-sm text-gray-600 flex items-center">
              <Mail size={16} className="ml-2 text-primary" />
              info@anchor-tools.ir
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
