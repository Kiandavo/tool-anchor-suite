
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { finglishToPersian } from "@/utils/text";
import { toast } from "sonner";
import { Check, Copy, Wand2, Book, Trash } from "lucide-react";
import { copyToClipboard } from "@/utils/randomUtils";

export function EnhancedFinglishConverter() {
  const [finglishInput, setFinglishInput] = useState("");
  const [persianOutput, setPersianOutput] = useState("");
  const [copyClicked, setCopyClicked] = useState(false);
  const [recentConversions, setRecentConversions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-convert as user types
  useEffect(() => {
    if (finglishInput) {
      const timer = setTimeout(() => {
        setPersianOutput(finglishToPersian(finglishInput));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setPersianOutput("");
    }
  }, [finglishInput]);

  const handleManualConvert = () => {
    if (!finglishInput.trim()) {
      toast.error("لطفاً متن فینگلیش وارد کنید");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = finglishToPersian(finglishInput);
      setPersianOutput(result);
      
      // Add to recent conversions if not already present
      if (result && !recentConversions.includes(result)) {
        setRecentConversions(prev => [result, ...prev.slice(0, 4)]);
      }
      
      setIsLoading(false);
      toast.success("متن با موفقیت تبدیل شد");
    }, 500);
  };

  const handleCopyFarsi = () => {
    if (persianOutput) {
      copyToClipboard(persianOutput);
      setCopyClicked(true);
      setTimeout(() => setCopyClicked(false), 1500);
    }
  };
  
  const handleClearHistory = () => {
    setRecentConversions([]);
    toast.info("تاریخچه پاک شد");
  };

  const handleCopyFromHistory = (text: string) => {
    copyToClipboard(text);
    toast.success("متن کپی شد");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <Book className="text-primary mr-2" size={20} />
            <h3 className="text-lg font-semibold">مبدل پیشرفته فینگلیش به فارسی</h3>
          </div>
          <p className="text-muted-foreground text-sm">متن فینگلیش خود را وارد کنید تا به فارسی تبدیل شود</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 flex flex-col gap-2 w-full">
              <Textarea 
                placeholder="متن فینگلیش را اینجا وارد کنید... مثال: salam, chetori? khoobi?"
                value={finglishInput}
                onChange={e => setFinglishInput(e.target.value)}
                className="min-h-32 resize-y bg-slate-50"
              />
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  type="button" 
                  onClick={handleManualConvert}
                  disabled={isLoading || !finglishInput.trim()}
                  className="flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      در حال تبدیل...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2" size={18} />
                      تبدیل
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setFinglishInput('');
                    setPersianOutput('');
                  }}
                  className="text-red-500 border-red-300"
                >
                  <Trash size={18} className="mr-1" />
                  پاک کردن
                </Button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-2 w-full">
              <Textarea
                placeholder="متن فارسی اینجا نمایش داده می‌شود..."
                value={persianOutput}
                readOnly
                className="min-h-32 resize-y bg-slate-50 text-right"
              />
              
              <Button 
                type="button" 
                variant="outline" 
                disabled={!persianOutput}
                onClick={handleCopyFarsi}
                className={copyClicked ? "bg-green-50 text-green-600 border-green-300" : ""}
              >
                {copyClicked ? (
                  <>
                    <Check size={18} className="mr-2" />
                    کپی شد!
                  </>
                ) : (
                  <>
                    <Copy size={18} className="mr-2" />
                    کپی متن فارسی
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {recentConversions.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-700">تاریخچه اخیر</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearHistory}
                  className="text-red-500 h-7 text-xs px-2"
                >
                  پاک کردن تاریخچه
                </Button>
              </div>
              
              <div className="space-y-2">
                {recentConversions.map((text, idx) => (
                  <div 
                    key={idx} 
                    className="py-2 px-3 bg-slate-50 rounded-md text-sm flex justify-between items-center"
                  >
                    <div className="truncate ml-2">{text}</div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 px-2"
                      onClick={() => handleCopyFromHistory(text)}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <h3 className="text-md font-semibold">نکات استفاده</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• متن فینگلیش را به صورت معمولی تایپ کنید - مثال: <span className="text-primary">salam chetori?</span></li>
            <li>• برای حروف خاص فارسی از معادل های استاندارد استفاده کنید - مثال: <span className="text-primary">kh</span> برای "خ"، <span className="text-primary">sh</span> برای "ش"</li>
            <li>• مبدل به صورت خودکار حین تایپ، متن را ترجمه می‌کند</li>
            <li>• برای تبدیل دقیق‌تر، از دکمه تبدیل استفاده کنید</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
