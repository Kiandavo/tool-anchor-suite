
import { Message } from './types';

export const fetchDeepseekResponse = async (
  apiKey: string, 
  messageHistory: any[], 
  selectedModel: string, 
  temperature: number
): Promise<string> => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messageHistory,
        temperature: temperature,
        max_tokens: 2000,
        top_p: 0.95,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new Error('کلید API نامعتبر است. لطفا کلید معتبر وارد کنید.');
      } else if (response.status === 429) {
        throw new Error('محدودیت درخواست‌ها به API رسیده است. لطفا کمی صبر کنید و دوباره تلاش کنید.');
      } else {
        throw new Error(`خطا در درخواست به API: ${response.status} ${errorData.error?.message || ''}`);
      }
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
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
