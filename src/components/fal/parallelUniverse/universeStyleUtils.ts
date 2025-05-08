
import { UniverseType } from './types';

// Get background color based on universe type
export const getUniverseTypeColor = (type: UniverseType) => {
  switch (type) {
    case 'utopian': return 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200';
    case 'dystopian': return 'bg-gradient-to-r from-rose-50 to-red-50 border-rose-200';
    case 'bizarre': return 'bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-200';
    default: return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200';
  }
};

// Get text color based on universe type
export const getUniverseTypeTextColor = (type: UniverseType) => {
  switch (type) {
    case 'utopian': return 'text-emerald-700';
    case 'dystopian': return 'text-rose-700';
    case 'bizarre': return 'text-purple-700';
    default: return 'text-blue-700';
  }
};

// Get badge color based on universe type
export const getUniverseTypeBadge = (type: UniverseType) => {
  switch (type) {
    case 'utopian': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'dystopian': return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'bizarre': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

// Get universe type in Persian
export const getUniverseTypeInPersian = (type: UniverseType) => {
  switch (type) {
    case 'utopian': return 'آرمانی';
    case 'dystopian': return 'ویرانشهری';
    case 'bizarre': return 'عجیب';
    default: return 'خنثی';
  }
};
