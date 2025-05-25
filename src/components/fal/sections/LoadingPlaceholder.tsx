
import React from 'react';

export const LoadingPlaceholder: React.FC = () => (
  <div className="h-64 border rounded-lg flex items-center justify-center neo-glass shadow-sm">
    <div className="text-center">
      <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
      <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
    </div>
  </div>
);
