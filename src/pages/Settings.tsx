
import React from 'react';
import { Layout } from '@/components/Layout';
import { Globe, Palette, User } from 'lucide-react';
import AboutSection from '@/components/settings/AboutSection';
import ContactSection from '@/components/settings/ContactSection';
import ThemeSection from '@/components/settings/ThemeSection';
import PersonalizationSection from '@/components/settings/PersonalizationSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تنظیمات</h1>
        
        <Tabs defaultValue="appearance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance" className="text-xs sm:text-sm">ظاهر</TabsTrigger>
            <TabsTrigger value="personalization" className="text-xs sm:text-sm">شخصی‌سازی</TabsTrigger>
            <TabsTrigger value="language" className="text-xs sm:text-sm">زبان</TabsTrigger>
            <TabsTrigger value="about" className="text-xs sm:text-sm">درباره ما</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <ThemeSection />
          </TabsContent>
          
          <TabsContent value="personalization">
            <PersonalizationSection />
          </TabsContent>
          
          <TabsContent value="language" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">زبان</h3>
              <p className="text-sm text-gray-500">انتخاب زبان نمایش برنامه</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="icon-text">
                <Globe size={22} className="text-primary" />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">زبان فارسی</h3>
                  <p className="text-sm text-gray-500">زبان پیش‌فرض برنامه</p>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                فعال
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-4">
            <AboutSection />
            <ContactSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
