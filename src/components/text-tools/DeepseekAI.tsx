
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sparkles, Send, Trash, ClipboardCopy, Key, Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export const DeepseekAI = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Load API key from localStorage when component mounts
  useEffect(() => {
    const savedApiKey = localStorage.getItem('deepseek_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsSaved(true);
    }
    
    // Add system welcome message when first loaded
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'سلام! من دستیار هوشمند دیپ‌سیک هستم. چطور می‌توانم به شما کمک کنم؟',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('deepseek_api_key', apiKey.trim());
      setIsSaved(true);
      toast.success('کلید API ذخیره شد');
    } else {
      toast.error('لطفا کلید API را وارد کنید');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('deepseek_api_key');
    setApiKey('');
    setIsSaved(false);
    toast.success('کلید API حذف شد');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!apiKey) {
      toast.error('لطفا ابتدا کلید API را وارد و ذخیره کنید');
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let assistantResponse;

      if (apiKey.startsWith('sk-')) {
        // Real API call to Deepseek
        try {
          const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: selectedModel,
              messages: messages.concat(userMessage).map(msg => ({ 
                role: msg.role, 
                content: msg.content 
              })),
              temperature: 0.7,
              max_tokens: 1000
            })
          });
          
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          
          const data = await response.json();
          assistantResponse = data.choices[0].message.content;
        } catch (error) {
          console.error('Error calling DeepseekAI API:', error);
          // Fall back to simulation if real API fails
          assistantResponse = generateSimulatedResponse(inputMessage);
          toast.error('خطا در ارتباط با API دیپ‌سیک. از پاسخ شبیه‌سازی شده استفاده شد.');
        }
      } else {
        // Simulation mode
        await new Promise(resolve => setTimeout(resolve, 1000));
        assistantResponse = generateSimulatedResponse(inputMessage);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in DeepseekAI:', error);
      toast.error('خطا در پردازش پاسخ');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSimulatedResponse = (input: string) => {
    // This function simulates a response for demonstration purposes
    const greetings = ['سلام', 'درود', 'خوش آمدید', 'چطور هستید'];
    
    if (input.toLowerCase().includes('سلام') || input.toLowerCase().includes('درود')) {
      return `${greetings[Math.floor(Math.random() * greetings.length)]}! چطور می‌توانم به شما کمک کنم؟`;
    }
    
    if (input.includes('?') || input.includes('؟')) {
      const responses = [
        `سوال خوبی پرسیدید. با توجه به سوال شما درباره "${input.slice(0, 20)}...", می‌توانم بگویم که این موضوع از جنبه‌های مختلفی قابل بررسی است. اول اینکه این مفهوم را می‌توان از دیدگاه علمی و همچنین فلسفی مورد تحلیل قرار داد. در منابع معتبر آمده است که...`,
        `درباره "${input.slice(0, 20)}..." باید به چند نکته اساسی توجه کرد. بر اساس آخرین پژوهش‌های انجام شده در این زمینه، می‌توان گفت که عوامل متعددی در این فرآیند دخیل هستند. اگر بخواهیم به طور خلاصه اشاره کنیم، این عوامل شامل...`,
        `در پاسخ به سوال شما درباره "${input.slice(0, 20)}..."، لازم است ابتدا تعریف دقیقی از این مفهوم ارائه دهیم. طبق تعاریف موجود در منابع معتبر، این مفهوم اشاره دارد به... این تعریف به ما کمک می‌کند تا درک بهتری از موضوع داشته باشیم.`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    const generalResponses = [
      `"${input.slice(0, 20)}..." موضوع جالبی است. با توجه به داده‌های موجود، می‌توان گفت که این مبحث یکی از زمینه‌های مهم در عصر حاضر است. جنبه‌های مختلف آن را می‌توان اینگونه دسته‌بندی کرد...`,
      `در زمینه "${input.slice(0, 20)}..." می‌توانم اطلاعات مفیدی ارائه دهم. این موضوع از دیدگاه‌های مختلفی مورد بررسی قرار گرفته و نظرات متفاوتی درباره آن وجود دارد. اگر بخواهیم به طور خلاصه به آن بپردازیم...`,
      `موضوع "${input.slice(0, 20)}..." یکی از مباحث مهم در حوزه تخصصی مربوطه است. با توجه به تحقیقات انجام شده، می‌توان گفت که این موضوع از ابعاد گوناگونی قابل بررسی است. برخی از مهمترین جنبه‌های آن عبارتند از...`,
      `در خصوص "${input.slice(0, 20)}..." نکات متعددی وجود دارد که می‌تواند مورد توجه قرار گیرد. با بررسی منابع معتبر در این زمینه، می‌توان به این نتیجه رسید که...`
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const clearMessages = () => {
    setMessages([{
      role: 'assistant',
      content: 'سلام! من دستیار هوشمند دیپ‌سیک هستم. چطور می‌توانم به شما کمک کنم؟',
      timestamp: new Date()
    }]);
    toast.success('تاریخچه گفتگو پاک شد');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('متن با موفقیت کپی شد'))
      .catch(() => toast.error('خطا در کپی کردن متن'));
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-end gap-3">
                <div className="flex-1">
                  <label htmlFor="apiKey" className="block text-xs font-medium text-gray-700 mb-1">
                    کلید API دیپ‌سیک
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="flex-1"
                    />
                    {!isSaved ? (
                      <Button onClick={saveApiKey} size="icon" variant="outline">
                        <Key size={16} />
                      </Button>
                    ) : (
                      <Button onClick={clearApiKey} size="icon" variant="outline" className="text-red-500">
                        <Trash size={16} />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <label htmlFor="model" className="block text-xs font-medium text-gray-700 mb-1">
                    انتخاب مدل
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب مدل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                      <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                      <SelectItem value="deepseek-llm">DeepSeek LLM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="border rounded-lg bg-slate-50">
              <ScrollArea className="h-[400px] p-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4">
                    <Sparkles className="mb-2 text-primary/60" size={32} />
                    <p className="text-sm">به دیپ‌سیک چت خوش آمدید!</p>
                    <p className="text-xs mt-1">سوال یا متن خود را بنویسید تا با قدرت هوش مصنوعی پاسخ دهیم.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user' 
                              ? 'bg-primary/10 text-gray-800' 
                              : 'bg-white border text-gray-700'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5" 
                              onClick={() => copyToClipboard(message.content)}
                            >
                              <ClipboardCopy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-white border text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                            <span className="text-sm">در حال نوشتن پاسخ...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>
            </div>
            
            {/* Input Area */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="پیامتان را اینجا بنویسید..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="min-h-[60px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  size="icon"
                >
                  {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send size={18} />}
                </Button>
                <Button 
                  onClick={clearMessages}
                  variant="outline" 
                  size="icon"
                  className="text-gray-500"
                  disabled={messages.length <= 1 || isLoading}
                >
                  <Trash size={18} />
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-center text-gray-500 pt-2">
              <p>توجه: برای استفاده از این ابزار، نیاز به کلید API اختصاصی از سایت دیپ‌سیک دارید.</p>
              <p className="mt-1">داده‌های ارسالی شما ممکن است توسط دیپ‌سیک ذخیره شود.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeepseekAI;
