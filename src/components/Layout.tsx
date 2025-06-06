
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen" dir="rtl">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">لنگر</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {children}
      </main>

      <footer className="border-t bg-gray-50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© ۲۰۲۴ لنگر - ابزارهای آنلاین رایگان</p>
        </div>
      </footer>
    </div>
  );
};
