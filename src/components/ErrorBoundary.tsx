import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertTriangle size={36} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>Oops! Bir xəta baş verdi</h2>
          <p className="mb-8 max-w-md text-gray-600">
            Gözlənilməz bir xəta ilə qarşılaşdıq. Lütfən səhifəni yeniləyin və ya bir az sonra təkrar yoxlayın.
          </p>
          <button
            onClick={() => {
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then((registrations) => {
                  for (const registration of registrations) {
                    registration.unregister();
                  }
                  window.location.reload();
                });
              } else {
                window.location.reload();
              }
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 shadow-lg shadow-blue-600/20"
          >
            <RefreshCw size={18} />
            Səhifəni Yenilə
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
