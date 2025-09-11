
export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: ToolCategory;
  icon?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
  isPremium?: boolean;
  // Enhanced reading properties
  readingCategory?: ReadingCategory;
  difficulty?: 'quick' | 'deep';
  estimatedTime?: number; // in minutes
  subcategory?: string;
}

export type ToolCategory = 'calculators' | 'text' | 'image' | 'persian-cultural' | 'readings' | 'seo' | 'random' | 'number' | 'educational' | 'productivity' | 'design';

export type ReadingCategory = 'poetry' | 'astrology' | 'divination' | 'dreams' | 'traditional' | 'modern' | 'numerology' | 'cultural';
