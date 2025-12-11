import { useEffect, useCallback } from 'react';
import { useSearchModal } from './useSearchModal';
import { useNavigate } from 'react-router-dom';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  handler: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const { open: openSearch, close: closeSearch, isOpen: isSearchOpen } = useSearchModal();
  const navigate = useNavigate();

  const shortcuts: ShortcutHandler[] = [
    {
      key: '/',
      handler: () => {
        if (!isSearchOpen) openSearch();
      },
      description: 'باز کردن جستجو'
    },
    {
      key: 'Escape',
      handler: () => {
        if (isSearchOpen) closeSearch();
      },
      description: 'بستن'
    },
    {
      key: 'h',
      ctrl: true,
      handler: () => navigate('/'),
      description: 'رفتن به خانه'
    },
    {
      key: 'b',
      ctrl: true,
      handler: () => navigate('/bookmarks'),
      description: 'نشانک‌ها'
    },
    {
      key: '?',
      shift: true,
      handler: () => {
        // Dispatch custom event to show shortcuts help
        window.dispatchEvent(new CustomEvent('show-shortcuts-help'));
      },
      description: 'نمایش میانبرها'
    }
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      // Allow Escape to work even in inputs
      if (e.key !== 'Escape') return;
    }

    // Handle Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isSearchOpen) {
        closeSearch();
      } else {
        openSearch();
      }
      return;
    }

    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : (!e.ctrlKey && !e.metaKey);
      const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
      
      if (e.key === shortcut.key && ctrlMatch && shiftMatch) {
        e.preventDefault();
        shortcut.handler();
        return;
      }
    }
  }, [isSearchOpen, openSearch, closeSearch, navigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { shortcuts };
};

export const KEYBOARD_SHORTCUTS = [
  { keys: ['/', '⌘K'], description: 'جستجو' },
  { keys: ['Esc'], description: 'بستن' },
  { keys: ['Ctrl+H'], description: 'صفحه اصلی' },
  { keys: ['Ctrl+B'], description: 'نشانک‌ها' },
  { keys: ['?'], description: 'راهنمای میانبرها' },
];
