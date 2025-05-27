
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

// Simplified loading screen removal
const removeLoadingScreen = () => {
  console.log('Removing loading screen...');
  const loadingScreen = document.querySelector('.initial-loading') as HTMLElement;
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen?.remove();
      console.log('Loading screen removed successfully');
    }, 300);
  }
};

// Render with simplified loading detection
try {
  root.render(
    <React.StrictMode>
      <GlobalErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );

  // Remove loading screen after a short delay to allow React to mount
  setTimeout(removeLoadingScreen, 1000);

} catch (error) {
  console.error('Failed to render React app:', error);
  setTimeout(removeLoadingScreen, 1000);
}
