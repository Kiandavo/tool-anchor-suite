
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from 'vite';

// Plugin to make CSS non-render-blocking
const cssPreloadPlugin = (): Plugin => {
  return {
    name: 'css-preload',
    transformIndexHtml: {
      enforce: 'post' as const,
      transform(html: string, context: any) {
        if (context.bundle) {
          // Find CSS files in the bundle
          const cssFiles = Object.keys(context.bundle).filter((key: string) => key.endsWith('.css'));
          
          if (cssFiles.length > 0) {
            // Make existing CSS links non-render-blocking by converting to preload
            html = html.replace(
              /<link[^>]*rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*>/g,
              (match: string) => {
                return match.replace(
                  'rel="stylesheet"', 
                  'rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"'
                );
              }
            );
          }
        }
        return html;
      }
    }
  };
};

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    cors: true,
  },
  plugins: [
    react({
      plugins: [],
      jsxImportSource: mode === 'development' ? 'react' : undefined,
    }),
    mode === 'development' && componentTagger(),
    mode === 'production' && cssPreloadPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lovable-tagger'],
  },
  css: {
    devSourcemap: mode === 'development',
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React - smallest possible
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          // Router - loaded on navigation
          if (id.includes('react-router')) {
            return 'router';
          }
          // Heavy animation library - load on demand
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          // 3D libraries - very heavy, load only for specific tools
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          // Charts - load on demand
          if (id.includes('recharts') || id.includes('d3')) {
            return 'charts';
          }
          // PDF/Canvas libraries - load on demand
          if (id.includes('jspdf') || id.includes('html2canvas')) {
            return 'export-libs';
          }
          // Radix UI - split by component
          if (id.includes('@radix-ui')) {
            return 'ui-radix';
          }
          // Icons - commonly used
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Date utilities
          if (id.includes('date-fns')) {
            return 'date-utils';
          }
          // Supabase
          if (id.includes('@supabase')) {
            return 'supabase';
          }
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      }
    },
  }
}));
