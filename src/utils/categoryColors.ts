
import { ToolCategory } from '@/data/tools';

export interface CategoryTheme {
  gradient: string;
  background: string;
  border: string;
  text: string;
  icon: string;
}

export const categoryThemes: Record<ToolCategory, CategoryTheme> = {
  text: {
    gradient: 'from-blue-500 to-blue-600',
    background: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-600'
  },
  calculator: {
    gradient: 'from-green-500 to-green-600',
    background: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-600'
  },
  image: {
    gradient: 'from-purple-500 to-purple-600',
    background: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    icon: 'text-purple-600'
  },
  seo: {
    gradient: 'from-orange-500 to-orange-600',
    background: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    icon: 'text-orange-600'
  },
  random: {
    gradient: 'from-pink-500 to-pink-600',
    background: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-800',
    icon: 'text-pink-600'
  },
  'persian-cultural': {
    gradient: 'from-indigo-500 to-indigo-600',
    background: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-800',
    icon: 'text-indigo-600'
  },
  readings: {
    gradient: 'from-violet-500 to-violet-600',
    background: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-800',
    icon: 'text-violet-600'
  },
  productivity: {
    gradient: 'from-teal-500 to-teal-600',
    background: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-800',
    icon: 'text-teal-600'
  },
  design: {
    gradient: 'from-rose-500 to-rose-600',
    background: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-800',
    icon: 'text-rose-600'
  },
  number: {
    gradient: 'from-amber-500 to-amber-600',
    background: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: 'text-amber-600'
  },
  educational: {
    gradient: 'from-cyan-500 to-cyan-600',
    background: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-800',
    icon: 'text-cyan-600'
  }
};
