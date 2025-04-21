
import React, { useState, useEffect } from 'react';
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
  Calendar,
  Copy,
  Download,
  Share2,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// -- Finglish to Persian Converter Functions --
const finglishMap: Record<string, string> = {
  a: "ا",
  aa: "آ",
  b: "ب",
  c: "ک",
  d: "د",
  e: "ه",   
  ee: "ی",
  f: "ف",
  g: "گ",
  gh: "ق",
  h: "ه",
  i: "ی",
  j: "ج",
  k: "ک",
  kh: "خ",
  l: "ل",
  m: "م",
  n: "ن",
  o: "و",
  oo: "و",
  p: "پ",
  q: "ق",
  r: "ر",
  s: "س",
  sh: "ش",
  t: "ت",
  u: "و",
  v: "و",
  w: "و",
  x: "خ",
  y: "ی",
  z: "ز",
  zh: "ژ",
  ch: "چ",
  '.' : "‌.",
  ',' : "،",
  '?': "؟",
  "'": "‌",
  ' ': " ",
};

function finglishToPersian(finglish: string): string {
  let out = "";
  let i = 0;
  finglish = finglish.toLowerCase();
  
  while (i < finglish.length) {
    // Try to match 2-character combinations first
    if (i < finglish.length - 1) {
      const two = finglish.slice(i, i + 2);
      if (finglishMap[two]) {
        out += finglishMap[two];
        i += 2;
        continue;
      }
    }
    
    // If no 2-character match, try single character
    const one = finglish[i];
    out += finglishMap[one] || one;
    i++;
  }
  
  return out;
}

// -- Text counter functions --
function countCharacters(text: string): number {
  return text.length;
}

function countWords(text: string): number {
  const trimmedText = text.trim();
  if (!trimmedText) return 0;
  
  // Handle both Latin and Persian text
  // Persian words can be separated by space or half-space (U+200C)
  return trimmedText.split(/[\s\u200C]+/).filter(word => word.length > 0).length;
}

function countSentences(text: string): number {
  if (!text.trim()) return 0;
  
  // Handle both Latin and Persian sentences
  // Persian uses different punctuation for sentence endings
  const sentenceEndings = text.match(/[.!?؟\.\n]+/g);
  return sentenceEndings ? sentenceEndings.length : 1;
}

function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  
  // Count paragraphs by looking for line breaks
  return text.split(/\n+/).filter(para => para.trim().length > 0).length;
}

function calculateReadingTime(text: string): number {
  // Average reading speed: 200 words per minute
  const words = countWords(text);
  return Math.ceil(words / 200);
}

// -- Text reverser function --
function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

// -- Remove duplicate lines function --
function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const uniqueLines = [...new Set(lines)];
  return uniqueLines.join('\n');
}

// -- Sort lines function --
function sortLines(text: string, ascending: boolean = true): string {
  const lines = text.split('\n');
  const sortedLines = lines.sort((a, b) => {
    return ascending ? a.localeCompare(b) : b.localeCompare(a);
  });
  return sortedLines.join('\n');
}

// -- Trim lines function --
function trimLines(text: string): string {
  const lines = text.split('\n');
  const trimmedLines = lines.map(line => line.trim());
  return trimmedLines.join('\n');
}

// -- Remove empty lines function --
function removeEmptyLines(text: string): string {
  const lines = text.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  return nonEmptyLines.join('\n');
}

// -- Emoji remover function --
function removeEmojis(text: string): string {
  // Regex to match emoji characters
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
}

// -- Case conversion functions --
function toUpperCase(text: string): string {
  return text.toUpperCase();
}

function toLowerCase(text: string): string {
  return text.toLowerCase();
}

function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// -- Slug generator function --
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
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
  'calendar': Calendar,
  'calculator': Calculator
};

