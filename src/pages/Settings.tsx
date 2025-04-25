import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Moon, Sun, Globe } from 'lucide-react';
import AboutSection from '@/components/settings/AboutSection';
import ContactSection from '@/components/settings/ContactSection';

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
  const handleDarkModeToggle = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Layout title="تنظیمات" backUrl="/" showSearch={false}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">تنظیمات</h1>
        
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {darkMode ? <Sun size={22} className="ml-3 text-primary" /> : <Moon size={22} className="ml-3 text-primary" />}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">حالت تاریک</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">فعال یا غیرفعال کردن حالت تاریک</p>
              </div>
            </div>
            <button onClick={handleDarkModeToggle} className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
              <span className="sr-only">Enable notifications</span>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${darkMode ? 'translate-x-6 dark:bg-gray-300' : 'translate-x-1 dark:bg-gray-500'}`}></span>
            </button>
          </div>
          
          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe size={22} className="ml-3 text-primary" />
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">زبان</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">انتخاب زبان نمایش برنامه</p>
              </div>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="fa">فارسی</option>
              <option value="en">English</option>
            </select>
          </div>
          
          {/* About Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <AboutSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
