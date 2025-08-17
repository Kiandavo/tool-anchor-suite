import { useState, useEffect, useMemo, useRef } from 'react';

interface UseVirtualListOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export const useVirtualList = <T>(
  items: T[],
  options: UseVirtualListOptions
) => {
  const { itemHeight, containerHeight, overscan = 3 } = options;
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const visibleRange = useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + visibleCount + overscan,
      items.length - 1
    );

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex,
      visibleItems: items.slice(
        Math.max(0, startIndex - overscan),
        endIndex + 1
      )
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan, items]);

  const totalHeight = items.length * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    scrollElementRef,
    visibleRange,
    totalHeight,
    handleScroll,
    offsetY: visibleRange.startIndex * itemHeight
  };
};