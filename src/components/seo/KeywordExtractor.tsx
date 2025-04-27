
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Code } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/utils/randomUtils';

export const KeywordExtractor = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [keywordsOutput, setKeywordsOutput] = useState<string>('');

  const extractKeywords = () => {
    if (!htmlContent.trim()) {
      toast.error("لطفاً کد HTML را وارد کنید");
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Extract meta keywords
      const metaTags = Array.from(doc.querySelectorAll('meta[name="keywords"], meta[property="keywords"]'));
      
      if (metaTags.length === 0) {
        setKeywordsOutput("هیچ متا تگ کلمات کلیدی در HTML یافت نشد.");
        toast.info("متا تگ کلمات کلیدی در HTML پیدا نشد");
        return;
      }
      
      let extractedKeywords = "";
      
      metaTags.forEach(tag => {
        const content = tag.getAttribute('content');
        if (content) {
          extractedKeywords += content + "\n";
        }
      });
      
      // Analyze keywords frequency if found
      if (extractedKeywords) {
        // Split keywords by commas and clean them
        const keywordsList = extractedKeywords
          .split(',')
          .map(k => k.trim())
          .filter(k => k.length > 0);
          
        // Count frequency
        const keywordCount: Record<string, number> = {};
        keywordsList.forEach(keyword => {
          keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
        });
        
        // Format output
        let output = "# کلمات کلیدی استخراج شده:\n";
        output += keywordsList.join(', ') + "\n\n";
        output += "# تعداد کل کلمات کلیدی: " + keywordsList.length + "\n\n";
        
        // Add frequency if there are duplicates
        const duplicates = Object.entries(keywordCount).filter(([_, count]) => count > 1);
        if (duplicates.length > 0) {
          output += "# کلمات تکراری:\n";
          duplicates.forEach(([keyword, count]) => {
            output += `${keyword}: ${count} بار\n`;
          });
        }
        
        setKeywordsOutput(output);
        toast.success("کلمات کلیدی با موفقیت استخراج شدند");
      } else {
        setKeywordsOutput("متا تگ کلمات کلیدی وجود دارد، اما محتوای آن خالی است.");
        toast.info("متا تگ کلمات کلیدی خالی است");
      }
    } catch (error) {
      console.error("Error parsing HTML:", error);
      setKeywordsOutput("خطا در تجزیه HTML. لطفا مطمئن شوید که HTML معتبر است.");
      toast.error("خطا در تجزیه HTML");
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="کد HTML را وارد کنید..."
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="min-h-32 font-mono text-sm dir-ltr"
          />
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={extractKeywords}>
              <Code className="mr-2" size={18} />
              استخراج کلمات کلیدی
            </Button>
          </div>
        </div>
        
        {keywordsOutput && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer font-mono text-sm whitespace-pre-wrap"
            onClick={() => copyToClipboard(keywordsOutput)}
          >
            {keywordsOutput}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
