import React from 'react';

interface AdSenseScriptProps {
  adClient?: string;
  publisherId?: string;
}

export const AdSenseScript: React.FC<AdSenseScriptProps> = ({ adClient, publisherId }) => {
  // Placeholder component - ads are disabled by default
  return null;
};