/**
 * Font Optimization Utilities
 * Manages font loading, fallbacks, and performance optimizations
 */

// Font loading states
export const FontLoadingState = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
} as const;

// Font families configuration
export const FontFamilies = {
  primary: 'Vazirmatn',
  heading: 'Estedad', 
  support: 'Sahel',
  fallback: 'Inter'
} as const;

// Font weight mapping
export const FontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const;

/**
 * Check if fonts are loaded
 */
export const checkFontLoaded = (fontFamily: string): Promise<boolean> => {
  if (!('fonts' in document)) {
    return Promise.resolve(true);
  }

  return document.fonts.ready.then(() => {
    return document.fonts.check(`16px "${fontFamily}"`);
  }).catch(() => false);
};

/**
 * Preload critical fonts
 */
export const preloadFonts = async (): Promise<void> => {
  const fonts = [
    {
      family: FontFamilies.primary,
      urls: [
        'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn/woff2/Vazirmatn-Regular.woff2',
        'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn/woff2/Vazirmatn-Bold.woff2'
      ]
    },
    {
      family: FontFamilies.heading,
      urls: [
        'https://cdn.jsdelivr.net/gh/rastikerdar/estedad@v7.3.0/fonts/woff2/Estedad-Regular.woff2',
        'https://cdn.jsdelivr.net/gh/rastikerdar/estedad@v7.3.0/fonts/woff2/Estedad-Bold.woff2'
      ]
    },
    {
      family: FontFamilies.support,
      urls: [
        'https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/woff2/Sahel-FD.woff2'
      ]
    }
  ];

  // Preload fonts in parallel
  await Promise.allSettled(
    fonts.flatMap(font => 
      font.urls.map(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = url;
        document.head.appendChild(link);
        return new Promise<void>((resolve) => {
          link.onload = () => resolve();
          link.onerror = () => resolve(); // Don't fail on individual font errors
        });
      })
    )
  );
};

/**
 * Get optimal font stack for different contexts
 */
export const getFontStack = (context: 'heading' | 'body' | 'support' | 'display' = 'body'): string => {
  const stacks = {
    heading: `'${FontFamilies.heading}', '${FontFamilies.primary}', system-ui, sans-serif`,
    body: `'${FontFamilies.primary}', '${FontFamilies.support}', system-ui, sans-serif`,
    support: `'${FontFamilies.support}', '${FontFamilies.primary}', system-ui, sans-serif`,
    display: `'${FontFamilies.heading}', '${FontFamilies.primary}', system-ui, sans-serif`
  };

  return stacks[context];
};

/**
 * Apply font optimization classes
 */
export const getFontOptimizationClasses = (element: 'heading' | 'body' | 'support' | 'display' = 'body'): string => {
  const baseClasses = 'smooth-fonts persian-optimized';
  
  const contextClasses = {
    heading: 'font-heading',
    body: 'font-body', 
    support: 'font-support',
    display: 'font-display'
  };

  return `${baseClasses} ${contextClasses[element]}`;
};

/**
 * Initialize font loading optimization
 */
export const initializeFontOptimization = (): void => {
  // Add font-loading class to body initially
  document.body.classList.add('font-loading');

  // Check if fonts are loaded
  Promise.all([
    checkFontLoaded(FontFamilies.primary),
    checkFontLoaded(FontFamilies.heading),
    checkFontLoaded(FontFamilies.support)
  ]).then((results) => {
    const allLoaded = results.every(Boolean);
    
    if (allLoaded) {
      document.body.classList.remove('font-loading');
      document.body.classList.add('font-loaded');
    }
  });

  // Preload fonts for better performance
  preloadFonts().catch(() => {
    // Graceful fallback - fonts will load normally
    document.body.classList.remove('font-loading');
    document.body.classList.add('font-loaded');
  });
};

/**
 * Typography scale utilities
 */
export const TypographyScale = {
  // Display sizes (for hero sections)
  display: {
    '2xl': 'text-display-2xl',
    'xl': 'text-display-xl', 
    'lg': 'text-display-lg',
    'md': 'text-display-md',
    'sm': 'text-display-sm'
  },
  
  // Heading sizes
  heading: {
    'xl': 'text-heading-xl',
    'lg': 'text-heading-lg',
    'md': 'text-heading-md',
    'sm': 'text-heading-sm'
  },
  
  // Body text sizes
  body: {
    'xl': 'text-body-xl',
    'lg': 'text-body-lg',
    'md': 'text-body-md',
    'sm': 'text-body-sm',
    'xs': 'text-body-xs'
  },
  
  // Support text sizes
  support: {
    'lg': 'text-support-lg',
    'md': 'text-support-md',
    'sm': 'text-support-sm',
    'xs': 'text-support-xs'
  }
};

/**
 * Get responsive typography classes
 */
export const getResponsiveTypography = (
  size: string,
  type: 'display' | 'heading' | 'body' | 'support' = 'body'
): string => {
  const scales = TypographyScale[type];
  return scales[size as keyof typeof scales] || scales.md;
};