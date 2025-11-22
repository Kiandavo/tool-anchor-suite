import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ResourceHintsProps {
  preconnect?: string[];
  dnsPrefetch?: string[];
  preload?: Array<{
    href: string;
    as: string;
    type?: string;
    crossOrigin?: boolean;
  }>;
  prefetch?: string[];
}

export const ResourceHints: React.FC<ResourceHintsProps> = ({
  preconnect = [],
  dnsPrefetch = [],
  preload = [],
  prefetch = []
}) => {
  return (
    <Helmet>
      {/* DNS Prefetch - Start DNS resolution early */}
      {dnsPrefetch.map((url, index) => (
        <link key={`dns-${index}`} rel="dns-prefetch" href={url} />
      ))}

      {/* Preconnect - Establish early connections */}
      {preconnect.map((url, index) => (
        <link key={`preconnect-${index}`} rel="preconnect" href={url} crossOrigin="" />
      ))}

      {/* Preload - High priority resource loading */}
      {preload.map((resource, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin ? '' : undefined}
        />
      ))}

      {/* Prefetch - Low priority resource loading */}
      {prefetch.map((url, index) => (
        <link key={`prefetch-${index}`} rel="prefetch" href={url} />
      ))}
    </Helmet>
  );
};

// Default resource hints for the app
export const DefaultResourceHints: React.FC = () => {
  return (
    <ResourceHints
      dnsPrefetch={[
        'https://fonts.googleapis.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
      ]}
      preconnect={[
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ]}
      preload={[
        {
          href: '/fonts/vazirmatn-variable.woff2',
          as: 'font',
          type: 'font/woff2',
          crossOrigin: true
        }
      ]}
    />
  );
};
