/**
 * Modern Font Optimization Utilities
 * Provides utilities for optimizing modern font loading and applying consistent typography
 * Updated for the new font hierarchy: Inter, Manrope, JetBrains Mono, Vazirmatn, Shabnam
 */

// Font loading states
export enum FontLoadingState {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

// Modern font families configuration
export const ModernFontFamilies = {
  // Primary modern fonts
  primary: 'Inter, Vazirmatn, system-ui, sans-serif',
  heading: 'Manrope, Vazirmatn, Inter, system-ui, sans-serif',
  body: 'Inter, Vazirmatn, system-ui, sans-serif',
  support: 'Shabnam, Vazirmatn, Inter, system-ui, sans-serif',
  display: 'Manrope, Vazirmatn, Inter, system-ui, sans-serif',
  mono: 'JetBrains Mono, Consolas, Monaco, monospace',
  accent: 'Shabnam, Vazirmatn, Inter, system-ui, sans-serif',
  
  // Fallback for legacy components
  fallback: 'Inter, Vazirmatn, system-ui, -apple-system, sans-serif'
} as const;

// Modern font weights with variable font support
export const ModernFontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
} as const;

/**
 * Checks if a modern font family is loaded in the browser
 */
export async function checkModernFontLoaded(fontFamily: string): Promise<boolean> {
  try {
    if (!('fonts' in document)) {
      return false;
    }
    
    const font = new FontFace(fontFamily, `url(data:,)`, {
      style: 'normal',
      weight: '400'
    });
    
    await font.load();
    return document.fonts.has(font);
  } catch (error) {
    console.warn(`Failed to check font loading for ${fontFamily}:`, error);
    return false;
  }
}

/**
 * Preloads critical modern fonts for immediate rendering
 */
export async function preloadModernFonts(): Promise<void> {
  const criticalFonts = [
    'Inter',
    'Manrope', 
    'JetBrains Mono',
    'Vazirmatn',
    'Shabnam'
  ];

  const fontPromises = criticalFonts.map(async (fontFamily) => {
    try {
      const isLoaded = await checkModernFontLoaded(fontFamily);
      if (!isLoaded) {
        // Create preload link for critical fonts
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        
        // Modern font URLs (these would be replaced with actual CDN URLs)
        const fontUrls: Record<string, string> = {
          'Inter': 'https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
          'Manrope': 'https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.woff2',
          'JetBrains Mono': 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY_J-oE_sw4OQEeuHKreHPnO6t59dZgWiH_1jQ4dw.woff2',
          'Vazirmatn': 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn/woff2/Vazirmatn-Regular.woff2',
          'Shabnam': 'https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.1/dist/woff2/Shabnam-FD.woff2'
        };
        
        if (fontUrls[fontFamily]) {
          link.href = fontUrls[fontFamily];
          document.head.appendChild(link);
        }
      }
    } catch (error) {
      console.warn(`Failed to preload font ${fontFamily}:`, error);
    }
  });

  await Promise.allSettled(fontPromises);
}

/**
 * Gets the appropriate modern font stack for a given context
 */
export function getModernFontStack(context: 'heading' | 'body' | 'support' | 'display' | 'mono' | 'accent' = 'body'): string {
  return ModernFontFamilies[context] || ModernFontFamilies.body;
}

/**
 * Generates modern font optimization CSS classes for a given element type
 */
export function getModernFontOptimizationClasses(element: 'heading' | 'body' | 'support' | 'display' | 'mono' | 'accent' = 'body'): string {
  const baseClasses = 'font-display-swap smooth-fonts optimize-legibility';
  
  const contextClasses = {
    heading: 'font-heading kerning-auto',
    body: 'font-body kerning-normal', 
    support: 'font-support kerning-auto',
    display: 'font-display kerning-auto',
    mono: 'font-mono kerning-none',
    accent: 'font-accent kerning-auto'
  };
  
  return `${baseClasses} ${contextClasses[element]}`;
}

/**
 * Typography scale with modern responsive classes
 */
export const ModernTypographyScale = {
  display: {
    '2xl': 'text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-none',
    'xl': 'text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-none',
    'lg': 'text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight',
    'md': 'text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight',
    'sm': 'text-2xl md:text-3xl lg:text-4xl font-display font-semibold tracking-tight leading-tight'
  },
  heading: {
    'xl': 'text-3xl md:text-4xl font-heading font-bold leading-tight',
    'lg': 'text-2xl md:text-3xl font-heading font-semibold leading-tight',
    'md': 'text-xl md:text-2xl font-heading font-semibold leading-tight',
    'sm': 'text-lg md:text-xl font-heading font-medium leading-tight',
    'xs': 'text-base md:text-lg font-heading font-medium leading-tight'
  },
  body: {
    'xl': 'text-xl md:text-2xl font-body leading-relaxed',
    'lg': 'text-lg md:text-xl font-body leading-relaxed',
    'md': 'text-base md:text-lg font-body leading-normal',
    'sm': 'text-sm md:text-base font-body leading-normal',
    'xs': 'text-xs md:text-sm font-body leading-normal'
  },
  support: {
    'lg': 'text-lg font-support leading-relaxed',
    'md': 'text-base font-support leading-normal',
    'sm': 'text-sm font-support leading-normal',
    'xs': 'text-xs font-support leading-tight'
  },
  mono: {
    'lg': 'text-lg font-mono leading-relaxed',
    'md': 'text-base font-mono leading-normal',
    'sm': 'text-sm font-mono leading-normal',
    'xs': 'text-xs font-mono leading-tight'
  }
} as const;

/**
 * Gets responsive typography class based on size and type
 */
export function getResponsiveModernTypography(
  size: string, 
  type: 'display' | 'heading' | 'body' | 'support' | 'mono' = 'body'
): string {
  const scale = ModernTypographyScale[type] as Record<string, string>;
  return scale[size] || scale['md'] || '';
}

/**
 * Initialize modern font optimization system
 */
export function initializeModernFontOptimization(): void {
  if (typeof window === 'undefined') return;
  
  // Check if fonts API is supported
  if ('fonts' in document) {
    // Monitor font loading states
    document.fonts.ready.then(() => {
      console.log('All modern fonts loaded successfully');
      document.body.classList.add('fonts-loaded');
      document.body.classList.remove('fonts-loading');
    });
    
    // Add loading class initially
    document.body.classList.add('fonts-loading');
  }
  
  // Preload critical fonts
  preloadModernFonts().catch(error => {
    console.warn('Failed to preload modern fonts:', error);
  });
  
  // Set font feature settings for optimal rendering
  document.documentElement.style.setProperty(
    '--font-feature-settings-modern',
    '"kern" 1, "liga" 1, "calt" 1, "cv11" 1, "ss01" 1'
  );
}

// Auto-initialize on import
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModernFontOptimization);
  } else {
    initializeModernFontOptimization();
  }
}