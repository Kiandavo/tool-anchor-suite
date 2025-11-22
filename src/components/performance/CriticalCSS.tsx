import { useEffect } from 'react';

/**
 * Component to handle critical CSS loading
 * Defers non-critical stylesheets to improve FCP
 */
export const CriticalCSS: React.FC = () => {
  useEffect(() => {
    // Load non-critical stylesheets after page load
    const loadDeferredStyles = () => {
      const addStylesNode = document.getElementById('deferred-styles');
      if (addStylesNode) {
        const replacement = document.createElement('div');
        replacement.innerHTML = addStylesNode.textContent || '';
        document.body.appendChild(replacement);
        addStylesNode.parentElement?.removeChild(addStylesNode);
      }
    };

    // Load after window load event
    if (document.readyState === 'complete') {
      loadDeferredStyles();
    } else {
      window.addEventListener('load', loadDeferredStyles);
      return () => window.removeEventListener('load', loadDeferredStyles);
    }
  }, []);

  return null;
};

/**
 * Utility to inline critical CSS
 * Use this for above-the-fold styles
 */
export const inlineCriticalCSS = (css: string): string => {
  return `<style>${css}</style>`;
};

/**
 * Defer non-critical CSS
 * Loads stylesheet asynchronously without blocking render
 */
export const deferCSS = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};
