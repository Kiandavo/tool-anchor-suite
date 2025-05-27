
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

// Simplified app ready handler
const markAppAsReady = () => {
  console.log('Marking app as ready...');
  document.body.classList.remove('loading');
  document.body.classList.add('app-ready');
  
  // Remove loading screen after transition
  setTimeout(() => {
    const loadingScreen = document.querySelector('.initial-loading');
    if (loadingScreen) {
      loadingScreen.remove();
      console.log('Loading screen removed');
    }
  }, 300);
};

// Render with simplified error handling
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

  // Mark app as ready after React has had time to render
  setTimeout(() => {
    markAppAsReady();
  }, 1000);

} catch (error) {
  console.error('Failed to render React app:', error);
  // Remove loading and show error even if app fails
  setTimeout(() => {
    markAppAsReady();
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
