
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataVisualizerProps {
  data: any[];
  title: string;
  xAxisKey: string;
  yAxisKey: string;
}

export const DataVisualizer: React.FC<DataVisualizerProps> = ({ 
  data, 
  title, 
  xAxisKey, 
  yAxisKey 
}) => {
  const { toast } = useToast();

  const handleCopyData = () => {
    try {
      const jsonStr = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(jsonStr);
      toast({
        title: "کپی شد",
        description: "داده‌ها با موفقیت در کلیپ‌بورد کپی شدند."
      });
    } catch (err) {
      toast({
        title: "خطا در کپی",
        description: "مشکلی در کپی داده‌ها به وجود آمد.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadCSV = () => {
    try {
      // Create CSV content
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => Object.values(row).join(','));
      const csvContent = [headers, ...rows].join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${title.replace(/\s+/g, '_')}_data.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "دانلود شد",
        description: "داده‌ها با فرمت CSV دانلود شدند."
      });
    } catch (err) {
      toast({
        title: "خطا در دانلود",
        description: "مشکلی در دانلود داده‌ها به وجود آمد.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyData}>
            <Copy size={16} className="ml-2" />
            کپی داده‌ها
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
            <Download size={16} className="ml-2" />
            دانلود CSV
          </Button>
        </div>
      </div>
      
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxisKey} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
        </div>
      )}
    </div>
  );
};

export default DataVisualizer;
