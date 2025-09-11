import { Tool, ReadingCategory } from '@/types/tool-types';

export const readingCategoryLabels: Record<ReadingCategory, string> = {
  poetry: 'شعر و ادب',
  astrology: 'نجوم',
  divination: 'فال‌گیری',
  dreams: 'خواب و رویا',
  traditional: 'سنتی',
  modern: 'مدرن',
  numerology: 'اعداد شناسی',
  cultural: 'فرهنگی'
};

export const getToolsByReadingCategory = (tools: Tool[], category: ReadingCategory | null): Tool[] => {
  if (!category) return tools;
  return tools.filter(tool => tool.readingCategory === category);
};

export const getQuickReadings = (tools: Tool[]): Tool[] => {
  return tools.filter(tool => tool.difficulty === 'quick');
};

export const getDeepReadings = (tools: Tool[]): Tool[] => {
  return tools.filter(tool => tool.difficulty === 'deep');
};

export const getPopularReadings = (tools: Tool[]): Tool[] => {
  // For now, prioritize certain popular tools, later this will use actual usage data
  const popularIds = ['hafez-fortune', 'tarot-reading', 'horoscope', 'dream-interpretation'];
  return tools.filter(tool => popularIds.includes(tool.id));
};

export const getTrendingReadings = (tools: Tool[]): Tool[] => {
  // For now, prioritize new tools, later this will use recent usage data
  return tools.filter(tool => tool.isNew).slice(0, 6);
};