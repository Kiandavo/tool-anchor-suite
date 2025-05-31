
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('ErrorBoundary: Error caught in getDerivedStateFromError:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary: Component error caught:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    
    this.setState({ 
      hasError: true, 
      error, 
      errorInfo 
    });
  }

  componentDidMount() {
    console.log('ErrorBoundary mounted successfully');
  }

  render() {
    if (this.state.hasError) {
      console.warn('ErrorBoundary: Rendering fallback UI due to error');
      
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg m-4">
          <h3 className="text-red-800 font-medium mb-2">خطا در بارگیری</h3>
          <p className="text-red-600 text-sm">این بخش به دلیل خطا قابل نمایش نیست.</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-2">
              <summary className="text-xs text-red-500 cursor-pointer">جزئیات خطا</summary>
              <pre className="text-xs text-red-400 mt-1 overflow-auto">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
