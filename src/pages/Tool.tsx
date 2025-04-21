import React, { useState } from 'react';
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
  Download,
  Share2,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// -- Simple map for demonstration (extend for better coverage) --
const finglishMap: Record<string, string> = {
  a: "ا",
  b: "ب",
  c: "ک",
  d: "د",
  e: "e",   // Not always used directly in Persian but kept for completeness
  f: "ف",
  g: "گ",
  h: "ه",
  i: "ی",
  j: "ج",
  k: "ک",
  l: "ل",
  m: "م",
  n: "ن",
  o: "و",
  p: "پ",
  q: "ق",
  r: "ر",
  s: "س",
  t: "ت",
  u: "و",
  v: "و",
  w: "و",
  x: "خ",
  y: "ی",
  z: "ز",
  ch: "چ",
  sh: "ش",
  zh: "ژ",
  '.' : "‌.",
  ',' : "،",
  '?': "؟",
  "'": "‌",
  // ...add more mappings for better accuracy
};

// A simple converter: Try to match 2-letter combos first, then single letters
function finglishToPersian(finglish: string): string {
  let out = "";
  let i = 0;
  finglish = finglish.toLowerCase();
  while (i < finglish.length) {
    if (i < finglish.length - 1) {
      const two = finglish.slice(i, i + 2);
      if (finglishMap[two]) {
        out += finglishMap[two];
        i += 2;
        continue;
      }
    }
    const one = finglish[i];
    out += finglishMap[one] || one;
    i++;
  }
  return out;
}

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
  'hash': Hash,
  'calendar': Activity
};

const Tool = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Finglish converter state
  const [finglishInput, setFinglishInput] = useState("");
  const [persianOutput, setPersianOutput] = useState("");
  
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
  
  const handleCopy = () => {
    setCopied(true);
    toast({
      title: "کپی شد!",
      description: "نتیجه با موفقیت در کلیپ‌بورد کپی شد.",
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    toast({
      title: "در حال دانلود...",
      description: "نتیجه در حال دانلود است.",
      duration: 2000,
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tool.name,
        text: tool.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "لینک کپی شد!",
        description: "لینک این ابزار در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
    }
  };

  // Feature UI for Finglish-to-Farsi Tool
  const isFinglishTool = tool.slug === 'latin-to-persian-convertor';

  const handleConvertFinglish = () => {
    setPersianOutput(finglishToPersian(finglishInput));
  };

  const handleCopyFarsi = () => {
    if (persianOutput) {
      navigator.clipboard.writeText(persianOutput);
      setCopied(true);
      toast({
        title: "کپی شد!",
        description: "متن فارسی در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <Layout 
      title={tool.name} 
      backUrl={`/category/${tool.category}`} 
      showSearch={false}
    >
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center ml-4">
            <IconComponent className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{tool.name}</h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>
        </div>
      </div>
      
      {/* Tool Canvas - Custom for Finglish converter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in animate-delay-100">
        {isFinglishTool ? (
          <div dir="rtl" className="flex flex-col items-stretch gap-4">
            <label htmlFor="finglish" className="mb-2 text-right font-medium text-gray-700">متن فینگلیش را وارد کنید:</label>
            <textarea
              id="finglish"
              value={finglishInput}
              onChange={(e) => setFinglishInput(e.target.value)}
              placeholder="مثال: salam chetori?"
              rows={3}
              className="border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
              dir="ltr"
            />
            <button
              onClick={handleConvertFinglish}
              className="bg-primary text-white rounded-md py-2 mt-2 hover:bg-primary/80 transition-colors"
            >
              تبدیل کن
            </button>
            {persianOutput && (
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">نتیجه:</span>
                  <button 
                    onClick={handleCopyFarsi}
                    className="text-primary text-xs px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                  >
                    {copied ? "کپی شد" : "کپی"}
                  </button>
                </div>
                <div className="text-lg text-gray-800" dir="rtl" style={{ wordBreak: "break-word" }}>
                  {persianOutput}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary/30 transition-colors duration-300">
            <p className="text-gray-500">محیط تعاملی ابزار در اینجا نمایش داده می‌شود</p>
            <p className="text-sm text-gray-400 mt-2">این یک نمونه اولیه است</p>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end space-x-4 rtl:space-x-reverse animate-fade-in animate-delay-200">
        <button 
          onClick={handleShare}
          className="px-4 py-2 mb-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
        >
          <Share2 size={16} className="ml-2" />
          اشتراک‌گذاری
        </button>
        <button 
          onClick={handleCopy}
          className={`px-4 py-2 mb-2 ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} rounded-lg hover:bg-gray-200 transition-colors flex items-center`}
        >
          {copied ? <CheckCircle2 size={16} className="ml-2" /> : <Copy size={16} className="ml-2" />}
          {copied ? 'کپی شد' : 'کپی نتیجه'}
        </button>
        <button 
          onClick={handleDownload}
          className="px-4 py-2 mb-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <Download size={16} className="ml-2" />
          دانلود
        </button>
      </div>
    </Layout>
  );
};

export default Tool;
