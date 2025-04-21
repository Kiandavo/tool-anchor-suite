
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { tools, Tool as ToolType } from '@/data/tools';
import { 
  TextIcon, 
  Image, 
  Search, 
  Calculator, 
  Hash, 
  Dice6, 
  Percent, 
  Binary, 
  Key, 
  Type, 
  Maximize, 
  Filter, 
  Activity,
  Copy,
  Download
} from 'lucide-react';

// Map icon strings to Lucide components
const iconMap = {
  'text-size': TextIcon,
  'image': Image,
  'code': Search,
  'percent': Percent,
  'binary': Binary,
  'key': Key,
  'type': Type,
  'maximize': Maximize,
  'filter': Filter,
  'activity': Activity,
  'dice': Dice6,
  'hash': Hash
};

const Tool = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the tool by slug
  const tool = tools.find(t => t.slug === slug) as ToolType;
  
  if (!tool) {
    return (
      <Layout backUrl="/" showSearch={false}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ابزار یافت نشد</h1>
          <p className="text-gray-600">ابزار مورد نظر شما در سیستم وجود ندارد.</p>
        </div>
      </Layout>
    );
  }
  
  const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || TextIcon;
  
  return (
    <Layout 
      title={tool.name} 
      backUrl={`/category/${tool.category}`} 
      showSearch={false}
    >
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ml-4">
            <IconComponent className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{tool.name}</h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>
        </div>
      </div>
      
      {/* Tool Canvas - This would be the interactive area */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">محیط تعاملی ابزار در اینجا نمایش داده می‌شود</p>
          <p className="text-sm text-gray-400 mt-2">این یک نمونه اولیه است</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 rtl:space-x-reverse">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
          <Copy size={16} className="ml-2" />
          کپی نتیجه
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center">
          <Download size={16} className="ml-2" />
          دانلود
        </button>
      </div>
    </Layout>
  );
};

export default Tool;
