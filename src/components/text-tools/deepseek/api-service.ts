
import { Message } from './types';

/**
 * Maps UI-friendly model names to actual API model identifiers
 */
const MODEL_MAPPING = {
  'deepseek-v3-base': 'gemini-2-flash-exp',
  'google-gemini-flash': 'gemini-2-flash-exp'
};

export const fetchDeepseekResponse = async (
  apiKey: string, 
  messageHistory: any[], 
  selectedModel: string, 
  temperature: number
): Promise<string> => {
  try {
    // Get the correct model identifier based on the UI selection
    const modelIdentifier = MODEL_MAPPING[selectedModel as keyof typeof MODEL_MAPPING] || 'gemini-2-flash-exp';
    
    // Updated API endpoint to use the Google Gemini API
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2-flash-exp:generateContent';
    
    // Format messages for Google's Gemini API
    const formattedMessages = messageHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: temperature,
          maxOutputTokens: 2000,
          topP: 0.95
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new Error('خطا در احراز هویت API. لطفا بعدا دوباره تلاش کنید.');
      } else if (response.status === 429) {
        throw new Error('محدودیت درخواست‌ها به API رسیده است. لطفا کمی صبر کنید و دوباره تلاش کنید.');
      } else if (response.status === 400) {
        throw new Error(`خطا در پارامترهای ارسالی: ${errorData.error?.message || 'پارامترهای نامعتبر'}`);
      } else {
        throw new Error(`خطا در درخواست به API: ${response.status} ${errorData.error?.message || ''}`);
      }
    }
    
    const data = await response.json();
    
    // Validate response structure for Google Gemini API
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('ساختار پاسخ API نامعتبر است.');
    }
    
    // Extract text content from the response
    const content = data.candidates[0].content;
    if (!content.parts || content.parts.length === 0) {
      throw new Error('پاسخی از API دریافت نشد.');
    }
    
    return content.parts[0].text || '';
  } catch (error: any) {
    // Log detailed error information
    console.error('API request error details:', error);
    
    // Enhanced error check for network failures
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('خطا در اتصال به سرور API. لطفا اتصال اینترنت خود را بررسی کنید.');
    }
    
    throw error;
  }
};

export const generateSimulatedResponse = (input: string): string => {
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

export const buildMessageHistory = (messages: Message[], userMessage: Message, contextLength: number) => {
  // Get recent messages based on contextLength
  const recentMessages = [...messages.slice(-contextLength * 2), userMessage];
  
  // Always include a system message at the beginning for better responses
  const systemContext = {
    role: 'system' as const,
    content: 'شما یک دستیار هوشمند فارسی زبان هستید که به سوالات کاربران به زبان فارسی پاسخ می‌دهید. پاسخ‌های شما دقیق، کمک‌کننده و مودبانه است. لطفا همیشه به زبان فارسی پاسخ دهید و از اطلاعات دقیق و به‌روز استفاده کنید.'
  };
  
  // Format messages for API
  return [
    systemContext,
    ...recentMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))
  ];
};
