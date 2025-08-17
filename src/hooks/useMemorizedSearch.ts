import { useMemo } from 'react';

interface SearchableItem {
  [key: string]: any;
}

export const useMemorizedSearch = <T extends SearchableItem>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[],
  sortField?: keyof T
) => {
  return useMemo(() => {
    if (!searchTerm.trim()) {
      const sorted = sortField 
        ? [...items].sort((a, b) => {
            const aVal = String(a[sortField] || '');
            const bVal = String(b[sortField] || '');
            return aVal.localeCompare(bVal, 'fa');
          })
        : items;
      return sorted;
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    
    const filtered = items.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        if (Array.isArray(value)) {
          return value.some(val => 
            String(val).toLowerCase().includes(normalizedSearchTerm)
          );
        }
        return String(value || '').toLowerCase().includes(normalizedSearchTerm);
      })
    );

    return sortField 
      ? filtered.sort((a, b) => {
          const aVal = String(a[sortField] || '');
          const bVal = String(b[sortField] || '');
          return aVal.localeCompare(bVal, 'fa');
        })
      : filtered;
  }, [items, searchTerm, searchFields, sortField]);
};