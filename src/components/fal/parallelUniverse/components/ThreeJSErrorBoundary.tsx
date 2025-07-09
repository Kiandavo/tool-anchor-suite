import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ThreeJSErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}