
import React from 'react';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

// Import design tools
import ColorPalette from '@/pages/ToolTypes/DesignTools/ColorPalette';
import GradientGenerator from '@/pages/ToolTypes/DesignTools/GradientGenerator';
import BoxShadowGenerator from '@/pages/ToolTypes/DesignTools/BoxShadowGenerator';
import TypographyScale from '@/pages/ToolTypes/DesignTools/TypographyScale';
import ContrastChecker from '@/pages/ToolTypes/DesignTools/ContrastChecker';

interface DesignToolRendererProps {
  slug: string;
}

export const DesignToolRenderer: React.FC<DesignToolRendererProps> = ({ slug }) => {
  switch (slug) {
    case 'color-palette-generator':
      return <ColorPalette />;
    case 'gradient-generator':
      return <GradientGenerator />;
    case 'box-shadow-generator':
      return <BoxShadowGenerator />;
    case 'typography-scale':
      return <TypographyScale />;
    case 'contrast-checker':
      return <ContrastChecker />;
    
    default:
      return <ToolNotImplemented toolName="ابزار طراحی" category="design" />;
  }
};
