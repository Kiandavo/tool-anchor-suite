import { supabase } from '@/integrations/supabase/client';
import { Message } from './types';

export const fetchDeepseekResponse = async (
  apiKey: string, 
  messageHistory: any[], 
  selectedModel: string, 
  temperature: number
): Promise<string> => {
  try {
    // Check for internet connectivity
    if (!navigator.onLine) {
      throw new Error('اتصال اینترنت برقرار نیست. لطفا اتصال خود را بررسی کنید.');
    }

    // Basic API key validation (server will validate fully)
    if (!apiKey || !apiKey.startsWith('sk-or-v1-')) {
      throw new Error('کلید API نامعتبر است. لطفا کلید معتبر OpenRouter وارد کنید.');
    }

    console.log('Sending request to ai-chat edge function with model:', selectedModel);
    
    // Format messages for API
    const formattedMessages = messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Call edge function instead of direct API
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: {
        messages: formattedMessages,
        model: selectedModel,
        temperature: Math.max(0.1, Math.min(1.0, temperature)),
        apiKey: apiKey
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'خطا در ارتباط با سرور');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (!data?.content) {
      throw new Error('پاسخی از API دریافت نشد.');
    }
    
    return data.content;
  } catch (error: any) {
    console.error('API request error:', error);
    
    // Re-throw with user-friendly message
    if (error.message) {
      throw error;
    }
    
    throw new Error('خطا در درخواست به API');
  }
};

export const generateSimulatedResponse = (input: string): string => {
  // Sanitize input for simulation
  const sanitizedInput = input.replace(/<[^>]*>?/gm, '').trim();
  
  const greetings = ['سلام', 'درود', 'خوش آمدید', 'چطور هستید'];
  
  if (sanitizedInput.toLowerCase().includes('سلام') || sanitizedInput.toLowerCase().includes('درود')) {
    return `${greetings[Math.floor(Math.random() * greetings.length)]}! چطور می‌توانم به شما کمک کنم؟`;
  }
  
  if (sanitizedInput.includes('?') || sanitizedInput.includes('؟')) {
    const responses = [
      `سوال خوبی پرسیدید. با توجه به سوال شما، می‌توانم بگویم که این موضوع از جنبه‌های مختلفی قابل بررسی است.`,
      `درباره موضوع مطرح شده باید به چند نکته اساسی توجه کرد. بر اساس اطلاعات موجود، می‌توان گفت که عوامل متعددی دخیل هستند.`,
      `در پاسخ به سوال شما، لازم است ابتدا تعریف دقیقی از این مفهوم ارائه دهیم. این موضوع جنبه‌های مختلفی دارد.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  const generalResponses = [
    `موضوع مطرح شده جالب است. این مبحث یکی از زمینه‌های مهم در عصر حاضر محسوب می‌شود.`,
    `در این زمینه می‌توانم اطلاعات مفیدی ارائه دهم. این موضوع از دیدگاه‌های مختلفی قابل بررسی است.`,
    `این موضوع از ابعاد گوناگونی قابل تحلیل است. برخی از مهمترین جنبه‌های آن شامل جوانب مختلف می‌شود.`,
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

export const buildMessageHistory = (messages: Message[], userMessage: Message, contextLength: number) => {
  // Limit context length for security and performance
  const maxContextLength = Math.min(contextLength, 10);
  
  // Get recent messages based on contextLength
  const recentMessages = [...messages.slice(-maxContextLength * 2), userMessage];
  
  // System message for better responses
  const systemContext = {
    role: 'system' as const,
    content: 'شما یک دستیار هوشمند فارسی زبان هستید که به سوالات کاربران به زبان فارسی پاسخ می‌دهید. پاسخ‌های شما دقیق، کمک‌کننده و مودبانه است.'
  };
  
  return [
    systemContext,
    ...recentMessages.map(msg => ({
      role: msg.role,
      content: msg.content.substring(0, 2000) // Limit message length
    }))
  ];
};
