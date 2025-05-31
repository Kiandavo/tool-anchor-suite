
import React from 'react';

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">لنگر</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 p-4 mt-16">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 لنگر - مجموعه ابزارهای آنلاین</p>
        </div>
      </footer>
    </div>
  );
};
