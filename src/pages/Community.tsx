
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Send, Star, ThumbsUp } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  votes: number;
  userVoted: boolean;
  date: string;
}

const Community = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>(() => {
    const saved = localStorage.getItem('community_suggestions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان و توضیحات پیشنهاد خود را وارد کنید.",
        variant: "destructive"
      });
      return;
    }
    
    const newSuggestion: Suggestion = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      votes: 0,
      userVoted: false,
      date: new Date().toLocaleDateString('fa-IR')
    };
    
    const updatedSuggestions = [...suggestions, newSuggestion];
    setSuggestions(updatedSuggestions);
    localStorage.setItem('community_suggestions', JSON.stringify(updatedSuggestions));
    
    setTitle('');
    setDescription('');
    
    toast({
      title: "پیشنهاد ثبت شد",
      description: "با تشکر از شما برای ارسال پیشنهاد. پیشنهاد شما به لیست اضافه شد."
    });
  };

  const handleVote = (id: string) => {
    setSuggestions(prevSuggestions => {
      const updated = prevSuggestions.map(suggestion => {
        if (suggestion.id === id) {
          const voted = !suggestion.userVoted;
          return {
            ...suggestion,
            votes: voted ? suggestion.votes + 1 : suggestion.votes - 1,
            userVoted: voted
          };
        }
        return suggestion;
      });
      
      localStorage.setItem('community_suggestions', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Layout title="انجمن کاربران" backUrl="/">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">ارسال پیشنهاد جدید</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">پیشنهادات و ایده‌های خود برای ابزارهای جدید یا بهبود سایت را با ما به اشتراک بگذارید.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">عنوان پیشنهاد</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: افزودن ابزار تقویم شمسی"
                maxLength={100}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">توضیحات</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="پیشنهاد خود را با جزئیات بیشتر شرح دهید..."
                rows={5}
              />
            </div>
            
            <Button type="submit" className="w-full sm:w-auto">
              <Send size={18} className="ml-2" />
              ارسال پیشنهاد
            </Button>
          </form>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">پیشنهادات کاربران</h2>
            <div className="flex items-center">
              <MessageCircle size={16} className="ml-1" />
              <span className="text-sm">{suggestions.length} پیشنهاد</span>
            </div>
          </div>
          
          {suggestions.length > 0 ? (
            <div className="space-y-6">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{suggestion.title}</h3>
                    <span className="text-xs text-gray-500">{suggestion.date}</span>
                  </div>
                  <p className="my-2 text-sm text-gray-600 dark:text-gray-300">{suggestion.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <Button
                      variant={suggestion.userVoted ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleVote(suggestion.id)}
                      className="flex items-center"
                    >
                      <ThumbsUp size={16} className="ml-1" />
                      <span>{suggestion.votes}</span>
                    </Button>
                    <div className="flex items-center text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} className="text-gray-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 mb-2">هنوز پیشنهادی ثبت نشده است</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">اولین نفری باشید که پیشنهاد خود را با ما به اشتراک می‌گذارد!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Community;
