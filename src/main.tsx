
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'

// Error boundary for the entire app
class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Global error boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Global error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              خطایی در بارگذاری صفحه رخ داده است
            </h2>
            <p className="text-gray-600 mb-4">
              لطفاً صفحه را رفرش کنید یا دوباره تلاش کنید.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              رفرش صفحه
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create root with error handling
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// Enhanced loading screen removal
const removeLoadingScreen = () => {
  console.log('Starting to remove loading screen...');
  const loadingScreen = document.querySelector('.initial-loading') as HTMLElement;
  if (loadingScreen) {
    console.log('Loading screen found, hiding it...');
    loadingScreen.style.opacity = '0';
    loadingScreen.style.pointerEvents = 'none';
    setTimeout(() => {
      try {
        loadingScreen.remove();
        console.log('Loading screen removed successfully');
        
        // Ensure root is visible
        const rootEl = document.getElementById('root') as HTMLElement;
        if (rootEl) {
          rootEl.style.opacity = '1';
          rootEl.style.visibility = 'visible';
          console.log('Root element made visible');
        }
      } catch (error) {
        console.error('Error removing loading screen:', error);
      }
    }, 300);
  } else {
    console.log('Loading screen not found, ensuring root is visible...');
    const rootEl = document.getElementById('root') as HTMLElement;
    if (rootEl) {
      rootEl.style.opacity = '1';
      rootEl.style.visibility = 'visible';
    }
  }
};

// Render with proper error handling
try {
  console.log('Starting React app render...');
  root.render(
    <React.StrictMode>
      <GlobalErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
  console.log('React app rendered successfully');

  // Remove loading screen after React mounts
  setTimeout(() => {
    removeLoadingScreen();
  }, 500);

} catch (error) {
  console.error('Failed to render React app:', error);
  // Still remove loading screen even if app fails
  setTimeout(() => {
    removeLoadingScreen();
    // Show a fallback message
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div class="text-center">
            <h2 class="text-xl font-bold text-gray-900 mb-2">خطا در بارگذاری</h2>
            <p class="text-gray-600 mb-4">لطفاً صفحه را رفرش کنید.</p>
            <button onclick="window.location.reload()" class="bg-blue-600 text-white px-4 py-2 rounded">رفرش</button>
          </div>
        </div>
      `;
    }
  }, 1000);
}
