
import React from 'react';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

// Import design tools
import ColorPalette from '@/pages/ToolTypes/DesignTools/ColorPalette';

interface DesignToolRendererProps {
  slug: string;
}

export const DesignToolRenderer: React.FC<DesignToolRendererProps> = ({ slug }) => {
  switch (slug) {
    case 'color-palette-generator':
      return <ColorPalette />;
    
    default:
      return <ToolNotImplemented toolName="ابزار طراحی" category="design" />;
  }
};
