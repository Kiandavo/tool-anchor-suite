
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
}

export type ToolCategory = 'calculators' | 'text' | 'image' | 'persian-cultural' | 'readings' | 'seo' | 'random' | 'number' | 'educational' | 'productivity' | 'design';
