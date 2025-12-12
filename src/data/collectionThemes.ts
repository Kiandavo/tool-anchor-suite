// Collection-specific color themes for visual distinction
export interface CollectionTheme {
  gradient: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  hoverBorder: string;
  badgeBg: string;
  badgeText: string;
}

export const collectionThemes: Record<string, CollectionTheme> = {
  students: {
    gradient: 'from-blue-500/10 via-blue-400/5 to-transparent',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200/50',
    hoverBorder: 'hover:border-blue-400/60',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-700',
  },
  ecommerce: {
    gradient: 'from-emerald-500/10 via-emerald-400/5 to-transparent',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-200/50',
    hoverBorder: 'hover:border-emerald-400/60',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-700',
  },
  'content-creators': {
    gradient: 'from-purple-500/10 via-purple-400/5 to-transparent',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200/50',
    hoverBorder: 'hover:border-purple-400/60',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-700',
  },
  freelancers: {
    gradient: 'from-amber-500/10 via-amber-400/5 to-transparent',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-200/50',
    hoverBorder: 'hover:border-amber-400/60',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-700',
  },
  developers: {
    gradient: 'from-cyan-500/10 via-cyan-400/5 to-transparent',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-200/50',
    hoverBorder: 'hover:border-cyan-400/60',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-700',
  },
  writers: {
    gradient: 'from-rose-500/10 via-rose-400/5 to-transparent',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-200/50',
    hoverBorder: 'hover:border-rose-400/60',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-700',
  },
  designers: {
    gradient: 'from-fuchsia-500/10 via-fuchsia-400/5 to-transparent',
    iconBg: 'bg-fuchsia-500/15',
    iconColor: 'text-fuchsia-600',
    borderColor: 'border-fuchsia-200/50',
    hoverBorder: 'hover:border-fuchsia-400/60',
    badgeBg: 'bg-fuchsia-500/10',
    badgeText: 'text-fuchsia-700',
  },
  teachers: {
    gradient: 'from-orange-500/10 via-orange-400/5 to-transparent',
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200/50',
    hoverBorder: 'hover:border-orange-400/60',
    badgeBg: 'bg-orange-500/10',
    badgeText: 'text-orange-700',
  },
  'small-business': {
    gradient: 'from-indigo-500/10 via-indigo-400/5 to-transparent',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-200/50',
    hoverBorder: 'hover:border-indigo-400/60',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-700',
  },
};

// Default theme for collections not in the list
export const defaultCollectionTheme: CollectionTheme = {
  gradient: 'from-gray-500/10 via-gray-400/5 to-transparent',
  iconBg: 'bg-gray-500/15',
  iconColor: 'text-gray-600',
  borderColor: 'border-gray-200/50',
  hoverBorder: 'hover:border-gray-400/60',
  badgeBg: 'bg-gray-500/10',
  badgeText: 'text-gray-700',
};

export const getCollectionTheme = (slug: string): CollectionTheme => {
  return collectionThemes[slug] || defaultCollectionTheme;
};
