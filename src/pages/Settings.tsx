import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Moon, Sun, Languages, Mail, Heart, InfoIcon, Shield, Globe } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  // Get the initial dark mode value from localStorage, defaulting to false if not set
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const [language, setLanguage] = useState('fa');

  // Apply dark mode when component mounts or darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return <Layout title="تنظیمات" backUrl="/" showSearch={false}>
      <div className="bg-background dark:bg-background rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground mb-6">تنظیمات</h1>
        
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {darkMode ? (
                <Moon size={22} className="ml-3 text-primary" />
              ) : (
                <Sun size={22} className="ml-3 text-primary" />
              )}
              <div>
                <h3 className="text-lg font-medium text-foreground dark:text-foreground">حالت تاریک</h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">تغییر رنگ‌بندی برنامه</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>
          
          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe size={22} className="ml-3 text-primary" />
              <div>
                <h3 className="text-lg font-medium text-foreground dark:text-foreground">زبان</h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">انتخاب زبان نمایش برنامه</p>
              </div>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="fa">فارسی</option>
              <option value="en">English</option>
            </select>
          </div>
          
          {/* About Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <InfoIcon size={22} className="ml-3 text-primary" />
              <h3 className="text-lg font-medium text-foreground dark:text-foreground">درباره لنگر</h3>
            </div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4 pr-9">
              لنگر مجموعه‌ای از بیش از ۱۲۰ ابزار رایگان تحت وب است که بدون نیاز به ثبت‌نام و با حفظ حریم خصوصی شما ارائه می‌شود.
            </p>
            
            <div className="flex items-center mb-4 mt-6">
              <Shield size={22} className="ml-3 text-primary" />
              <h4 className="text-md font-medium text-foreground dark:text-foreground">حریم خصوصی</h4>
            </div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4 pr-9">
              تمامی پردازش‌ها در مرورگر شما انجام می‌شود و هیچ داده‌ای به سرور ارسال نمی‌شود.
            </p>
            
            <div className="flex items-center mb-4 mt-6">
              <Mail size={22} className="ml-3 text-primary" />
              <h4 className="text-md font-medium text-foreground dark:text-foreground">تماس با ما</h4>
            </div>
            <div className="text-sm text-muted-foreground dark:text-muted-foreground flex items-center pr-9">
              <span className="ml-2">info@helpfuladvertising.com</span>
            </div>
            
            <div className="flex items-center justify-center mt-8">
              <Heart size={16} className="ml-2 text-red-500" />
              <span className="text-sm text-muted-foreground dark:text-muted-foreground">ساخته شده با عشق برای کاربران فارسی‌زبان</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};

export default Settings;
