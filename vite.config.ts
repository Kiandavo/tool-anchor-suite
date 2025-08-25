
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
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('framer-motion') || id.includes('@react-three')) {
              return 'animation-vendor';
            }
            return 'vendor';
          }
          
          // App chunks by feature
          if (id.includes('/readings/') || id.includes('/fortune/')) {
            return 'readings';
          }
          if (id.includes('/tools/') && !id.includes('/readings/')) {
            return 'tools';
          }
          if (id.includes('/home/') || id.includes('/components/home/')) {
            return 'home';
          }
          if (id.includes('/seo/') || id.includes('/analytics/')) {
            return 'seo-analytics';
          }
        },
      }
    },
  }
}));
