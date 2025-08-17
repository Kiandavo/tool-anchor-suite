import { lazy } from 'react';

export const lazyImport = <T extends Record<string, any>>(
  factory: () => Promise<T>,
  name: keyof T
) => {
  return lazy(() =>
    factory().then(module => ({ default: module[name] }))
  );
};

// Preload a component
export const preloadComponent = (componentImport: () => Promise<any>) => {
  return componentImport();
};

// Cache for preloaded components
const preloadCache = new Map<string, Promise<any>>();

export const preloadWithCache = (
  key: string,
  componentImport: () => Promise<any>
) => {
  if (!preloadCache.has(key)) {
    preloadCache.set(key, componentImport());
  }
  return preloadCache.get(key);
};