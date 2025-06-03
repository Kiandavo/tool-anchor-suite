
import OpenAI from 'openai';
import { Message } from './types';

/**
 * Maps UI-friendly model names to actual API model identifiers
 */
const MODEL_MAPPING = {
  'deepseek-v3-base': 'deepseek/deepseek-v3-0324:free',
  'deepseek-r1': 'tngtech/deepseek-r1t-chimera:free',
  'google-gemini-flash': 'google/gemini-2.0-flash-exp:free',
  'llama4-maverick': 'meta-llama/llama-4-maverick:free'
};

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

    // Validate API key format
    if (!apiKey || !apiKey.startsWith('sk-or-v1-')) {
      throw new Error('کلید API نامعتبر است. لطفا کلید معتبر OpenRouter وارد کنید.');
    }

    console.log('Attempting API call with model:', selectedModel);
    
    // Format messages for API
    const formattedMessages = messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Get the correct model identifier
    const modelIdentifier = MODEL_MAPPING[selectedModel as keyof typeof MODEL_MAPPING] || 'google/gemini-2.0-flash-exp:free';
    
    // Initialize OpenAI client with OpenRouter config
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
      defaultHeaders: {
        "HTTP-Referer": window.location.origin,
        "X-Title": "Persian Text Tools"
      },
      dangerouslyAllowBrowser: true,
      timeout: 30000
    });
    
    const completion = await openai.chat.completions.create({
      model: modelIdentifier,
      messages: formattedMessages,
      temperature: Math.max(0.1, Math.min(1.0, temperature)), // Clamp temperature
      max_tokens: 2000,
      top_p: 0.95
    });
    
    // Extract text content from the response
    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('پاسخی از API دریافت نشد.');
    }
    
    return content;
  } catch (error: any) {
    console.error('API request error details:', error);
    
    // Handle specific OpenAI API errors
    if (error.status === 401) {
      throw new Error('خطا در احراز هویت API. لطفا کلید API خود را بررسی کنید.');
    } else if (error.status === 429) {
      throw new Error('محدودیت درخواست‌ها به API رسیده است. لطفا کمی صبر کنید.');
    } else if (error.status === 400) {
      throw new Error(`خطا در پارامترهای ارسالی: ${error.message || 'پارامترهای نامعتبر'}`);
    } else if (error.cause?.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNRESET') {
      throw new Error('خطا در اتصال به سرور API. لطفا اتصال اینترنت خود را بررسی کنید.');
    } else if (error.message && error.message.includes('Failed to fetch')) {
      throw new Error('خطا در اتصال به سرور API. لطفا اتصال اینترنت خود را بررسی کنید.');
    } else {
      throw new Error(`خطا در درخواست به API: ${error.status || ''} ${error.message || ''}`);
    }
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
