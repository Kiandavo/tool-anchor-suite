import React, { useState, useEffect, useRef } from 'react';
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
  CheckCircle2,
  RotateCcw,
  RotateCw,
  Crop,
  ZoomIn,
  ZoomOut,
  ImageOff
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

// -- Image processing functions --
const compressImage = (file: File, quality: number = 0.7): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
          }
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

const convertToFormat = (file: File, format: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        
        let mimeType;
        switch(format) {
          case 'webp':
            mimeType = 'image/webp';
            break;
          case 'jpg':
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          default:
            mimeType = 'image/jpeg';
        }
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            resolve(blob);
          },
          mimeType,
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

const rotateImage = (file: File, degrees: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Set canvas size based on rotation
        if (degrees === 90 || degrees === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // Translate and rotate
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((degrees * Math.PI) / 180);
        
        // Draw the image
        if (degrees === 90 || degrees === 270) {
          ctx.drawImage(img, -img.height / 2, -img.width / 2);
        } else {
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        }
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

const flipImage = (file: File, direction: 'horizontal' | 'vertical'): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // Flip the image
        if (direction === 'horizontal') {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(0, canvas.height);
          ctx.scale(1, -1);
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

const applyGrayscale = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Apply grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const gray = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11);
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

const applyBlur = (file: File, blurAmount: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Apply blur filter
        if (ctx.filter !== undefined) { // Check if filter property is supported
          ctx.filter = `blur(${blurAmount}px)`;
          ctx.drawImage(img, 0, 0);
        }
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  
  // Image tools state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImageURL, setProcessedImageURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageQuality, setImageQuality] = useState(70);
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  const [rotationDegrees, setRotationDegrees] = useState(90);
  const [flipDirection, setFlipDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [blurAmount, setBlurAmount] = useState(5);
  
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
        if (processedImageURL) {
          navigator.clipboard.writeText(processedImageURL);
          setCopied(true);
          toast({
            title: "لینک کپی شد!",
            description: "لینک تصویر با موفقیت در کلیپ‌بورد کپی شد.",
            duration: 2000,
          });
          setTimeout(() => {
            setCopied(false);
          }, 2000);
          return;
        }
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
    if (processedImageURL && (
      slug === 'image-compressor' || 
      slug === 'image-resizer' || 
      slug === 'image-to-webp' || 
      slug === 'image-to-jpg' || 
      slug === 'image-to-png' || 
      slug === 'image-rotate' || 
      slug === 'image-flip' || 
      slug === 'image-grayscale' ||
      slug === 'image-blur'
    )) {
      // For image tools, download the processed image
      const a = document.createElement('a');
      a.href = processedImageURL;
      a.download = `processed-${selectedFile?.name || 'image'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "در حال دانلود...",
        description: "تصویر پردازش شده در حال دانلود است.",
        duration: 2000,
      });
      return;
    }
    
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      // Clear previous results
      setProcessedImageURL(null);
    }
  };

  const handleImageProcess = async () => {
    if (!selectedFile) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا یک تصویر انتخاب کنید.",
        duration: 2000,
      });
      return;
    }

    setIsProcessing(true);
    let processedBlob: Blob | null = null;

    try {
      switch (slug) {
        case 'image-compressor':
          processedBlob = await compressImage(selectedFile, imageQuality / 100);
          break;
        case 'image-resizer':
          processedBlob = await resizeImage(selectedFile, imageWidth, imageHeight);
          break;
        case 'image-to-webp':
          processedBlob = await convertToFormat(selectedFile, 'webp');
          break;
        case 'image-to-jpg':
          processedBlob = await convertToFormat(selectedFile, 'jpg');
          break;
        case 'image-to-png':
          processedBlob = await convertToFormat(selectedFile, 'png');
          break;
        case 'image-rotate':
          processedBlob = await rotateImage(selectedFile, rotationDegrees);
          break;
        case 'image-flip':
          processedBlob = await flipImage(selectedFile, flipDirection);
          break;
        case 'image-grayscale':
          processedBlob = await applyGrayscale(selectedFile);
          break;
        case 'image-blur':
          processedBlob = await applyBlur(selectedFile, blurAmount);
          break;
        default:
          toast({
            title: "خطا",
            description: "این ابزار هنوز پیاده‌سازی نشده است.",
            duration: 2000,
          });
      }

      if (processedBlob) {
        const url = URL.createObjectURL(processedBlob);
        setProcessedImageURL(url);
        
        toast({
          title: "موفقیت",
          description: "تصویر با موفقیت پردازش شد.",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "خطا",
        description: "خطا در پردازش تصویر. لطفاً دوباره تلاش کنید.",
        duration: 2000,
      });
    } finally {
      setIsProcessing(false);
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
  
  // Image tool indicators
  const isImageCompressorTool = tool.slug === 'image-compressor';
  const isImageResizerTool = tool.slug === 'image-resizer';
  const isImageToWebpTool = tool.slug === 'image-to-webp';
  const isImageToJpgTool = tool.slug === 'image-to-jpg';
  const isImageToPngTool = tool.slug === 'image-to-png';
  const isImageRotateTool = tool.slug === 'image-rotate';
  const isImageFlipTool = tool.slug === 'image-flip';
  const isImageGrayscaleTool = tool.slug === 'image-grayscale';
  const isImageBlurTool = tool.slug === 'image-blur';
  
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
        <label htmlFor="textTool"
