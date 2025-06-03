
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface TemplateCardProps {
  id: string;
  title: string;
  format: string;
  downloads: number;
  thumbnail: string;
  index?: number;
  onDownload?: () => void;
}

export const TemplateCard = ({ 
  id, 
  title, 
  format, 
  downloads, 
  thumbnail, 
  index = 0, 
  onDownload 
}: TemplateCardProps) => {
  return (
    <motion.div 
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/80 h-full flex flex-col group">
        <div className="relative overflow-hidden">
          <OptimizedImage 
            src={thumbnail} 
            alt={title}
            className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loadingStrategy="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
          
          <div className="flex items-center justify-between mb-4 mt-auto">
            <span className="text-sm text-gray-500">{format}</span>
            <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              <Download size={14} className="mr-1" />
              <span>{downloads.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Link 
              to={`/template/${id}`}
              className="flex items-center justify-center flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors duration-200 text-sm"
            >
              <Eye size={16} className="ml-1.5" />
              پیش‌نمایش
            </Link>
            
            <button 
              onClick={onDownload}
              className="flex items-center justify-center flex-1 py-2 px-3 bg-primary/10 hover:bg-primary/20 rounded-md text-primary transition-colors duration-200 text-sm"
            >
              <Download size={16} className="ml-1.5" />
              دانلود
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
