
import React from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Image } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          لنگر - ابزارهای آنلاین
        </h1>
        
        <p className="text-lg mb-8 text-gray-600">
          ابزارهای رایگان و کاربردی تحت وب
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
          <Link to="/category/calculators" className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-white">
            <Calculator className="w-8 h-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-medium mb-2">محاسبه‌گرها</h3>
            <p className="text-sm text-gray-600">ابزارهای محاسباتی</p>
          </Link>
          
          <Link to="/category/text" className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-white">
            <FileText className="w-8 h-8 mx-auto mb-4 text-green-600" />
            <h3 className="font-medium mb-2">ابزارهای متنی</h3>
            <p className="text-sm text-gray-600">پردازش متن</p>
          </Link>
          
          <Link to="/category/image" className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-white">
            <Image className="w-8 h-8 mx-auto mb-4 text-purple-600" />
            <h3 className="font-medium mb-2">ابزارهای تصویر</h3>
            <p className="text-sm text-gray-600">ویرایش تصاویر</p>
          </Link>
        </div>

        <Link 
          to="/all-tools"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          مشاهده همه ابزارها
        </Link>
      </div>
    </Layout>
  );
};

export default Index;