const Tool = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Finglish converter state
  const [finglishInput, setFinglishInput] = useState("");
  const [persianOutput, setPersianOutput] = useState("");
  
  // Text counter state
  const [textInput, setTextInput] = useState("");
  const [textStats, setTextStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTimeMinutes: 0
  });
  
  // Text tools shared state
  const [textToolInput, setTextToolInput] = useState("");
  const [textToolOutput, setTextToolOutput] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Calculate text stats on input change
  useEffect(() => {
    if (slug === 'text-counter') {
      setTextStats({
        characters: countCharacters(textInput),
        charactersNoSpaces: countCharacters(textInput.replace(/\s+/g, '')),
        words: countWords(textInput),
        sentences: countSentences(textInput),
        paragraphs: countParagraphs(textInput),
        readingTimeMinutes: calculateReadingTime(textInput)
      });
    }
  }, [textInput, slug]);
  
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
    let textToCopy = "";
    
    switch (slug) {
      case 'latin-to-persian-convertor':
        textToCopy = persianOutput;
        break;
      case 'text-counter':
        textToCopy = JSON.stringify(textStats, null, 2);
        break;
      case 'text-reverse':
      case 'remove-duplicate-lines':
      case 'text-sorter':
      case 'text-trimmer':
      case 'remove-empty-lines':
      case 'emoji-remover':
      case 'slug-generator':
      case 'text-uppercasing':
      case 'text-lowercasing':
      case 'text-titlecase':
        textToCopy = textToolOutput;
        break;
      default:
        return;
    }
    
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast({
        title: "کپی شد!",
        description: "نتیجه با موفقیت در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  
  const handleDownload = () => {
    let content = "";
    let filename = tool.name + ".txt";
    
    switch (slug) {
      case 'latin-to-persian-convertor':
        content = persianOutput;
        break;
      case 'text-counter':
        content = JSON.stringify(textStats, null, 2);
        filename = tool.name + ".json";
        break;
      case 'text-reverse':
      case 'remove-duplicate-lines':
      case 'text-sorter':
      case 'text-trimmer':
      case 'remove-empty-lines':
      case 'emoji-remover':
      case 'slug-generator':
      case 'text-uppercasing':
      case 'text-lowercasing':
      case 'text-titlecase':
        content = textToolOutput;
        break;
      default:
        toast({
          title: "دانلود امکان‌پذیر نیست",
          description: "این ابزار قابلیت دانلود ندارد.",
          duration: 2000,
        });
        return;
    }
    
    if (content) {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "در حال دانلود...",
        description: "نتیجه در حال دانلود است.",
        duration: 2000,
      });
    }
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
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "لینک کپی شد!",
        description: "لینک این ابزار در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
    }
  };

  // Feature UI for Finglish-to-Farsi Tool
  const isFinglishTool = tool.slug === 'latin-to-persian-convertor';
  const isTextCounterTool = tool.slug === 'text-counter';
  const isTextReverseTool = tool.slug === 'text-reverse';
  const isRemoveDuplicatesTool = tool.slug === 'remove-duplicate-lines';
  const isSortLinesTextTool = tool.slug === 'text-sorter';
  const isTrimTextTool = tool.slug === 'text-trimmer';
  const isRemoveEmptyLinesTool = tool.slug === 'remove-empty-lines';
  const isRemoveEmojisTool = tool.slug === 'emoji-remover';
  const isSlugGeneratorTool = tool.slug === 'slug-generator';
  const isUpperCaseTool = tool.slug === 'text-uppercasing';
  const isLowerCaseTool = tool.slug === 'text-lowercasing';
  const isTitleCaseTool = tool.slug === 'text-titlecase';
  
  // Generic text tool handler
  const handleTextToolProcess = () => {
    let result = "";
    
    switch (slug) {
      case 'text-reverse':
        result = reverseText(textToolInput);
        break;
      case 'remove-duplicate-lines':
        result = removeDuplicateLines(textToolInput);
        break;
      case 'text-sorter':
        result = sortLines(textToolInput, sortOrder === "asc");
        break;
      case 'text-trimmer':
        result = trimLines(textToolInput);
        break;
      case 'remove-empty-lines':
        result = removeEmptyLines(textToolInput);
        break;
      case 'emoji-remover':
        result = removeEmojis(textToolInput);
        break;
      case 'slug-generator':
        result = generateSlug(textToolInput);
        break;
      case 'text-uppercasing':
        result = toUpperCase(textToolInput);
        break;
      case 'text-lowercasing':
        result = toLowerCase(textToolInput);
        break;
      case 'text-titlecase':
        result = toTitleCase(textToolInput);
        break;
    }
    
    setTextToolOutput(result);
  };

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
  
  // Text tools UI
  const renderTextToolUI = () => {
    return (
      <div dir="rtl" className="flex flex-col items-stretch gap-4">
        <label htmlFor="textTool" className="mb-2 text-right font-medium text-gray-700">
          متن مورد نظر را وارد کنید:
        </label>
        <textarea
          id="textTool"
          value={textToolInput}
          onChange={(e) => setTextToolInput(e.target.value)}
          placeholder="متن خود را اینجا وارد کنید..."
          rows={5}
          className="border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
          dir="auto"
        />
        
        {isSortLinesTextTool && (
          <div className="flex items-center gap-4 mb-2">
            <span className="text-gray-700">ترتیب:</span>
            <Button
              onClick={() => setSortOrder("asc")}
              variant={sortOrder === "asc" ? "default" : "outline"}
              className="ml-2"
            >
              صعودی
            </Button>
            <Button
              onClick={() => setSortOrder("desc")}
              variant={sortOrder === "desc" ? "default" : "outline"}
            >
              نزولی
            </Button>
          </div>
        )}
        
        <button
          onClick={handleTextToolProcess}
          className="bg-primary text-white rounded-md py-2 mt-2 hover:bg-primary/80 transition-colors"
        >
          پردازش
        </button>
        
        {textToolOutput && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">نتیجه:</span>
              <button 
                onClick={handleCopy}
                className="text-primary text-xs px-2 py-1 rounded hover:bg-primary/10 transition-colors flex items-center"
              >
                {copied ? <CheckCircle2 size={16} className="ml-1" /> : <Copy size={16} className="ml-1" />}
                {copied ? "کپی شد" : "کپی"}
              </button>
            </div>
            <div className="text-lg text-gray-800 whitespace-pre-wrap" dir="auto" style={{ wordBreak: "break-word" }}>
              {textToolOutput}
            </div>
          </div>
        )}
      </div>
    );
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
      
      {/* Tool Canvas - Custom for different tools */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in animate-delay-100">
        {isFinglishTool ? (
          <div dir="rtl" className="flex flex-col items-stretch gap-4">
            <label htmlFor="finglish" className="mb-2 text-right font-medium text-gray-700">متن انگلیسی یا فینگلیش را وارد کنید:</label>
            <textarea
              id="finglish"
              value={finglishInput}
              onChange={(e) => setFinglishInput(e.target.value)}
              placeholder="مثال: salam chetori?"
              rows={4}
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
                    className="text-primary text-xs px-2 py-1 rounded hover:bg-primary/10 transition-colors flex items-center"
                  >
                    {copied ? <CheckCircle2 size={16} className="ml-1" /> : <Copy size={16} className="ml-1" />}
                    {copied ? "کپی شد" : "کپی"}
                  </button>
                </div>
                <div className="text-lg text-gray-800" dir="rtl" style={{ wordBreak: "break-word" }}>
                  {persianOutput}
                </div>
              </div>
            )}
          </div>
        ) : isTextCounterTool ? (
          <div dir="rtl" className="flex flex-col gap-5">
            <div>
              <label htmlFor="text-input" className="block mb-2 text-right font-medium text-gray-700">
                متن خود را وارد کنید:
              </label>
              <Textarea
                id="text-input"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="متن خود را اینجا وارد کنید..."
                className="border border-gray-200 rounded-lg p-3 min-h-[150px] w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                dir="auto"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-gray-200 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-medium text-gray-500 mb-1">تعداد کاراکترها</p>
                  <p className="text-3xl font-bold text-primary">{textStats.characters}</p>
                  <p className="text-sm text-gray-400 mt-1">بدون فاصله: {textStats.charactersNoSpaces}</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-medium text-gray-500 mb-1">تعداد کلمات</p>
                  <p className="text-3xl font-bold text-primary">{textStats.words}</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-medium text-gray-500 mb-1">تعداد جملات</p>
                  <p className="text-3xl font-bold text-primary">{textStats.sentences}</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-medium text-gray-500 mb-1">تعداد پاراگراف‌ها</p>
                  <p className="text-3xl font-bold text-primary">{textStats.paragraphs}</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-medium text-gray-500 mb-1">زمان مطالعه</p>
                  <p className="text-3xl font-bold text-primary">{textStats.readingTimeMinutes}</p>
                  <p className="text-sm text-gray-400 mt-1">دقیقه</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-4 flex items-center justify-center">
                  <Button 
                    onClick={handleCopy}
                    className="w-full"
                    variant="outline"
                  >
                    {copied ? <CheckCircle2 size={16} className="ml-2" /> : <Copy size={16} className="ml-2" />}
                    {copied ? 'کپی شد' : 'کپی آمار'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : isTextReverseTool || isRemoveDuplicatesTool || isSortLinesTextTool || 
           isTrimTextTool || isRemoveEmptyLinesTool || isRemoveEmojisTool || 
           isSlugGeneratorTool || isUpperCaseTool || isLowerCaseTool || isTitleCaseTool ? (
          renderTextToolUI()
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary/30 transition-colors duration-300">
            <p className="text-gray-500">این ابزار هنوز پیاده‌سازی نشده است</p>
            <p className="text-sm text-gray-400 mt-2">به زودی منتشر خواهد شد</p>
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
