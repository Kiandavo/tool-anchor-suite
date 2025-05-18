
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      plugins: [],
      // Enable fast refresh
      fastRefresh: true,
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // optimize build
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create specific chunks for different parts of the application
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            if (id.includes('lucide')) {
              return 'icons';
            }
            return 'vendor';
          }
          if (id.includes('/src/components/fal/')) {
            return 'fortune';
          }
          if (id.includes('/src/components/tool/')) {
            return 'tools';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  // Enable dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@radix-ui/react-slot']
  }
}));
