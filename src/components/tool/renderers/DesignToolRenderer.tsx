
import React from 'react';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

// Import design tools
import ColorPalette from '@/pages/ToolTypes/DesignTools/ColorPalette';
import FontPreview from '@/pages/ToolTypes/DesignTools/FontPreview';
import SimpleLogoMaker from '@/pages/ToolTypes/DesignTools/SimpleLogoMaker';
import SocialMediaTemplate from '@/pages/ToolTypes/DesignTools/SocialMediaTemplate';

interface DesignToolRendererProps {
  slug: string;
}

export const DesignToolRenderer: React.FC<DesignToolRendererProps> = ({ slug }) => {
  switch (slug) {
    case 'color-palette':
      return <ColorPalette />;
    
    case 'font-preview':
      return <FontPreview />;
    
    case 'simple-logo-maker':
      return <SimpleLogoMaker />;
    case 'social-media-template':
      return <SocialMediaTemplate />;
    
    default:
      return <ToolNotImplemented toolName="ابزار طراحی" category="design" />;
  }
};
