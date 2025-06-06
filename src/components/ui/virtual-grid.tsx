
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface VirtualGridProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  gap?: number;
  columns?: number;
}

export function VirtualGrid<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  gap = 16,
  columns = 1
}: VirtualGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const itemsPerRow = columns;
  const rowHeight = itemHeight + gap;
  const totalRows = Math.ceil(items.length / itemsPerRow);
  const totalHeight = totalRows * rowHeight;

  const visibleRowCount = Math.ceil(containerHeight / rowHeight) + 2;
  const startRow = Math.floor(scrollTop / rowHeight);
  const endRow = Math.min(startRow + visibleRowCount, totalRows);

  const visibleItems = useMemo(() => {
    const startIndex = startRow * itemsPerRow;
    const endIndex = Math.min(endRow * itemsPerRow, items.length);
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      row: Math.floor((startIndex + index) / itemsPerRow),
      col: (startIndex + index) % itemsPerRow
    }));
  }, [items, startRow, endRow, itemsPerRow]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={scrollElementRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, row, col }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: row * rowHeight,
              left: col * (100 / columns) + '%',
              width: `calc(${100 / columns}% - ${gap * (columns - 1) / columns}px)`,
              height: itemHeight
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
