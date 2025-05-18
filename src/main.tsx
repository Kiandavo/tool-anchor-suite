
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

// Configure React Query with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Use createRoot instead of ReactDOM.render
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
          <Toaster 
            position="top-center" 
            expand={false} 
            richColors 
            closeButton
            toastOptions={{
              style: {
                fontFamily: 'B Yekan, sans-serif',
              }
            }}
          />
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
