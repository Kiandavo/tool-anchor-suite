
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@radix-ui/react-slot'],
    exclude: ['lovable-tagger'],
  },
  css: {
    devSourcemap: mode === 'development',
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // More granular chunking for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('react-router')) return 'router';
            if (id.includes('@radix-ui')) return 'ui-vendor';
            if (id.includes('framer-motion')) return 'animations';
            if (id.includes('lucide')) return 'icons';
            if (id.includes('@tanstack/react-query')) return 'query';
            return 'vendor';
          }
          
          // Feature-based chunking
          if (id.includes('components/fal/')) return 'fortune-tools';
          if (id.includes('components/readings/')) return 'readings';
          if (id.includes('pages/ToolTypes/')) return 'tool-pages';
          if (id.includes('components/text-tools/')) return 'text-tools';
          if (id.includes('components/image-tools/')) return 'image-tools';
          if (id.includes('data/tool-categories/')) return 'tool-data';
        },
        entryFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'unknown';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return 'assets/[name]-[hash].[ext]';
          }
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        }
      }
    },
    chunkSizeWarningLimit: 800,
  }
}));
