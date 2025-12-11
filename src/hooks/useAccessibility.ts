import { useState, useEffect, useCallback } from 'react';

type FontSize = 'small' | 'normal' | 'large' | 'x-large';

interface AccessibilitySettings {
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
}

const STORAGE_KEY = 'langar-accessibility';

const FONT_SIZE_SCALE: Record<FontSize, string> = {
  'small': '0.875',
  'normal': '1',
  'large': '1.125',
  'x-large': '1.25'
};

const defaultSettings: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  reducedMotion: false
};

export const useAccessibility = () => {
  const [settings, setSettingsState] = useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return defaultSettings;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const applySettings = useCallback((newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Apply font size
    root.style.setProperty('--font-scale', FONT_SIZE_SCALE[newSettings.fontSize]);
    root.style.fontSize = `calc(16px * ${FONT_SIZE_SCALE[newSettings.fontSize]})`;
    
    // Apply high contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, []);

  const updateSettings = useCallback((updates: Partial<AccessibilitySettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettingsState(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    applySettings(newSettings);
  }, [settings, applySettings]);

  const setFontSize = useCallback((size: FontSize) => {
    updateSettings({ fontSize: size });
  }, [updateSettings]);

  const toggleHighContrast = useCallback(() => {
    updateSettings({ highContrast: !settings.highContrast });
  }, [settings.highContrast, updateSettings]);

  const toggleReducedMotion = useCallback(() => {
    updateSettings({ reducedMotion: !settings.reducedMotion });
  }, [settings.reducedMotion, updateSettings]);

  const resetSettings = useCallback(() => {
    setSettingsState(defaultSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
  }, [applySettings]);

  useEffect(() => {
    applySettings(settings);
  }, []);

  return {
    settings,
    setFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetSettings,
    fontSizes: ['small', 'normal', 'large', 'x-large'] as FontSize[]
  };
};
