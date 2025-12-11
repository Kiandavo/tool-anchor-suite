import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description: string;
}

export const useToolKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const ctrlOrMeta = shortcut.ctrlKey || shortcut.metaKey;
      const isCtrlOrMetaPressed = event.ctrlKey || event.metaKey;
      
      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        (ctrlOrMeta ? isCtrlOrMetaPressed : true) &&
        (shortcut.shiftKey ? event.shiftKey : !event.shiftKey) &&
        (shortcut.altKey ? event.altKey : !event.altKey)
      ) {
        // Don't trigger if user is typing in an input
        const target = event.target as HTMLElement;
        const isEditable = target.tagName === 'INPUT' || 
                          target.tagName === 'TEXTAREA' || 
                          target.isContentEditable;
        
        // Allow Ctrl+Enter even in editable fields
        if (shortcut.key.toLowerCase() === 'enter' && ctrlOrMeta) {
          event.preventDefault();
          shortcut.callback();
          return;
        }
        
        if (!isEditable) {
          event.preventDefault();
          shortcut.callback();
        }
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return shortcuts;
};
